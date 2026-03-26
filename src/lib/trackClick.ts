export function trackClick(productId: string, influencerId: string) {
  fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, influencerId }),
  }).catch(() => {});
}
