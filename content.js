/**
 * Orchestrator: finds the three main cards and runs each section extractor.
 *
 * Card order on onlinejobs.ph job pages:
 *   0 → Job Overview        → extractors/jobOverview.js
 *   1 → Skill Requirement   → extractors/skillRequirement.js
 *   2 → About the Employer  → extractors/aboutTheEmployer.js
 */
(function () {
  const CARD_SELECTOR = ".card.card-jobseeker";

  const SECTION_DEFS = [
    { index: 0, key: "jobOverview", label: "Job Overview", run: "jobOverview" },
    { index: 1, key: "skillRequirement", label: "Skill Requirement", run: "skillRequirement" },
    { index: 2, key: "aboutTheEmployer", label: "About the Employer", run: "aboutTheEmployer" },
  ];

  const { helpers, extractors } = window.__OLJ;
  const cards = Array.from(document.querySelectorAll(CARD_SELECTOR));

  const sections = SECTION_DEFS.map((def) => {
    const card = cards[def.index] || null;
    const extractor = extractors[def.run];
    const data =
      typeof extractor === "function"
        ? extractor(card, helpers) || {}
        : { header: "", body: "" };

    return {
      ...data,
      index: def.index,
      key: def.key,
      label: def.label,
      header: data.header || "",
      body: data.body || "",
    };
  });

  return {
    url: location.href,
    title: document.title || "",
    sections,
    jobOverview: sections[0],
    skillRequirement: sections[1],
    aboutTheEmployer: sections[2],
    extractedAt: new Date().toISOString(),
  };
})();
