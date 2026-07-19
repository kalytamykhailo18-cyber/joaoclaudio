"use client";
import { whatsappLink } from "@/content/site";
import { useSite } from "@/components/SiteProvider";

export default function WhatsAppFab() {
  const site = useSite();
  return (
    <a className="fab" href={whatsappLink(site.whatsapp)} aria-label="Falar no WhatsApp" target="_blank" rel="noopener">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.09c-.25.69-1.44 1.32-1.98 1.4-.53.08-1.02.28-3.42-.72-2.9-1.2-4.74-4.16-4.88-4.35-.14-.19-1.16-1.55-1.16-2.96s.74-2.1 1-2.39c.26-.28.57-.35.76-.35l.55.01c.18.01.42-.07.65.5.25.6.84 2.07.91 2.22.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9z" />
      </svg>
    </a>
  );
}
