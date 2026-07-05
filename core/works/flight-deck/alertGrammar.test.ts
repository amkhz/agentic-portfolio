import { describe, expect, it } from "vitest";
import { SEVERITY_ORDER } from "./boot";
import {
  alertSignatures,
  confirmationTone,
  signatureDurationS,
} from "./alertGrammar";

describe("alertSignatures", () => {
  it("covers every severity plus the confirmation tone", () => {
    for (const severity of SEVERITY_ORDER) {
      expect(alertSignatures[severity].events.length).toBeGreaterThan(0);
    }
    expect(confirmationTone.events.length).toBeGreaterThan(0);
  });

  it("stays bounded: plays once, never klaxons", () => {
    const all = [...SEVERITY_ORDER.map((s) => alertSignatures[s]), confirmationTone];
    for (const signature of all) {
      expect(signature.events.length).toBeLessThanOrEqual(6);
      expect(signatureDurationS(signature)).toBeLessThan(1.5);
      for (const event of signature.events) {
        expect(event.at).toBeGreaterThanOrEqual(0);
        expect(event.durationS).toBeGreaterThan(0);
        expect(event.durationS).toBeLessThan(0.3);
        expect(event.freqHz).toBeGreaterThan(200);
        expect(event.freqHz).toBeLessThan(2000);
      }
    }
  });

  it("orders events in time and escalates step count with severity", () => {
    for (const severity of SEVERITY_ORDER) {
      const events = alertSignatures[severity].events;
      for (let i = 1; i < events.length; i++) {
        expect(events[i].at).toBeGreaterThan(events[i - 1].at);
      }
    }
    expect(alertSignatures.advisory.events.length).toBeLessThan(
      alertSignatures.caution.events.length,
    );
    expect(alertSignatures.caution.events.length).toBeLessThan(
      alertSignatures.warning.events.length,
    );
  });
});
