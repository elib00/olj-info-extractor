/**
 * Extractor: About the Employer  (card index 2)
 *
 * Fill this in with About the Employer–specific selectors / parsing.
 * Receives the matching .card.card-jobseeker element (or null).
 *
 * @param {Element|null} card
 * @param {typeof window.__OLJ.helpers} helpers
 * @returns {{ header: string, body: string, [key: string]: unknown }}
 */
(function () {
  window.__OLJ.extractors.aboutTheEmployer = function aboutTheEmployer(card, helpers) {
    const { textOf, $ } = helpers;

    const cardHeader = $(card, ".card-header strong");
    const cardBody = $(card, ".card-body");

    return {
      header: textOf(cardHeader),
      body: textOf(cardBody),
    };
  };
})();
