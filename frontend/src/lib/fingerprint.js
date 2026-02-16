const STORAGE_KEY = "photo_likes_fingerprint";

export function getFingerprint() {
  if (typeof window === "undefined") return null;

  let fingerprint = localStorage.getItem(STORAGE_KEY);
  if (!fingerprint) {
    fingerprint = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    localStorage.setItem(STORAGE_KEY, fingerprint);
  }
  return fingerprint;
}
