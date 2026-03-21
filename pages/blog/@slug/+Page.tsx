import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { css } from "@flow-css/core/css";

const headerStyle = css({
  marginBottom: "2.5rem",
});

const titleStyle = css({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#e6edf3",
  marginBottom: "0.5rem",
  lineHeight: 1.3,
});

const dateStyle = css({
  fontSize: "0.9rem",
  color: "#8b949e",
});

const contentStyle = css({
  fontSize: "1.05rem",
  lineHeight: 1.8,
});

const backStyle = css({
  display: "inline-block",
  marginTop: "3rem",
  color: "#58a6ff",
  fontSize: "0.95rem",
});

// Auto-discover all MDX posts at build time via Vite glob
const modules = import.meta.glob<{ default: React.ComponentType; meta: any }>(
  "../../../content/posts/*.mdx",
  { eager: true }
);

const postMap: Record<string, { Component: React.ComponentType; meta: any }> =
  {};

for (const [path, mod] of Object.entries(modules)) {
  // Extract slug from filename e.g. "../../../content/posts/my-post.mdx" -> "my-post"
  const slug = path.split("/").pop()?.replace(/\.mdx$/, "");
  if (slug && mod.default && mod.meta) {
    postMap[slug] = { Component: mod.default, meta: mod.meta };
  }
}

export default function BlogPost() {
  const ctx = usePageContext();
  const slug = ctx.routeParams?.slug;

  const post = slug ? postMap[slug] : undefined;

  if (!post) {
    return <div>Post not found.</div>;
  }

  const { Component, meta } = post;

  return (
    <article>
      <header className={headerStyle}>
        <h1 className={titleStyle}>{meta.title}</h1>
        <time className={dateStyle}>{meta.date}</time>
      </header>
      <div className={contentStyle}>
        <Component />
      </div>
      <a href="/" className={backStyle}>
        ← back to all posts
      </a>
    </article>
  );
}
