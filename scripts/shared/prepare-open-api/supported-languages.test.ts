import { supportedLanguages } from "./index";

describe("supported SDK languages", () => {
  it("downgrades every language to OpenAPI 3.0.1 before generation", () => {
    const languages = Object.values(supportedLanguages);

    expect(languages.length).toBeGreaterThan(0);
    for (const language of languages) {
      expect(language.downgradeTo301).toBe(true);
    }
  });
});
