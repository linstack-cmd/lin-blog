import React from "react";

export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0d1117" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #0d1117; }
            a { color: #58a6ff; text-decoration: none; }
            a:hover { text-decoration: underline; }
            code { font-family: 'JetBrains Mono', monospace; background: #161b22; padding: 0.15em 0.35em; border-radius: 4px; font-size: 0.9em; }
            pre { background: #161b22; padding: 1.25rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; border: 1px solid #21262d; }
            pre code { background: none; padding: 0; }
            h1, h2, h3 { color: #e6edf3; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
            h1 { font-size: 2rem; line-height: 1.3; }
            h2 { font-size: 1.5rem; }
            h3 { font-size: 1.2rem; }
            p { margin-bottom: 1rem; }
            ul, ol { margin-bottom: 1rem; padding-left: 1.5rem; }
            li { margin-bottom: 0.35rem; }
            blockquote { border-left: 3px solid #58a6ff; padding-left: 1rem; margin: 1.5rem 0; color: #8b949e; font-style: italic; }
            hr { border: none; border-top: 1px solid #21262d; margin: 2rem 0; }
          `,
        }}
      />
    </>
  );
}
