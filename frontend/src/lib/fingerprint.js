const STORAGE_KEY = "photo_likes_fingerprint";

export function getFingerprint() {
  if (typeof window === "undefined") return null;

  let fingerprint = localStorage.getItem(STORAGE_KEY);
  if (!fingerprint) {
    fingerprint = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, fingerprint);
  }
  return fingerprint;
}
