import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth, signToken } from "./auth.js";
import { buildSlug, ensureAllPages, loadStore, saveStore } from "./store.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${buildSlug(name)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }
});

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(uploadsDir));

const readStore = async () => {
  const store = await loadStore();
  await ensureAllPages(store);
  await saveStore(store);
  return store;
};

const findPage = (store, slugPath) =>
  store.pages.find((page) => page.slugPath.join("/") === slugPath.join("/"));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/login", (req, res) => {
  const { id, password } = req.body;
  const adminId = process.env.ADMIN_ID || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "1761";

  if (id !== adminId || password !== adminPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({ token: signToken({ id: adminId, role: "admin" }) });
});

app.get("/menu", async (_req, res) => {
  const store = await readStore();
  res.json(store.menus);
});

app.post("/menu", requireAuth, async (req, res) => {
  const store = await readStore();
  const { parentTitle, childTitle } = req.body;

  const newMenu = {
    id: `menu-${Date.now()}`,
    slug: buildSlug(parentTitle?.ko || parentTitle?.en || parentTitle?.zh || "menu"),
    title: parentTitle,
    children: [
      {
        id: `child-${Date.now()}`,
        slug: buildSlug(childTitle?.ko || childTitle?.en || childTitle?.zh || "page"),
        title: childTitle
      }
    ]
  };

  store.menus.push(newMenu);
  ensureAllPages(store);
  saveStore(store);
  res.status(201).json(newMenu);
});

app.put("/menu", requireAuth, async (req, res) => {
  const store = await readStore();
  const { parentId, childId, parentTitle, childTitle } = req.body;
  const parent = store.menus.find((item) => item.id === parentId);

  if (!parent) {
    return res.status(404).json({ message: "Menu not found" });
  }

  if (parentTitle) {
    parent.title = parentTitle;
  }

  if (childId) {
    const child = parent.children.find((item) => item.id === childId);
    if (!child) {
      return res.status(404).json({ message: "Child menu not found" });
    }

    const oldPath = [parent.slug, child.slug];
    child.title = childTitle || child.title;
    child.slug = buildSlug(child.title.ko || child.title.en || child.title.zh || child.slug);

    const page = findPage(store, oldPath);
    if (page) {
      page.slugPath = [parent.slug, child.slug];
      page.hero.title = child.title;
    }
  }

  saveStore(store);
  res.json(parent);
});

app.delete("/menu", requireAuth, async (req, res) => {
  const store = await readStore();
  const { parentId, childId } = req.body;
  const parent = store.menus.find((item) => item.id === parentId);

  if (!parent) {
    return res.status(404).json({ message: "Menu not found" });
  }

  if (!childId) {
    const targets = parent.children.map((child) => [parent.slug, child.slug].join("/"));
    store.pages = store.pages.filter((page) => !targets.includes(page.slugPath.join("/")));
    store.menus = store.menus.filter((menu) => menu.id !== parentId);
    saveStore(store);
    return res.json({ success: true });
  }

  const child = parent.children.find((item) => item.id === childId);
  if (!child) {
    return res.status(404).json({ message: "Child menu not found" });
  }

  parent.children = parent.children.filter((item) => item.id !== childId);
  store.pages = store.pages.filter(
    (page) => page.slugPath.join("/") !== [parent.slug, child.slug].join("/")
  );
  saveStore(store);
  res.json({ success: true });
});

app.get("/pages", async (req, res) => {
  const store = await readStore();
  const { slug } = req.query;

  if (!slug) {
    return res.json(store.pages);
  }

  const slugPath = String(slug).split("/");
  const page = findPage(store, slugPath);

  if (!page) {
    return res.status(200).json({
      fallback: true,
      slugPath,
      hero: {
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
        title: {
          "ko": "페이지 준비 중",
          "en": "Page Coming Soon",
          "zh": "页面准备中"
        },
        description: {
          "ko": "관리자에서 기본 템플릿을 즉시 수정할 수 있습니다.",
          "en": "This page can be configured immediately in the admin panel.",
          "zh": "此页面可在后台立即配置。"
        }
      },
      content: {
        "ko": "<p>콘텐츠를 준비 중입니다.</p>",
        "en": "<p>Content is being prepared.</p>",
        "zh": "<p>内容正在准备中。</p>"
      }
    });
  }

  return res.json(page);
});

app.post("/pages", requireAuth, (req, res) => {
  const store = readStore();
  const page = { ...req.body, id: req.body.id || `page-${Date.now()}` };
  store.pages.push(page);
  saveStore(store);
  res.status(201).json(page);
});

app.put("/pages", requireAuth, (req, res) => {
  const store = readStore();
  const { id, hero, content } = req.body;
  const page = store.pages.find((item) => item.id === id);

  if (!page) {
    return res.status(404).json({ message: "Page not found" });
  }

  page.hero = hero || page.hero;
  page.content = content || page.content;
  saveStore(store);
  res.json(page);
});

app.get("/site-config", (_req, res) => {
  const store = readStore();
  res.json(store.site);
});

app.put("/site-config", requireAuth, (req, res) => {
  const store = readStore();
  store.site = req.body;
  saveStore(store);
  res.json(store.site);
});

app.post("/upload", requireAuth, upload.any(), (req, res) => {
  const file = req.files?.[0];

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(201).json({
    path: `/uploads/${file.filename}`,
    originalName: file.originalname,
    mimeType: file.mimetype
  });
});

app.post("/inquiry", (req, res) => {
  const store = readStore();
  const inquiry = {
    id: `inq-${Date.now()}`,
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
    status: "pending",
    reply: "",
    createdAt: new Date().toISOString()
  };

  store.inquiries.unshift(inquiry);
  saveStore(store);
  res.status(201).json(inquiry);
});

app.get("/inquiry", requireAuth, (_req, res) => {
  const store = readStore();
  res.json(store.inquiries);
});

app.post("/inquiry/reply", requireAuth, (req, res) => {
  const store = readStore();
  const inquiry = store.inquiries.find((item) => item.id === req.body.id);

  if (!inquiry) {
    return res.status(404).json({ message: "Inquiry not found" });
  }

  inquiry.reply = req.body.reply || "";
  inquiry.status = req.body.status || "completed";
  inquiry.repliedAt = new Date().toISOString();
  saveStore(store);
  res.json(inquiry);
});

app.listen(port, () => {
  console.log(`KHPS backend listening on http://localhost:${port}`);
});
