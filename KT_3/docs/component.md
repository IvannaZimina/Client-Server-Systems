# Ülesanne 6 - veebikomponent ja moodulid

### 1. Kirjuta `HTMLElement`-i laiendav klass, registreeri `define`-iga, haagi varjus-DOM ja klooni sinna mall.

Kohandatud element peab olema klass, sest brauser kutsub `new` ise. Klass `TicketCard extends HTMLElement` asub failis `public/ticket-card.js`. Konstruktoris tehakse ainult iseenda töö: luuakse varjus-DOM (`attachShadow`) ja sinna kloonitakse etteantud `TEMPLATE`. DOM-i lugemine ja kuulajad on konstruktoris keelatud, need kuuluvad `connectedCallback`-i. Element registreeritakse nimega `ticket-card` (`customElements.define`). Mooduli käivitub ainult üks kord, seetõttu on `define` ohutu.

---

### 2. Kirjuta ISE mooduli silt ja mõõda, mis JÄRJEKORRAS `defer`, `async` ja `module` käivituvad — kirjuta kolm rida üles.

Atribuudid `defer` ja `async` toimivad ainult siis, kui skriptil on `src`. Inline-skript käivitub kohe parsimisel, seetõttu on mõõtmiseks eraldi failid `public/defer.js` ja `public/async.js` ning mooduli silt `<script type="module" src="./main.js">`.

* `defer` laeb kohe, kuid käivitub PÄRAST DOM-i parsimist, dokumendi järjekorras.
* `async` laeb kohe ja käivitub KOHE, kui fail on valmis. Järjekorda ei ole.
* `module` käitub nagu `defer`, kui tal ei ole `async`-i.

Mõõdetud järjekord konsoolis:

```text
1. defer script loaded
2. async script loaded
3. ticket-card module loaded
```

`async` koht sõltub laadimise kiirusest ja võib iga käivitusega muutuda. `defer` ja `module` jäävad dokumendi järjekorda.

---

### 3. Pane kuulaja `connectedCallback`-is ja VÕTA TA MAHA `disconnectedCallback`-is.

`connectedCallback` leiab varjus oleva nupu ja lisab kuulaja. Kuulaja funktsioon hoitakse privaatses väljas `#onClick`. `disconnectedCallback` eemaldab täpselt sama funktsiooni (`removeEventListener`) ja nullib väljad. Sama viide on vajalik, sest `removeEventListener` eemaldab ainult kuulaja, mis on sama funktsiooniobjekt. Nii ei jää elemendi eemaldamisel alles kuulajat, mis hoiab elementi mälus.

---

### 4. Loetle `observedAttributes` ja uuenda nuppu `attributeChangedCallback`-is.

Jälgitav atribuut on ainult `sold-out` (`static observedAttributes = ["sold-out"]`). Brauser kutsub `attributeChangedCallback`-i ainult loetletud atribuutide muutumisel. Callback kutsub `updateButton()`:

| atribuut | nupu tekst | nupp |
|---|---|---|
| `sold-out` olemas | Välja müüdud | keelatud |
| `sold-out` puudub | Vali kohad | lubatud |

---

### 5. VIHJE: tee väljad `#`-iga päriselt privaatseks; `_name` on ainult kokkulepe.

Nupp ja kuulaja on väljad `#button` ja `#onClick`. `#` on keeletasemel privaatne: väljastpoolt klassi on juurdepääs võimatu ja katse kirjutada `card.#button` annab `SyntaxError`-i. Väli `_button` oleks ainult kokkulepe ja igaüks saaks seda lugeda ning muuta.

| viis | väljastpoolt ligipääs |
|---|---|
| `#button` | ei (keel keelab) |
| `_button` | jah (ainult kokkulepe) |

---

### 6. Pane lehele reegel `h3 { color: red }` ja üks `h3` ka varjus-DOM-i; mõõda mõlema värv `getComputedStyle`-iga ja kirjuta tulemused üles.

Lehel on reegel `.component-demo > h3 { color: red }` ja varjus-DOM-i mallis on oma `h3`. Värvid mõõdeti `getComputedStyle(...).color` abil. Lehe reegel ei ulatu varjus-DOM-i, seetõttu varjus olev `h3` jääb mustaks.

| kus | arvutatud värv |
|---|---|
| lehel | rgb(255, 0, 0) |
| varjus-DOM-is | rgb(0, 0, 0) |

---

### 7. Lisa lehele import map ja lae moodul PALJA nimega; tõesta ka, et moodulis VISKAB määramata muutujale omistamine.

`index.html` sisaldab import map'i, mis seob nime `seatmap` failiga `../materials/seatmap.js`. Moodul laaditakse paljal nimel: `import("seatmap")`, ilma teeta.

ES-moodul töötab alati range režiimis (strict mode). Määramata muutujale omistamine ei loo globaalset muutujat, vaid viskab vea. Mõõdetud tulemus:

```text
Undefined module assignment: ReferenceError
```

---

### 8. Saada varjus-DOM-i seest `CustomEvent` lippudega `bubbles` ja `composed`; püüa ta lehel kinni.

Nupuvajutusel saadab komponent sündmuse `ticket-seatmap-request` ja `detail` sisaldab `eventId`. Lehe `document`-kuulaja (`public/main.js`) püüab sündmuse kinni. Mõlemad lipud on vajalikud:

| lipud | tulemus |
|---|---|
| `bubbles: true`, `composed: true` | leht püüab sündmuse kinni |
| `bubbles: true`, `composed: false` | sündmus jääb varjus-DOM-i piirile kinni |

`bubbles` üksi ei piisa.

---

### 9. Lae saaliplaan `await import(...)` abil ja vaata Network-paanilt, MILLAL ta tuli.

Sündmuse kuulaja teeb `await import("seatmap")` ja joonistab saaliplaani. Network-paanil ja konsoolis on näha:

| hetk | `seatmap.js` |
|---|---|
| lehe avamisel | EI ole laaditud |
| pärast nupuvajutust "Vali kohad" | laaditud, konsoolis `seatmap.js laetud` |

Tulemus lehel: `Seatmap: 216 seats loaded` (12 rida × 18 kohta). Kui import oleks staatiline, laeks fail kohe lehe avamisel. Dünaamiline import lükkab suure mooduli laadimise hetkeni, kui seda tegelikult vaja on.

---

## Mõõdetud tulemus

### Varjus-DOM isoleerib - tõestatud

Lehel kehtib reegel `h3 { color: red }`.

| kus | arvutatud värv |
|---|---|
| lehel | rgb(255, 0, 0) |
| varjus-DOM-is | rgb(0, 0, 0) |

### Kolm auku, mis on MEELEGA jäetud

| auk | mida see lubab |
|---|---|
| `:host` | element ise: ainus koht, kust välimus saab lekkida (`display`, `sold-out` stiil) |
| pärimine | `color`, `font` ja `var(--line)` tulevad hostilt sisse |
| `::part()` | leht võib stiilida elementi `part="button"` |

Ilma nendeta oleks komponent teemastamatu.

### Moodulid

```text
defer script loaded
async script loaded
ticket-card module loaded
Undefined module assignment: ReferenceError
Seatmap: 216 seats loaded
```

`seatmap.js` laaditakse alles pärast nupuvajutust "Vali kohad", mitte lehe avamisel.
