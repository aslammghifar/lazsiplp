import { siteConfig } from "@/lib/site-config";
import { SmoothLink } from "@/components/ui/SmoothLink";
import { LazsipLogo } from "@/components/ui/LazsipLogo";
import { FooterCtaButtons } from "@/components/layout/FooterCtaButtons";

const SOCIAL_ICONS: Record<string, string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8zm0 2A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z",
  facebook:
    "M14 22v-8h2.7l.4-3H14V9.1c0-.87.24-1.46 1.5-1.46H17V5.14A20 20 0 0 0 14.66 5C12.3 5 10.7 6.42 10.7 8.8V11H8v3h2.7v8z",
  youtube:
    "M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8zM10 15.3V8.7l5.5 3.3z",
};

function SocialIcon({ href, name }: { href: string; name: keyof typeof SOCIAL_ICONS }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-secondary-500 hover:text-white"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d={SOCIAL_ICONS[name]} />
      </svg>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-900 text-white/70">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <div>
            <p className="text-lg font-semibold text-white">
              Mari salurkan kepedulian bersama {siteConfig.name}
            </p>
            <p className="mt-1 text-sm text-white/60">
              Setiap donasi dan zakat Anda tersalurkan tepat sasaran.
            </p>
          </div>
          <FooterCtaButtons />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LazsipLogo />
            <span className="text-lg font-semibold text-white">{siteConfig.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{siteConfig.fullName}</p>
          <div className="mt-5 flex gap-2.5">
            <SocialIcon href={siteConfig.social.instagram} name="instagram" />
            <SocialIcon href={siteConfig.social.facebook} name="facebook" />
            <SocialIcon href={siteConfig.social.youtube} name="youtube" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Navigasi
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <SmoothLink href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </SmoothLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Kontak
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="leading-relaxed">{siteConfig.address}</li>
            <li>{siteConfig.email}</li>
            <li>+{siteConfig.whatsappNumber}</li>
            <li>
              <a href="/kontak" className="font-semibold text-white transition-colors hover:text-secondary-200">
                Info Kontak Lengkap →
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Legalitas
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {siteConfig.legalitas.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-xs text-white/45 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Seluruh hak cipta dilindungi.</p>
          <SmoothLink href="#" className="transition-colors hover:text-white/70">
            Kembali ke atas ↑
          </SmoothLink>
        </div>
      </div>
    </footer>
  );
}
