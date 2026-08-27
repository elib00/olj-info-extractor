/**
 * Shared helpers for OLJ section extractors.
 * Available as window.__OLJ.helpers inside injected scripts.
 */
(function () {
  const root = (window.__OLJ = window.__OLJ || {});
  root.extractors = root.extractors || {};

  root.helpers = {
    textOf(el) {
      if (!el) return "";
      return (el.innerText || el.textContent || "").trim();
    },

    /**
     * @param {Element|null} rootEl
     * @param {string} selector
     */
    $(rootEl, selector) {
      if (!rootEl) return null;
      return rootEl.querySelector(selector);
    },

    /**
     * @param {Element|null} rootEl
     * @param {string} selector
     */
    $$(rootEl, selector) {
      if (!rootEl) return [];
      return Array.from(rootEl.querySelectorAll(selector));
    },
  };
})();
