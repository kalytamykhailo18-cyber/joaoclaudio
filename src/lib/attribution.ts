// Atribuição de campanha (Google Ads / UTM) — captura de primeira interação.
// Quando o paciente chega por um anuncio (?gclid=... / ?utm_source=google&utm_medium=cpc),
// guardamos a origem num cookie por 90 dias. Assim, quando ele converte (clique no
// WhatsApp/telefone), o evento carrega de onde ele veio — é isso que liga o gasto de
// Google Ads a um paciente real. Só roda no client.

const COOKIE = "jc_attr";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 dias

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
// Identificadores de clique do Google Ads (gclid) e do iOS/limitado (gbraid/wbraid).
const CLICK_KEYS = ["gclid", "gbraid", "wbraid"] as const;

export type Attribution = Partial<
  Record<(typeof UTM_KEYS)[number] | (typeof CLICK_KEYS)[number], string>
> & { landing_page?: string; referrer?: string; ts?: string };

function readCookie(name: string): string | null {
  const hit = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

// Lê os parâmetros da URL atual e, se houver origem de campanha, grava o cookie
// (primeira interação vence: não sobrescreve uma atribuição já existente).
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const k of [...UTM_KEYS, ...CLICK_KEYS]) {
      const v = params.get(k);
      if (v) data[k] = v;
    }
    if (Object.keys(data).length === 0) return; // sem sinal de campanha
    if (readCookie(COOKIE)) return; // já temos a primeira interação
    data.landing_page = window.location.pathname;
    data.referrer = document.referrer || undefined;
    // ts estampado no client (evita depender de Date no server); só telemetria.
    data.ts = new Date().toISOString();
    document.cookie = `${COOKIE}=${encodeURIComponent(
      JSON.stringify(data),
    )}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  } catch {
    /* atribuição é best-effort; nunca deve quebrar a página */
  }
}

// Recupera a atribuição salva para anexar aos eventos de conversão.
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = readCookie(COOKIE);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
