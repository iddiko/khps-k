import { getSiteConfig } from "@/lib/api";
import PartnerMarquee from "./PartnerMarquee";

export default async function Footer() {
  const site = await getSiteConfig();

  return (
    <>
      <PartnerMarquee logos={site.partnerLogos || []} />
      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <strong>{site.companyName}</strong>
            <div className="small">Hydrogen & Ammonia Power Systems</div>
          </div>
          <div className="small">
            <div>{site.contactEmail}</div>
            <div>{site.contactPhone}</div>
            <div>k-hps.com</div>
          </div>
        </div>
      </footer>
    </>
  );
}
