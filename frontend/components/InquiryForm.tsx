"use client";

import { FormEvent, useState } from "react";
import { Locale } from "@/lib/types";
import { submitInquiry } from "@/lib/api";

const labels = {
  ko: {
    name: "이름",
    email: "이메일",
    content: "문의 내용",
    submit: "문의 보내기",
    success: "문의가 정상적으로 접수되었습니다.",
    error: "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요."
  },
  en: {
    name: "Name",
    email: "Email",
    content: "Message",
    submit: "Send Inquiry",
    success: "Your inquiry has been submitted.",
    error: "Failed to submit your inquiry. Please try again later."
  },
  zh: {
    name: "姓名",
    email: "邮箱",
    content: "咨询内容",
    submit: "提交咨询",
    success: "您的咨询已成功提交。",
    error: "提交失败，请稍后重试。"
  }
} as const;

export default function InquiryForm({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData(event.currentTarget);
      await submitInquiry({
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        content: String(form.get("content") || "")
      });
      event.currentTarget.reset();
      setMessage(copy.success);
    } catch {
      setMessage(copy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="inquiry-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">{copy.name}</label>
        <input id="name" name="name" placeholder={copy.name} required disabled={loading} />
      </div>
      <div className="form-group">
        <label htmlFor="email">{copy.email}</label>
        <input id="email" name="email" type="email" placeholder={copy.email} required disabled={loading} />
      </div>
      <div className="form-group">
        <label htmlFor="content">{copy.content}</label>
        <textarea id="content" name="content" placeholder={copy.content} required disabled={loading} rows={5} />
      </div>
      <button type="submit" disabled={loading} className="btn btn--primary">
        {loading ? <span className="loading-spinner" /> : copy.submit}
      </button>
      {message && <div className={`form-message ${message === copy.success ? "success" : "error"}`}>{message}</div>}
    </form>
  );
}
