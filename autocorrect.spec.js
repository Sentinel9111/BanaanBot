const autocorrect = require('./autocorrect.js');

test('should replace terms case-insensitively', () => {
    expect(autocorrect("jou")).toBe("jij");
    expect(autocorrect("Jou")).toBe("jij");
    expect(autocorrect("jOu")).toBe("jij");
    expect(autocorrect("joU")).toBe("jij");
    expect(autocorrect("JOU")).toBe("jij");
});

test('should ignore non-matching terms', () => {
    expect(autocorrect("!@#!$")).toBe(false);
});

test('should properly replace multiple terms', () => {
    expect(autocorrect("o&o o&o")).toBe("oooo oooo");

    expect(autocorrect("o&o&o")).toBe("oooo&o");
    expect(autocorrect("o&o&o&o")).toBe("oooo&oooo");
});

test('should properly replace co-corrected terms', () => {
    expect(autocorrect("patat")).toBe("friet");
    expect(autocorrect("friet")).toBe("patat");
    expect(autocorrect("patat friet")).toBe("friet patat");
    expect(autocorrect("friet patat")).toBe("patat friet");
});

test('should properly ignore partial term matches that occur at the end of a message (regression: #4)', () => {
    expect(autocorrect("jou jo")).toBe("jij jo");
});

test('should properly ignore non-matching messages that are capitalized (regression: #5)', () => {
    expect(autocorrect("XD")).toBe(false);
});
