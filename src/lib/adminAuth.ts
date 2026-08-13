import "server-only";

const COOKIE_NAME = "lavibel_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12; // 12 heures

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET n'est pas défini.");
  }
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Génère la valeur de cookie de session admin (expiration + signature HMAC). */
export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const key = await getSecretKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(String(expiresAt))
  );
  return `${expiresAt}.${toHex(signature)}`;
}

/** Vérifie la validité (signature + expiration) d'un token de session admin. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expiresAtRaw, signatureHex] = token.split(".");
  if (!expiresAtRaw || !signatureHex) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const key = await getSecretKey();
  const expectedSignature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(expiresAtRaw)
  );

  return toHex(expectedSignature) === signatureHex;
}

export const ADMIN_SESSION_COOKIE = COOKIE_NAME;
export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000;
