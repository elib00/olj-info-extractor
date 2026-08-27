# OLJ Info Extractor

Chrome extension that extracts key details from an [OnlineJobs.ph](https://www.onlinejobs.ph) job post into clean, structured text — ready to paste into an AI tool for cover letters, job analysis, and more.

**Version:** 1.0.0 · **Manifest:** V3

---

## Compatibility

Published on the **[Chrome Web Store](https://chromewebstore.google.com/)**. It runs in Chromium browsers that can install extensions from that store, including:

- **Google Chrome**
- **Brave**
- **Microsoft Edge** (via Chrome Web Store — not listed on Edge Add-ons)
- Other Chromium browsers with Chrome Web Store support (e.g. Vivaldi, Opera with Chrome extension support)

It does **not** run on Firefox or Safari.

---

## What it extracts

| Section | Description |
| --- | --- |
| **Job Overview** | Main job description from the listing |
| **Skill Requirement** | Required skills (as a list when available) |
| **About the Employer** | Employer / company details |
| **Title & URL** | Page title and job post link |

---

## Install (developer / unpacked)

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked**
4. Select this project folder

---

## How to use

1. Open a job post on **OnlineJobs.ph**
2. Click the **OLJ Info Extractor** icon
3. Press **Extract**
4. Press **Copy** to put the structured text on your clipboard
5. Paste into ChatGPT, Claude, or any other AI assistant

---

## Permissions

| Permission | Why it's needed |
| --- | --- |
| `activeTab` | Access the current job page when you click Extract |
| `scripting` | Run the extractors on that page |

The extension only runs when you trigger it — it does not browse other tabs or run in the background.

---

## Project structure

```
olj-info-extractor/
├── manifest.json
├── popup.html / popup.js / popup.css
├── content.js                 # Orchestrates the three section extractors
├── extractors/
│   ├── shared.js              # Shared helpers
│   ├── jobOverview.js
│   ├── skillRequirement.js
│   └── aboutTheEmployer.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Notes

- Designed for **OnlineJobs.ph job pages**. Open a listing first, then extract.
- After changing files locally, click **Reload** on the extension card in `chrome://extensions`.
- For public install, use the Chrome Web Store listing — not Edge Add-ons.
