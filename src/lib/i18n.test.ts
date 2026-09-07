import { describe, expect, it } from "vitest";
import { defaultLocale, isLocale, matchLocale } from "./i18n";

describe("isLocale", () => {
  it("accepts a supported locale", () => {
    expect(isLocale("nl")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});

describe("matchLocale", () => {
  it("falls back to the default when the header is absent", () => {
    expect(matchLocale(null)).toBe(defaultLocale);
  });

  it("falls back to the default when nothing is supported", () => {
    expect(matchLocale("de-DE,de;q=0.9")).toBe(defaultLocale);
  });

  it("matches a region-qualified tag on its base language", () => {
    expect(matchLocale("nl-NL,nl;q=0.9")).toBe("nl");
  });

  it("honours quality ordering over header order", () => {
    expect(matchLocale("de;q=1.0,nl;q=0.8,en;q=0.3")).toBe("nl");
  });
});
