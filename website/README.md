# LeetCode Solutions Portal (Firebase Hosting)

A fast, searchable, and modern web application that indexes all LeetCode problem solutions in this repository.

## Features
- **Instant Search:** Search instantly by problem number (e.g. `20`, `100`, `217`) or title (e.g. `Same Tree`, `Sudoku`).
- **Keyboard Shortcuts:** Press `/` or `Ctrl+K` to jump to search. Use `Left Arrow` / `Right Arrow` to flip through problems.
- **Difficulty & Language Filters:** Filter by Easy, Medium, Hard, and language (C++, Java, SQL, Python).
- **Code Viewer:** Syntax highlighting with Prism, multi-language tabs, and one-click copy code.
- **Direct Deep Linking:** Shareable URL hash navigation (e.g. `/#/problem/100`).
- **Firebase Ready:** Pre-configured `firebase.json` with SPA routing and CDN caching rules.

---

## Local Development

From the root repository or inside `website/`:

```bash
# In the website/ directory:
cd website
npm install
npm run dev

# Or from the repository root:
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## How It Works with LeetSync

When you solve new problems on LeetCode:
1. LeetSync pushes new folders (e.g. `45-jump-game-ii/`) to your repository.
2. Running `npm run build` runs `node scripts/extract-problems.js` automatically.
3. The extractor scans the folders, extracts problem numbers, titles, descriptions, difficulty badges, and code files, updating `src/data/problems.json`.
4. Vite bundles the static site into `dist/`.

---

## How to Deploy to Firebase Hosting

### Step 1: Login to Firebase CLI
```bash
firebase login
```

### Step 2: Set your Firebase Project
```bash
firebase use --add
```
Select your Firebase project from the list, or enter its Project ID.

### Step 3: Deploy
```bash
# From the root:
npm run deploy

# Or from inside website/:
cd website
npm run deploy
```

Your website will be live on `https://<your-project-id>.web.app`!
