import { fallbackGoldPrice } from "@/lib/dummy-data";

export type GoldPrice = {
  pricePerGram: number;
  updatedAt: string; // YYYY-MM-DD
  source: "live" | "fallback";
};

// Sumber live: Logam Mulia API (github.com/iamutaki/logam-mulia-api) — layanan publik gratis
// tanpa API key yang scrape harga jual Antam dari anekalogam.co.id, di-cache harian oleh mereka.
// Tetap panggil server-side saja (bukan dari client) & pakai Next.js fetch cache supaya tidak
// membebani API pihak ketiga di setiap request.
const GOLD_API_URL = "https://logam-mulia-api.iamutaki.workers.dev/api/prices/anekalogam";
const REVALIDATE_SECONDS = 60 * 60; // 1 jam

type AnekaLogamEntry = {
  weight: number;
  weightUnit: string;
  material: string;
  materialType: string;
  sellPrice: number;
  recordedDate: string;
};

export async function getGoldPrice(): Promise<GoldPrice> {
  try {
    const res = await fetch(GOLD_API_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`Gold price API responded with ${res.status}`);

    const json: { success: boolean; data: AnekaLogamEntry[] } = await res.json();
    // Ambil harga LM Antam produksi terbaru per 1 gram — hindari varian "Certicard" yang
    // formatnya beda (harga per keping 100gr yang di-mark sebagai weight:1 oleh sumbernya).
    const entry = json.data?.find(
      (d) =>
        d.weightUnit === "gr" &&
        d.weight === 1 &&
        d.material === "gold" &&
        !d.materialType.includes("Certicard")
    );
    if (!entry || !Number.isFinite(entry.sellPrice) || entry.sellPrice <= 0) {
      throw new Error("Gold price API returned no usable 1 gram entry");
    }

    return {
      pricePerGram: entry.sellPrice,
      updatedAt: entry.recordedDate,
      source: "live",
    };
  } catch {
    return { ...fallbackGoldPrice, source: "fallback" };
  }
}
