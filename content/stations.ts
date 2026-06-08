// The spine: five provocative questions, in reading order.
// Shared by the nav rail and the page so they never drift apart.

export type StationMeta = {
  id: string;
  n: string;
  /** The full question, used as the section heading. */
  question: string;
  /** Short label for the nav rail. */
  short: string;
};

export const STATIONS: StationMeta[] = [
  { id: "smart", n: "01", question: "Is it actually smart?", short: "Smart?" },
  { id: "human", n: "02", question: "Can it pass as human?", short: "Human?" },
  { id: "measure", n: "03", question: "Can we even measure it?", short: "Measure?" },
  { id: "wise", n: "04", question: "Can it be wise, not just smart?", short: "Wise?" },
  { id: "reason", n: "05", question: "Is it reasoning, or just trained?", short: "Reasoning?" },
];
