import { Locale } from "@/lib/types";
import { t } from "@/lib/api";

export default function PageHero({
  image,
  title,
  description,
  locale
}: {
  image: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  locale: Locale;
}) {
  return (
    <section className="hero page-hero" style={{ minHeight: "42vh" }}>
      <div className="hero__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="hero__overlay" />
      <div className="container hero__content">
        <div className="hero__eyebrow">K-HPS</div>
        <h1>{t(title, locale)}</h1>
        <p>{t(description, locale)}</p>
      </div>
    </section>
  );
}
