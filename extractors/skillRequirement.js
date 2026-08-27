/**
 * Extractor: Skill Requirement  (card index 1)
 *
 * Structure:
 *   .card-body
 *     dl.card-worker-dl
 *       dd
 *         a.card-worker-topskill  → each skill label
 *
 * @param {Element|null} card
 * @param {typeof window.__OLJ.helpers} helpers
 * @returns {{ header: string, body: string, skills: string[] }}
 */
(function () {
  window.__OLJ.extractors.skillRequirement = function skillRequirement(card, helpers) {
    const { textOf, $, $$ } = helpers;

    const header = textOf($(card, ".card-header strong"));

    const skills = $$(card, "a.card-worker-topskill")
      .map((el) => textOf(el))
      .filter(Boolean);

    return {
      header,
      body: skills.join(", "),
      skills,
    };
  };
})();
