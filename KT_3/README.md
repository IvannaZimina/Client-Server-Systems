# C03 — Client-Server Systems: Control Work 3

This repository contains the implementation of Control Work 3 (C03) for the Client-Server Systems course.

The project uses a ticket sales application (*Piletikassa*) domain to demonstrate JavaScript fundamentals, array and object manipulation, closures, debugging, DOM state management, performance testing, Web Components, Shadow DOM, and JavaScript modules.

## Project Structure

```text
KT_3/
├── public/
│   ├── index.html
│   ├── main.js
│   ├── style.css
│   ├── format.js
│   ├── stats.js
│   ├── view.js
│   ├── perf.js
│   ├── defer.js
│   ├── async.js
│   └── ticket-card.js
├── docs/
│   ├── debugging.md
│   ├── arrays.md
│   ├── view.md
│   └── component.md
└── materials/
    └── public/
        ├── card-template.js
        └── seatmap.js
```

### Main Files

- `index.html` — Interactive test bench and user interface for the assignments.
- `main.js` — Main application logic connecting modules, state, event handling, and presentation.
- `style.css` — Styles for the application interface.
- `format.js` — JavaScript fundamentals, including default parameters, error handling, closures, and strict comparisons.
- `stats.js` — Declarative array methods, object manipulation, and safe JSON handling.
- `view.js` — Application state management and view derivation.
- `perf.js` — DOM performance benchmarks and live versus static collection tests.
- `defer.js` and `async.js` — Scripts used to compare script loading and execution order.
- `ticket-card.js` — Custom Web Component implementation using Shadow DOM.

### Documentation

- `debugging.md` — Scope (`var` vs `let`), hoisting, comparisons, closures, and the prototype chain.
- `arrays.md` — Declarative array processing, sorting behavior, and edge cases.
- `view.md` — DOM performance measurements and collection behavior.
- `component.md` — Web Components, Shadow DOM, script loading, JavaScript modules, and dynamic imports.

## Tasks Overview

### Task 1: JavaScript Fundamentals, Scope, and Debugging

Files: `format.js`, `debugging.md`

- Implemented modular functions with default parameters (`freeText`, `price`, `withVat`, `createCart`, `seatLabel`).
- Added strict type checking and error handling, including `RangeError` for unknown price tiers.
- Used closures to keep internal cart data private.
- Documented scope behavior, hoisting, and the prototype chain.

### Task 2: Arrays and Objects

Files: `stats.js`, `arrays.md`

- Implemented declarative data processing using `map`, `filter`, `find`, `reduce`, `some`, `every`, and `sort`.
- Created event statistics functions (`available`, `list`, `findById`, `revenue`, `anyFree`, `allSoldOut`).
- Implemented non-mutating sorting with array copying and stable sorting by ID.
- Used object destructuring, optional chaining (`?.`), and nullish coalescing (`??`).
- Added safe JSON serialization and parsing with error handling.
- Documented array method behavior and edge cases.

### Task 3: DOM, State, and View

Files: `view.js`, `perf.js`, `view.md`

- Implemented unidirectional data flow with a single state object.
- Added `setState` and `readState`, with `readState` returning a deep copy.
- Implemented `forView(state)` to derive the displayed data from the application state.
- Connected event filtering and sorting to the user interface.
- Compared DOM insertion methods (`appendChild`, `replaceChildren`, and `DocumentFragment`) using 2,000 elements.
- Compared live collections (`getElementsByClassName`) with static collections (`querySelectorAll`).
- Documented the measurements and observations.

### Task 6: Web Components and JavaScript Modules

Files: `ticket-card.js`, `main.js`, `index.html`, `defer.js`, `async.js`, `style.css`, `component.md`

- Created a custom `TicketCard` element extending `HTMLElement`.
- Implemented Shadow DOM and cloned the provided component template.
- Added event listeners in `connectedCallback` and removed them in `disconnectedCallback`.
- Used private class fields (`#button`, `#onClick`).
- Implemented attribute observation with `observedAttributes` and `attributeChangedCallback`.
- Tested CSS isolation between the page and Shadow DOM using `getComputedStyle`.
- Compared `defer`, `async`, and module script execution order.
- Added an import map and loaded a module using a bare module name.
- Tested strict mode behavior in ES modules.
- Dispatched a custom event from Shadow DOM using `bubbles` and `composed`.
- Loaded the seat map dynamically with `await import()` after a button click.
- Checked the module loading time in the browser Network panel.

## Running the Project

1. Open the repository folder in Visual Studio Code.
2. Start a local development server, for example using the Live Server extension.
3. Open `public/index.html` through the local server in a browser.
4. Use the interactive test bench to run the examples and inspect the results.
5. Open the browser Developer Tools to check console messages, errors, and Network requests.

A local development server is required for reliable ES module and import map loading.