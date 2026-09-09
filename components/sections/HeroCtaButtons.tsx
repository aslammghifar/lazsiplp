"use client";

import { Button } from "@/components/ui/Button";
import { smoothScrollToId } from "@/lib/smooth-scroll";
import { siteConfig } from "@/lib/site-config";

export function HeroCtaButtons() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (smoothScrollToId(id)) {
      e.preventDefault();
    }
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
      <Button
        href="#kalkulator-zakat"
        variant="white"
        icon="arrow"
        fullWidthOnMobile
        onClick={(e) => handleClick(e, "kalkulator-zakat")}
      >
        {siteConfig.hero.ctaPrimaryLabel}
      </Button>
      <Button
        href="#donasi"
        variant="outline-light"
        fullWidthOnMobile
        onClick={(e) => handleClick(e, "donasi")}
      >
        {siteConfig.hero.ctaSecondaryLabel}
      </Button>
    </div>
  );
}
