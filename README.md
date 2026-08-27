# OLJ Info Extractor

Chrome/Edge (Manifest V3) extension that extracts **header** and **body** text from the current tab.

## Load it

1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this folder

## Use it

1. Open any normal web page
2. Click the extension icon
3. Press **Extract**
4. Optionally **Copy** header + body

## Custom selectors

When you have site-specific selectors, edit these two constants in `content.js`:

```js
const HEADER_SELECTOR = "h1";
const BODY_SELECTOR = "main, article, [role='main'], body";
```

Comma-separated lists are supported; the first matching element wins.
