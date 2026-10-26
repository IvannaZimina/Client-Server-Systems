# Ülesanne 3 — Kaskaad, kihid ja disainižetoonid

### 1. Kuuluta viis kihti ühe reaga, enne ühtki reeglit.

Failis `avalik/kihid.css` kuulutati kihid enne reegleid:

```css
@layer alused, raamistik, komponendid, meie, erand;
```

### 2. Pane žetoonid kihti `base`: pinnad, tekst, jooned, rõhk, samm ja raadius.

Projektis on samad žetoonid kihis `alused`: `--pinnad`, `--pind-teine`, `--tekst`, `--jooned`, `--rõhk`, `--fookus`, `--samm` ja `--raadius`.

### 3. Tee tume teema kolmes astmes: `:root`, `prefers-color-scheme`, `data-theme`.

Kasutati vaikimisi `:root` väärtusi, süsteemi eelistust `@media (prefers-color-scheme: dark)` ning kasutaja valikut atribuutidega `data-teema="hele"` ja `data-teema="tume"`.

### 4. Lisa `color-scheme`, et ka kerimisribad ja väljad teemaga kaasa läheksid.

`color-scheme: light dark` lisati juurele. Kasutaja valiku ja süsteemi eelistuse korral määratakse vastavalt `light` või `dark`.

### 5. VIHJE: kasutaja valik peab võitma süsteemi eelistuse — vaata järjekorda.

Kasutaja valiku selektorid paiknevad süsteemi meediareeglitest hiljem ja määravad värvid ning `color-scheme`-i uuesti.

### 6. Pane sama `.field` reegel kihtidesse `framework` ja `ours`; vaata, kumb võidab.

Projektis kasutati vastavaid kihte `.valja` reeglitega. Sama spetsiifilisuse korral võidab hilisem kiht `meie`, mitte suurema spetsiifilisuse tõttu.

### 7. Kasuta `:where()` lähtestuseks ja `:is()` rühmitamiseks — arvuta mõlema hind.

`:where(h1, h2, h3)` spetsiifilisus on `0-0-0`. `:is(h2, h3)` spetsiifilisus on `0-0-1`.

### 8. Arvuta üheksa valija spetsiifilisus ja pane tabelisse.

| spetsiifilisus | selektor |
|---|---|
| `0-1-0` | `.valja` |
| `0-2-0` | `.leht .valja` |
| `0-0-0` | `:where(h1, h2, h3)` |
| `0-0-1` | `:is(h2, h3)` |
| `0-1-2` | `.kaardid > li :is(h2, h3)` |
| `0-2-1` | `.kaardid > li:not(...)` |
| `0-2-0` | `.viga:not(:empty)` |
| `0-2-0` | `:root:not([data-teema="hele"])` |
| `1-1-0` | `#purchase .valja` |

### 9. Kirjuta `docs/cascade.md`: miks kiht asendab `!important`-i.

Kaskaadikihid määravad prioriteedi struktuurselt. Hilisem kiht võib varasema sama spetsiifilisusega reegli üle kirjutada, mistõttu ei ole konfliktide lahendamiseks vaja lisada `!important`-i.

### 10. KOMMIT: `git commit -m "C02 Ex3 — Kaskaad, kihid ja disainižetoonid"`.

```bash
git add avalik/kihid.css docs/cascade.md
git commit -m "C02 Ex3 — Kaskaad, kihid ja disainižetoonid"
```

## Oodatav tulemus

Viis kihti, disainižetoonid, süsteemi- ja kasutajateema, `color-scheme` ning arvutatud spetsiifilisuse tabel on dokumenteeritud.
