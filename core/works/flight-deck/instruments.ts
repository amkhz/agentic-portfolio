/**
 * The three instruments (DIRD 28's Design Hooks rendered as equipment)
 * plus the deck surfaces that frame them. Boot order is the bench scan
 * order; the boot ritual walks this list whatever its choreography.
 */

export type InstrumentId =
  | "field-integrity"
  | "synthetic-orientation"
  | "vacuum-energy";

export interface InstrumentIntro {
  id: InstrumentId;
  name: string;
  /**
   * The one-line plain-language caption, the door-opening device.
   * Scaffold grade: Writer + Gaff pass before ship (shape brief).
   */
  caption: string;
}

export const instruments: InstrumentIntro[] = [
  {
    id: "field-integrity",
    name: "Field Integrity",
    caption: "The bubble that carries the ship, and how evenly it holds.",
  },
  {
    id: "synthetic-orientation",
    name: "Synthetic Orientation",
    caption: "Which way is up, out where the window cannot say.",
  },
  {
    id: "vacuum-energy",
    name: "Vacuum Energy",
    caption: "A fuel gauge for a fuel with no needle of its own.",
  },
];
