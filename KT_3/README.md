# C03 — Client-Server Systems: Control Work 3

This repository contains the implementation for Control Work 3 (C03), focusing on JavaScript fundamentals, declarative array methods, object manipulation, closures, debugging techniques, and DOM state management within a ticket sales application domain (*Piletikassa*)[cite: 2, 3, 6, 7].

## Project Structure

- **`public/`**
  * `format.js` — JavaScript fundamentals (default parameters, error handling, closures, strict comparisons)[cite: 2, 3].
  * `stats.js` — Declarative array methods (`map`, `filter`, `find`, `reduce`, `some`, `every`, `sort`), object destructuring, optional chaining (`?.`), nullish coalescing (`??`), and safe JSON handling[cite: 6, 7].
  * `view.js` — State management (`setState`, `readState`) and unidirectional view derivation (`forView`)[cite: 14].
  * `perf.js` — DOM performance benchmarks and collection behavior tests.
  * `index.html` — Interactive client-side test bench and UI for all tasks[cite: 9, 14].
  * `main.js` — Application logic linking modules, state, and presentation[cite: 9].
  * `style.css` — Custom clean styles for the test bench UI.
- **`docs/`**
  * `debugging.md` — Analysis of scope (`var` vs `let`), hoisting, comparisons, closures, and the prototype chain[cite: 5].
  * `arrays.md` — Insights into declarative array processing, sort stability, and edge cases (e.g., empty selections in `allSoldOut`)[cite: 9].
  * `view.md` — Performance benchmarks for 2000 rows and live vs static DOM collections.

## Tasks Overview

### Task 1: Language, Scope, and Debugging (`format.js` & `debugging.md`)
- Implemented modular functions with default parameters (`freeText`, `price`, `withVat`, `createCart`, `seatLabel`)[cite: 2, 3].
- Ensured strict type checking and proper error handling (`RangeError` thrown for unknown price tiers instead of returning `NaN`)[cite: 3].
- Implemented data privacy using closures (`createCart` keeps internal rows hidden)[cite: 3].
- Documented scope behavior (`var` vs `let`), hoisting, and prototype chains in `docs/debugging.md`[cite: 5].

### Task 2: Arrays and Objects (`stats.js` & `arrays.md`)
- Built declarative data processing pipelines for event statistics (`available`, `list`, `findById`, `revenue`, `anyFree`, `allSoldOut`)[cite: 6, 7].
- Implemented safe array sorting (`sortBy`) using data copying (`[...rows]`) to prevent mutation, alongside stable sorting by `id`[cite: 7].
- Leveraged advanced object features: destructuring with renaming/defaults (`summary`), optional chaining (`organizerName`), and nullish coalescing (`seatsText`)[cite: 7, 8].
- Handled robust JSON serialization and parsing (`pack`, `unpack`) wrapped in `try...catch` blocks[cite: 8].
- Documented counter-intuitive findings (e.g., `every([])` behavior and nullish coalescing specifics) in `docs/arrays.md`[cite: 9].

### Task 3: DOM, State, and View (`view.js`, `perf.js` & `view.md`)
- Implemented unidirectional data flow architecture: single state object, `setState`, `readState` (returning deep copies), and pure `forView(state)` derivation[cite: 14].
- Built dynamic event filtering and sorting connected to reactive UI inputs[cite: 14].
- Conducted DOM performance benchmarks comparing `appendChild`, `replaceChildren`, and `DocumentFragment` for 2000 elements.
- Analyzed and documented the behavior of live (`getElementsByClassName`) versus static (`querySelectorAll`) collections during element removal.
- Compiled performance metrics and insights into `docs/view.md`.

## Running the Project
1. Open the project folder in VS Code.
2. Run `public/index.html` using a live server (or open it directly in a browser) to view the interactive test bench results and event filter UI across all tasks[cite: 9, 14].