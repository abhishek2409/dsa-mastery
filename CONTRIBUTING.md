# Contributing to DSA Mastery

Thanks for your interest in contributing! Here is how you can help.

## Adding New Problems

1. Open `additional_problems.js`
2. Add a new entry following this format:

```js
{
  id: NEXT_ID,
  title: "Problem Name",
  cat: "Category",
  diff: "Easy",          // "Easy" | "Medium" | "Hard"
  pattern: "Pattern Name",
  tags: ["tag1", "tag2"],
  src: "LC",             // "LC" | "GFG" | "HR"
  link: "https://...",
  desc: "Problem description.",
  hint: "Strategic hint without giving away the full solution.",
  code: `function solution() {\n  // JavaScript solution\n}`,
  complex: "Time: O(n) · Space: O(n)"
}
```

3. Run `node build.js` to rebuild `dsa_mastery.html`

## Adding New Categories

1. Add problems with the new category name in `additional_problems.js`
2. Add a guide entry in the `GUIDES` object inside `build.js`
3. Rebuild

## Adding / Improving Guides

Guides live in `guides.js` for the original 15 categories, and inline in `build.js` for the newer ones (String, Design, Sorting & Searching, Matrix). Each guide has:

- `icon` — emoji or symbol
- `tagline` — one-line summary
- `overview` — detailed explanation
- `whenToUse` — array of pattern-recognition signals
- `keyPatterns` — array of `{ name, desc, code }` objects
- `complexity` — time/space summary
- `tips` — array of pro tips

## Code Style

- All solutions in **JavaScript (ES6+)**
- Use const/let, arrow functions, destructuring
- Include test cases as comments when helpful
- Keep solutions concise but readable

## Submitting

1. Fork the repo
2. Create a feature branch (`git checkout -b add-new-problems`)
3. Make your changes
4. Run `node build.js` and verify the HTML works
5. Submit a PR with a clear description
