# Curiosa — a free multilingual learning-games site

Curiosa is a small static website of browser games for curious adults: trivia,
mental arithmetic, a country-size duel, a timeline-ordering challenge, and an
English vocabulary vault. It runs entirely in the browser — no server, no
database, no build step, no cost to host.

It speaks **three languages**: English, French, and Arabic (with full
right-to-left layout). A language switcher sits in the top-right of every page.
The **Vocabulary Vault is English-only** by design, since its puzzles are about
English words and their roots.

---

## What's in the box

```
curiosa/
├── index.html          ← homepage / games hub
├── scores.html         ← your local profile + best scores
├── README.md           ← this file
├── assets/
│   ├── shared.css      ← the shared parchment theme + menu + RTL styles
│   ├── strings.js      ← every UI label in EN / FR / AR
│   └── core.js         ← language engine, top menu, local profile, score saving
└── games/
    ├── trivia.html       ← Trivia Expedition  (math · geography · history)
    ├── arithmetic.html   ← Mental Arithmetic Drills
    ├── atlas.html        ← Atlas Showdown  (which country is bigger?)
    ├── timeline.html     ← Timeline Challenge  (put events in order)
    └── vocabulary.html   ← Vocabulary Vault  (English only)
```

**Keep this folder structure exactly as-is.** The games look for the shared
files at `../assets/…`, and the homepage looks for them at `assets/…`. If you
move files around, the menu, languages, and scores will stop loading.

---

## How to put it online for free

You only need to upload this folder to a free static host. Two good options:

### Option A — GitHub Pages (simplest if you already use GitHub)

1. Go to your repository on GitHub.
2. Upload **all** of these files, keeping the folders intact:
   - `index.html`, `scores.html`, `README.md` at the top level
   - the whole `assets/` folder (3 files)
   - the whole `games/` folder (5 files)
   - Click **Commit changes** when done.
3. In the repo, open **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Pick branch **main** and folder **/ (root)**, then **Save**.
6. Wait a minute, refresh, and GitHub shows your live link, like
   `https://YOUR-USERNAME.github.io/curiosa/`.

> **Already uploaded an earlier version?** This release changed the folder
> structure — it now has an `assets/` folder and a new `scores.html`. Please
> **re-upload everything** so the new files replace the old ones. Deleting the
> old loose files first and uploading this whole folder fresh is the cleanest
> way.

### Option B — Cloudflare Pages (free, unlimited bandwidth, easy custom domain)

1. Create a free account at cloudflare.com and open **Workers & Pages**.
2. **Create application → Pages → Connect to Git**, and pick your repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`
4. **Save and Deploy.** You get a `*.pages.dev` link in under a minute.

HTTPS is automatic on both. A custom domain (e.g. `curiosa.com`) is optional and
usually costs about $10–15/year from a registrar; the hosting itself stays free.

---

## How the site works (the honest version)

- **Languages.** The switcher (EN / FR / ع) is top-right. Your choice is
  remembered in your browser. Arabic flips the whole layout to right-to-left.
- **The top menu** is on every page: **Home**, a **Games** dropdown listing all
  five games, and **Scores**.
- **"Accounts" are local.** Signing in just sets a display name and stores your
  best scores **in your own browser, on that one device.** There is no server,
  so nothing syncs between phones/computers and there are no passwords. This is
  the trade-off for a totally free, no-backend site. If you ever want real
  accounts and a shared leaderboard, that needs a backend (e.g. Supabase or
  Cloudflare KV) — a larger project.
- **Scores save on the live site, not in the editor preview.** If you test
  inside a sandboxed preview, score-saving may look like it does nothing —
  that's the preview blocking browser storage, not a bug. On the deployed link
  it works normally.

---

## Adding a new "hall" (game) later

1. Copy an existing file in `games/` (say `trivia.html`) to a new name like
   `games/logic.html`.
2. Replace the game logic in its script block, keeping the top part intact:
   the font links, `../assets/shared.css`, the `<div id="site-header"></div>`,
   the `window.CURIOSA_ROOT="../";` line, and the loads of `strings.js` then
   `core.js`.
3. In `assets/core.js`, add your game to the `GAMES` array
   (`{id, file, name, unit}`) so it appears in the menu and on the Scores page.
4. Add any new labels to `assets/strings.js` in all three languages.
5. On the homepage `index.html`, move your game from the "in development" list
   to the live list (or add it).

The four "coming soon" tiles on the homepage — Logic Gauntlet, Science Lab,
Daily Challenge, and Literature & Lore — are placeholders waiting for exactly
this treatment whenever you want to build them.

---

Made to be tinkered with. Have fun.
