/*
  Facts about the pavilion that still need confirmation from the Russian Export
  Center ("подтвердить у РЭЦ"). The visible strings in src/i18n/ui.ts are
  literals for now; if any value here changes, update the strings listed in the
  pull request that introduced them (meta.description, trust.*, pavilion.*,
  about.facts, footer.operator).
*/
export const company = {
  /** Opening date of the Made in Russia national pavilion in Navi Mumbai. Подтвердить у РЭЦ. */
  pavilionOpened: '2026-08-21',
  /** Whether it is the first pavilion of the programme in India. Подтвердить у РЭЦ. */
  firstInIndia: true,
  /** Official English name of the pavilion. Подтвердить у РЭЦ. */
  officialPavilionName: 'Made in Russia national pavilion',
  /** Russian companies present in the pavilion. Open sources, checked 2026-09-12; update the date when the number changes. */
  pavilionResidents: 37,
  pavilionResidentsCheckedOn: '2026-09-12',
} as const;
