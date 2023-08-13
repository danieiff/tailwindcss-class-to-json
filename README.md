## Notes

Logics are in `index.ts`.

Let tailwindcss and postcss generate all css by specifying `safelist: [{ pattern: /./ }]` in config of tailwindcss.

> Refer https://github.com/tailwindlabs/tailwindcss/discussions/8147#discussioncomment-2590112

Generated json file will be located in `out` directory.

## Usage

1. `npm install`: install dependencies

2. `npm run build`: builds main index.js

3. `npm run generate`: generates json file

---

or

\*supports deno: `deno run index.ts` (oneshot!)
