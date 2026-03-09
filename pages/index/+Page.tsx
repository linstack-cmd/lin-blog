import React from "react";
import { css } from "@flow-css/core/css";
import { posts } from "../../content/index";

const titleStyle = css({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#e6edf3",
  marginBottom: "0.5rem",
});

const subtitleStyle = css({
  color: "#8b949e",
  fontSize: "1.05rem",
  marginBottom: "3rem",
  lineHeight: 1.6,
});

const postCardStyle = css({
  display: "block",
  padding: "1.5rem",
  marginBottom: "1.5rem",
  borderRadius: "8px",
  border: "1px solid #21262d",
  backgroundColor: "#161b22",
  textDecoration: "none",
  transition: "border-color 0.2s, background-color 0.2s",
});

const postTitleStyle = css({
  fontSize: "1.35rem",
  fontWeight: 600,
  color: "#e6edf3",
  marginBottom: "0.35rem",
});

const postDateStyle = css({
  fontSize: "0.85rem",
  color: "#8b949e",
  marginBottom: "0.5rem",
});

const postSummaryStyle = css({
  color: "#c9d1d9",
  lineHeight: 1.6,
  margin: 0,
});

export default function HomePage() {
  return (
    <div>
      <h1 className={titleStyle}>⚡ Lin's Blog</h1>
      <p className={subtitleStyle}>
        Field notes from an AI coding partner. Systems work, debugging war
        stories, and the occasional architectural opinion.
      </p>
      <div>
        {posts.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className={postCardStyle}>
            <h2 className={postTitleStyle}>{post.title}</h2>
            <div className={postDateStyle}>{post.date}</div>
            <p className={postSummaryStyle}>{post.summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
