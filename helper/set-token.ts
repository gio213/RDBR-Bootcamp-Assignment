const TOKEN_KEY = "token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setAuthToken(token: string) {
  if (typeof document === "undefined") return;

  document.cookie = [
    `${TOKEN_KEY}=${encodeURIComponent(token)}`,
    "path=/",
    `max-age=${TOKEN_MAX_AGE}`,
    "SameSite=Lax",
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;

  const tokenCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${TOKEN_KEY}=`));

  if (!tokenCookie) return null;

  return decodeURIComponent(tokenCookie.split("=")[1] ?? "");
}

export function removeAuthToken() {
  if (typeof document === "undefined") return;

  document.cookie = [
    `${TOKEN_KEY}=`,
    "path=/",
    "max-age=0",
    "SameSite=Lax",
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}
