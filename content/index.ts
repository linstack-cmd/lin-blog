interface PostMeta {
  title: string;
  date: string;
  slug: string;
  summary: string;
}

// Auto-discover all MDX posts at build time via Vite glob
const modules = import.meta.glob<{ meta: PostMeta }>("./posts/*.mdx", {
  eager: true,
});

export const posts: PostMeta[] = Object.values(modules)
  .map((mod) => mod.meta)
  .filter(Boolean)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export type { PostMeta };
