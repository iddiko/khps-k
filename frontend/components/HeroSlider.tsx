"use client";

import { useEffect, useState } from "react";
import { Locale } from "@/lib/types";
import { t } from "@/lib/api";

type Slide = {
  id: string;
  image: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export default function HeroSlider({ slides, locale }: { slides: Slide[]; locale: Locale }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide =
    slides[index] ||
    ({
      id: "fallback-slide",
      image:
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=80",
      title: {
        ko: "수소와 암모니아 발전의 새로운 기준",
        en: "A New Standard for Hydrogen and Ammonia Power",
        zh: "氢能与氨能发电的新标准"
      },
      description: {
        ko: "대한수소발전은 수소와 암모니아 기반 발전 기술을 실제 산업 현장에 적용하는 것을 목표로 연구와 설비 구축을 이어가고 있습니다.",
        en: "KHPS continues research and deployment to bring hydrogen and ammonia-based generation technologies into real industrial sites.",
        zh: "大韩氢素发电持续推进研发与设备建设，致力于将氢能与氨能发电技术应用到实际产业现场。"
      }
    } satisfies Slide);

  return (
    <section className="hero">
      <div className="hero__image" style={{ backgroundImage: `url(${slide.image})` }} />
      <div className="hero__overlay" />
      <div className="container hero__content">
        <div className="hero__eyebrow">Korea Hydrogen Power Solutions</div>
        <h1>{t(slide.title, locale)}</h1>
        <p>{t(slide.description, locale)}</p>
      </div>
    </section>
  );
}
