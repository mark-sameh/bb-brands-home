# bb-brands-home

A lightweight static home page listing all BibleBooster production brands (Bible Society deployments).

## Project structure

```
bb-brands-home/
├── index.html   — page shell and layout
├── styles.css   — all styling (light + dark mode)
├── brands.js    — brand data (the single source of truth)
└── app.js       — rendering, search, and filtering logic
```

## Running locally

No build step needed. Just open `index.html` in a browser:

```bash
# Option 1 — double-click index.html in your file manager

# Option 2 — VS Code Live Server
# Right-click index.html → "Open with Live Server"

# Option 3 — Python one-liner
python -m http.server 3000
# then open http://localhost:3000
```

## Updating brands

All brand data lives in `brands.js` in the `BRANDS` array. Each entry has:

| Field        | Type   | Description                                    |
|--------------|--------|------------------------------------------------|
| `key`        | string | Internal brand key (matches ibep-prod subdomain) |
| `flag`       | string | Emoji flag                                     |
| `country`    | string | Display country / region name                  |
| `org`        | string | Full organisation name                         |
| `tier`       | string | `"plus"` \| `"essential"` \| `"test"`          |
| `prodUrl`    | string | Internal prod URL (`*.ibep-prod.com`)          |
| `commercial` | string | Public-facing URL (empty string if unknown)    |

Cards link to `commercial` if set, otherwise fall back to `prodUrl`.

## Features

- 🔍 Live search by country, org name, or brand key
- 🏷️ Filter by tier: All / Plus / Essential / Test
- 🌙 Automatic dark mode (follows OS preference)
- 🔗 Click a card to open the brand's website in a new tab
