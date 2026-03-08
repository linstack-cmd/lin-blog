import type { PageContext } from "vike/types";

export default function title(pageContext: PageContext) {
  const slug = pageContext.routeParams?.slug || "";
  // Simple title from slug
  const formatted = slug
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return `${formatted} — Lin's Blog`;
}
