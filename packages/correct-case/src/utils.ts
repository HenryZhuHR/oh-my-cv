// Adapted from https://github.com/antfu/case-police/blob/main/src/utils.ts

import abbrs from "case-police/dict/abbreviates.json" assert { type: "json" };
import brands from "case-police/dict/brands.json" assert { type: "json" };
import general from "case-police/dict/general.json" assert { type: "json" };
import products from "case-police/dict/products.json" assert { type: "json" };
import softwares from "case-police/dict/softwares.json" assert { type: "json" };

const dict: Record<string, string> = {
  ...abbrs,
  ...brands,
  ...general,
  ...products,
  ...softwares
};

const IGNORE_REGEX = /@correct-case-ignore\s+([^\s]+)/g;

const buildRegex = (dictionary: Record<string, string>): RegExp => {
  const keys = Object.keys(dictionary);
  const regex = new RegExp(`\\b(${keys.join("|")})\\b`, "gi");
  return regex;
};

type Result = {
  before: string;
  after: string;
};

export const replace = (
  text: string,
  _ignore: string[] = []
): { text: string; correctedWords: Result[] | false } => {
  const ignore = _ignore.slice();

  Array.from(text.matchAll(IGNORE_REGEX)).forEach((match) => {
    const [, key] = match;
    ignore.push(
      ...key
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)
    );
  });

  const regex = buildRegex(dict);
  const changedWords = [] as Result[];

  const newText = text.replace(regex, (_, key: string) => {
    if (!key.match(/[A-Z]/) || !key.match(/[a-z]/)) return _;

    const lower = key.toLowerCase();
    if (ignore.includes(lower)) return _;

    const value = dict[lower];
    if (!value || value === key) return _;

    changedWords.push({
      before: _,
      after: value
    });

    return value;
  });

  return {
    text: newText,
    correctedWords: changedWords.length ? changedWords : false
  };
};
