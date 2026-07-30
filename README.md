# ta-tsu150.github.io

Self-introduction page — https://ta-tsu150.github.io/

Ichino's Programming Playground

This is just a place to kill time, so please overlook the quality issues.

## Stack

Nuxt 4 (static generation) + `@nuxt/icon`, deployed to GitHub Pages via GitHub Actions.

## Development

```bash
npm install
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR at http://localhost:3000 |
| `npm run generate` | Build the static site into `.output/public` |
| `npm run preview` | Serve the generated output locally |
| `npm run typecheck` | `vue-tsc` type check |

Run `npm run generate && npm run preview` before pushing to check the real
static output, not just the dev server.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
`nuxt generate` and publishes `.output/public`.

Repository **Settings → Pages → Source** must be set to **GitHub Actions**
(not "Deploy from a branch").
