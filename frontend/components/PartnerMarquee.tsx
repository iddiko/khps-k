export default function PartnerMarquee({
  logos
}: {
  logos?: Array<{ id: string; name: string; image: string }>;
}) {
  // logos prop을 사용 (page.tsx에서 partners prop으로 전달됨)
  if (!logos || !logos.length) return null;

  // 로고를 충분히 많이 반복하여 무한 스크롤 효과 생성
  const repeated = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <section className="partner-strip">
      <div className="container">
        <div className="partner-strip__header">
          <strong>Partners</strong>
          <span>Partner logos can be added and updated from the admin page.</span>
        </div>
      </div>
      <div className="partner-strip__viewport">
        <div className="partner-strip__track">
          {repeated.map((logo, index) => (
            <div className="partner-logo" key={`${logo.id}-${index}`}>
              <img src={logo.image} alt={logo.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
