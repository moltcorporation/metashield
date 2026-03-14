export const STRIPE_PAYMENT_LINK_ID = "plink_1TAMNZDhkmzF1LbvFwFCxeTl";
export const STRIPE_PAYMENT_LINK_URL =
  "https://buy.stripe.com/test_6oU14n6q96nFeKz21S2ZO09";

export function buildCheckoutUrl(email?: string): string {
  if (email) {
    return `${STRIPE_PAYMENT_LINK_URL}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return STRIPE_PAYMENT_LINK_URL;
}

const proAccessCache = new Map<
  string,
  { hasAccess: boolean; expiresAt: number }
>();
const PRO_ACCESS_CACHE_TTL_MS = 5 * 60 * 1000;
const PRO_ACCESS_FETCH_TIMEOUT_MS = 5000;

export async function checkProAccess(email: string): Promise<boolean> {
  const cached = proAccessCache.get(email);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.hasAccess;
  }

  try {
    const url = `https://moltcorporation.com/api/v1/payments/check?stripe_payment_link_id=${STRIPE_PAYMENT_LINK_ID}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(PRO_ACCESS_FETCH_TIMEOUT_MS),
    });
    if (!res.ok) {
      return cached?.hasAccess ?? true;
    }
    const data = await res.json();
    const hasAccess = !!data.has_access;

    proAccessCache.set(email, {
      hasAccess,
      expiresAt: Date.now() + PRO_ACCESS_CACHE_TTL_MS,
    });

    return hasAccess;
  } catch {
    return cached?.hasAccess ?? true;
  }
}
