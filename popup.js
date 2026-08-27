const extractBtn = document.getElementById("extract");
const copyBtn = document.getElementById("copy");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

let lastPayload = null;

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function formatStructuredText(payload) {
  const lines = [];

  if (payload.title) lines.push(`Title: ${payload.title}`);
  if (payload.url) lines.push(`URL: ${payload.url}`);
  if (payload.title || payload.url) lines.push("");

  for (const section of payload.sections || []) {
    const heading = section.label || section.header || `Section ${section.index}`;
    lines.push(`## ${heading}`);

    if (Array.isArray(section.skills) && section.skills.length) {
      for (const skill of section.skills) {
        lines.push(`- ${skill}`);
      }
    } else if (section.body) {
      lines.push(section.body);
    } else {
      lines.push("(empty)");
    }

    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

function showResult(data) {
  lastPayload = data;
  resultsEl.innerHTML = "";

  const sections = data.sections || [];
  const found = sections.filter((s) => s.header || s.body).length;

  if (!found) {
    copyBtn.disabled = true;
    resultsEl.innerHTML = `<p class="empty">No .card.card-jobseeker sections found.</p>`;
    return;
  }

  for (const section of sections) {
    const block = document.createElement("section");
    block.className = "section";

    const title = document.createElement("h2");
    title.textContent = `[${section.index}] ${section.label}`;
    block.appendChild(title);

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = section.header
      ? `Page header: ${section.header}`
      : "Missing on this page";
    block.appendChild(meta);

    const body = document.createElement("textarea");
    body.rows = Math.min(12, Math.max(3, (section.body || "").split("\n").length + 1));
    body.readOnly = true;
    body.value = section.body || "";
    block.appendChild(body);

    resultsEl.appendChild(block);
  }

  copyBtn.disabled = false;
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function extract() {
  setStatus("Extracting…");
  copyBtn.disabled = true;
  resultsEl.innerHTML = "";

  try {
    const tab = await getActiveTab();
    if (!tab?.id) {
      throw new Error("No active tab found.");
    }

    if (!tab.url || /^(chrome|edge|about|chrome-extension):/i.test(tab.url)) {
      throw new Error("Open a normal web page, then try again.");
    }

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [
        "extractors/shared.js",
        "extractors/jobOverview.js",
        "extractors/skillRequirement.js",
        "extractors/aboutTheEmployer.js",
        "content.js",
      ],
    });

    if (!result) {
      throw new Error("Nothing returned from the page.");
    }

    showResult(result);
    const found = (result.sections || []).filter((s) => s.header || s.body).length;
    setStatus(found ? `Extracted ${found}/3 sections.` : "No sections found.");
  } catch (err) {
    lastPayload = null;
    resultsEl.innerHTML = "";
    setStatus(err?.message || "Extraction failed.", true);
  }
}

async function copyAll() {
  if (!lastPayload) return;

  const text = formatStructuredText(lastPayload);
  if (!text.trim()) return;

  try {
    await navigator.clipboard.writeText(text);
    setStatus("Copied structured text to clipboard.");
  } catch {
    setStatus("Could not copy to clipboard.", true);
  }
}

extractBtn.addEventListener("click", extract);
copyBtn.addEventListener("click", copyAll);
