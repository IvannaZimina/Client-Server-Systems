# Piletikassa

A small accessible ticket-booking interface created for the course **C02 - Kliendipoolne kiht praktikas**.

The project demonstrates semantic HTML, accessible form validation, modern CSS cascade features, responsive layout, CSS performance techniques, and client-server architecture analysis.

## Project Goal

Piletikassa is a browser-based ticket shop prototype where users can:

- compare upcoming events;
- open an event purchase form;
- enter and validate customer and order data;
- switch between light and dark themes;
- navigate with a keyboard and assistive technology.

The real ticket inventory, payment processing, seat locking, and authentication are outside the scope of this client-side exercise.

## Pages

- `avalik/index.html` - event comparison and featured event view.
- `avalik/ost.html` - accessible ticket purchase form.

Open either page through VS Code Live Server or another local static web server. The purchase form is linked from the event cards, and the form includes a link back to the event page.

## Assignment Coverage

### Assignment 1 - Semantic markup and accessibility

- Uses landmarks such as `header`, `nav`, `main`, and `footer`.
- Uses headings, table captions, table scopes, labels, fieldsets, and legends.
- Includes a keyboard skip link and visible `:focus-visible` styles.
- Provides accessible descriptions and persistent error containers for form fields.
- Uses responsive contrast-aware colors and meaningful alternative text for the event image.

Details: [`docs/ligipaasetavus.md`](docs/ligipaasetavus.md)

### Assignment 2 - Purchase form and validation

The form demonstrates native HTML constraints and custom JavaScript validation:

- required fields and minimum lengths;
- e-mail format validation;
- repeated e-mail comparison with `setCustomValidity()`;
- phone and postal-code patterns;
- ticket quantity limits from 1 to 6;
- custom messages based on `ValidityState`;
- `aria-invalid` updates and focus on the first invalid field after submit.

Implementation: [`avalik/valideerimine.js`](avalik/valideerimine.js)

### Assignment 3 - Cascade, layers, and design tokens

[`avalik/kihid.css`](avalik/kihid.css) defines the layers `alused`, `raamistik`, `komponendid`, `meie`, and `erand`.

The project uses CSS custom properties for surfaces, text, borders, accents, spacing, and radius. The neutral form border replaces the previous strong blue frame. The documentation also explains specificity, `:where()`, `:is()`, and cascade layer precedence.

Details: [`docs/kaskaad.md`](docs/kaskaad.md)

### Assignment 4 - Layout, units, and responsiveness

The interface uses:

- `rem` and `em` units;
- logical properties such as `inline-size` and `margin-inline`;
- `min()`, `clamp()`, Grid, Flexbox, and a container query;
- a two-column featured event card on wide screens;
- a one-column card layout on narrow screens;
- a responsive event table without horizontal page overflow.

Details: [`docs/paigutus.md`](docs/paigutus.md)

### Assignment 5 - Bootstrap and CSS performance

The project documents selective framework loading and explains why some Bootstrap components are unnecessary for this prototype.

The CSS also demonstrates performance concepts such as `content-visibility: auto`, `contain-intrinsic-size`, selector cost, and rendering measurements for large collections.

Details: [`docs/bootstrap.md`](docs/bootstrap.md)

### Assignment 6 - Requirements and architecture

The ticket shop is analysed as a client-server system. A central server is required for:

- preventing double sales of the same seat;
- maintaining one source of truth for ticket availability;
- coordinating simultaneous purchase attempts;
- protecting payment and booking state.

The requirements, roles, entities, priorities, and architecture comparison are documented in [`docs/nouded.md`](docs/nouded.md).

## Theme Switching

The theme button is available on both pages. [`avalik/teema.js`](avalik/teema.js):

1. respects the user's `prefers-color-scheme` preference by default;
2. allows manual light/dark switching;
3. stores the selected theme in `localStorage`;
4. exposes the current state through `data-teema` and `aria-pressed`.

## Project Structure

```text
.
├── avalik/
│   ├── index.html
│   ├── ost.html
│   ├── kihid.css
│   ├── paigutus.css
│   ├── stiil-1.css
│   ├── stiil-2.css
│   ├── teema.js
│   ├── valideerimine.js
│   └── pildid/
├── docs/
│   ├── bootstrap.md
│   ├── kaskaad.md
│   ├── ligipaasetavus.md
│   ├── nouded.md
│   └── paigutus.md
├── pildid/
└── README.md
```

## Running Locally

No build step or package installation is required.

1. Open the project in VS Code.
2. Start a static server, for example the VS Code Live Server extension.
3. Open `avalik/index.html`.
4. Test the event links, theme switcher, keyboard focus order, and invalid form states.

## Validation Checklist

- `node --check avalik/teema.js`
- `node --check avalik/valideerimine.js`
- `git diff --check`
- Test both pages at desktop and mobile widths.
- Submit the empty form and verify focus moves to the first invalid field.
- Enter different e-mail addresses and verify the repeat-address error.
