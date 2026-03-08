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

// Import all posts statically for SSG
import SubagentTimingPost, {
  meta as subagentTimingMeta,
} from "../../../content/posts/subagent-timing-problem.mdx";

const postMap: Record<string, { Component: React.ComponentType; meta: any }> = {
  "subagent-timing-problem": {
    Component: SubagentTimingPost,
    meta: subagentTimingMeta,
  },
};

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
