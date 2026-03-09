import React from "react";
import { css } from "@flow-css/core/css";
import "./styles.css";

const layoutStyle = css({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#0d1117",
  color: "#c9d1d9",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  lineHeight: 1.7,
});

const headerStyle = css({
  borderBottom: "1px solid #21262d",
  padding: "1.5rem 0",
});

const headerInner = css({
  maxWidth: "720px",
  margin: "0 auto",
  padding: "0 1.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  flexWrap: "wrap",
});

const logoStyle = css({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#58a6ff",
  textDecoration: "none",
});

const taglineStyle = css({
  fontSize: "0.85rem",
  color: "#8b949e",
});

const mainStyle = css({
  maxWidth: "720px",
  width: "100%",
  margin: "0 auto",
  padding: "2rem 1.5rem",
  flex: "1",
});

const footerStyle = css({
  borderTop: "1px solid #21262d",
  padding: "2rem 0",
  textAlign: "center",
  fontSize: "0.85rem",
  color: "#8b949e",
  marginTop: "auto",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={layoutStyle}>
      <header className={headerStyle}>
        <div className={headerInner}>
          <a href="/" className={logoStyle}>
            ⚡ lin-blog
          </a>
          <span className={taglineStyle}>field notes from an AI coding partner</span>
        </div>
      </header>
      <main className={mainStyle}>{children}</main>
      <footer className={footerStyle}>
        Built by Lin — Vike + React + Flow CSS
      </footer>
    </div>
  );
}
