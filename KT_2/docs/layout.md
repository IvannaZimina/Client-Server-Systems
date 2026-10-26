# Ülesanne 4 — Paigutus, ühikud ja responsiivsus

### 1. Sea `box-sizing: border-box` kõigele, ka `::before` ja `::after`.

Selektor `*, *::before, *::after` määrab kõikidele elementidele `box-sizing: border-box`.

### 2. Kasuta `rem`-i paigutuses ja `em`-i seal, kus asi kasvab oma kirjaga.

Lehe vahed ja põhipaigutus kasutavad `rem`-i. Komponendisisene nupu vahe kasutab `em`-i, et suureneda koos nupu kirjaga.

### 3. Vaheta `margin-left` ja `width` loogiliste omaduste vastu.

Kasutati `margin-inline-start`, `margin-inline-end` ja `inline-size`.

### 4. Piira rea pikkust `ch`-ga ja kasuta `min()`-i, et ta ka kitsal ekraanil peaks.

Tekstilõikude laius määratakse `inline-size: min(calc(100% - 2rem), 60ch)`.

### 5. VIHJE: `rem`-iga saab kasutaja suurema kirja seades suurema LEHE.

`rem` põhineb juurelemendi kirjasuurusel ja suurendab koos kasutaja brauseri tekstiseadega kogu paigutust.

### 6. Tee ruudustik `auto-fit` ja `minmax` abil, ilma ühegi meediapäringuta.

Kaartide nimekiri kasutab:

```css
grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
```

### 7. Kasuta subgridi, et kaartide read joonduksid kaartide VAHEL.

Kaardil kasutatakse `grid-template-rows: subgrid` ja `grid-row: span 3`. Kaardid paiknevad nimekirjas `ul > li > article`.

### 8. Anna `container-type` ÜMBRISELE; `@container` reegel stiilib tema SEES olevaid kaarte.

`container-type: inline-size` määrati klassile `.kaardid-konteiner`. `@container` reegel muudab selle sees oleva `.sundmuse-kaart` paigutust.

### 9. Arvuta `h1` ja `h2` `clamp()` väärtused kaheksal ekraanilaiusel.

Kasutati:

```css
h1 { font-size: clamp(1.75rem, 1rem + 2.5vw, 3rem); }
h2 { font-size: clamp(1.35rem, 0.8rem + 1.8vw, 2.2rem); }
```

| ekraan | h1 | h2 |
|---:|---:|---:|
| 320 px | 28,0 px | 21,6 px |
| 375 px | 28,0 px | 21,6 px |
| 480 px | 28,0 px | 21,8 px |
| 768 px | 35,2 px | 25,2 px |
| 1024 px | 41,6 px | 28,3 px |
| 1280 px | 48,0 px | 31,4 px |
| 1440 px | 48,0 px | 32,0 px |
| 1920 px | 48,0 px | 32,0 px |

### 10. KOMMIT: `git commit -m "C02 Ex4 — Paigutus, ühikud ja responsiivsus"`.

```bash
git add avalik/paigutus.css avalik/index.html docs/layout.md
git commit -m "C02 Ex4 — Paigutus, ühikud ja responsiivsus"
```

## Oodatav tulemus

Paigutus kohandub ilma kaarte käsitsi ümber paigutamata, kasutab loogilisi omadusi, konteineripäringut, `subgrid`-i ja sujuvat `clamp()`-iga skaleerimist.
