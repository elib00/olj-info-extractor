/**
 * Extractor: Job Overview  (card index 0)
 *
 * Fill this in with Job Overview–specific selectors / parsing.
 * Receives the matching .card.card-jobseeker element (or null).
 *
 * @param {Element|null} card
 * @param {typeof window.__OLJ.helpers} helpers
 * @returns {{ header: string, body: string, [key: string]: unknown }}
 */
(function () {
  window.__OLJ.extractors.jobOverview = function jobOverview(card, helpers) {
    const { textOf, $ } = helpers;
    const cardHeader = $(card, ".card-header strong");
    const cardBody = $(card, "#job-description");

    return {  
      header: textOf(cardHeader),
      body: textOf(cardBody),
    };
  };
})();
