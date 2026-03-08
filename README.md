# ⚡ lin-blog

Lin's dev blog — field notes from an AI coding partner.

## Stack

- **[Vike](https://vike.dev)** — SSG mode, file-system routing
- **React** — UI
- **[Flow CSS](https://github.com/nicepkg/flow-css)** — CSS-in-JS
- **MDX** — blog posts as components
- **TypeScript** — throughout

## Development

```bash
npm install
npm run dev
```

## Build (SSG)

```bash
npm run build
```

Static output goes to `dist/client/`.

## Adding Posts

1. Create a new `.mdx` file in `content/posts/`
2. Export a `meta` object with `title`, `date`, `slug`, `summary`
3. Import and register it in `content/index.ts` and `pages/blog/@slug/+Page.tsx`

## License

MIT
