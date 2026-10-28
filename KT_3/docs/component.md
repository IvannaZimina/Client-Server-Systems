## Ülesanne 6 - veebikomponent ja moodulid

### 1. Komponent ja shadow DOM

Komponenti `ticket-card` loodi `public/ticket-card.js` failis, kus `TicketCard extends HTMLElement`. Konstruktoris luuakse `shadowRoot`, sinna kloonitakse vormi mall ja komponent registreeritakse `customElements.define("ticket-card", TicketCard)` abil. See eraldab komponenti sisemised elemendid lehe tavalisest DOM-ist.

---

### 2. `defer`, `async` ja `module`

Kuna `defer` ja `async` toimivad ainult välistingimisel `<script src="...">`, ei ole need inline-skriptide jaoks tähenduslikud. Seega viidi need välja eraldi failidesse `public/defer.js` ja `public/async.js`, kus need konsooli logivad reaalset järjestust. Tegelik väljund oli:

```text
defer script loaded
async script loaded
```

Moodul `ticket-card.js` laaditakse `main.js` kaudu ja konsoolis kuvatakse tekst:

```text
ticket-card module loaded
```

---

### 3. Event listeneri eemaldamine

Käitumine on korrektne, kui handler hoitakse päriselt privaatse väljana `#onClick` ja `disconnectedCallback()` kutsub `removeEventListener("click", this.#onClick)`. Nii ei teki klonimisega "kõrvalteed" ega püsivat handleri, mis jätab elemendi meelde.

---

### 4. Privaatne väli `#button`

`#button` on tõeline privaatne väli, mis on väljastpoolt klassi ei ole juurdepääsetav. See erineb konventsioonilisest `_name`-st, millel puudub tegelik privaatne kaitserežiim. Shadow DOMi jaoks on oluline, et komponendi sisemised elemendid oleksid nähtamatud ja nende CSS/DOM oleks kontrollitud vaid komponendi sees.

---

### 5. `h3` värv ja `getComputedStyle`

Lehe `h3` on punase värviga ning shadow DOMi `h3` kasutab malli vaikimisi värvi. Mõlemad väärtused kontrolliti `getComputedStyle`-iga ja tegelik tulemus oli:

```text
Shadow h3 color: rgb(0, 0, 0)
Page h3 color: rgb(255, 0, 0)
```

---

### 6. Atribuutide jälgimine ja nuppu uuendamine

`observedAttributes` sisaldab `"sold-out"`, ning `attributeChangedCallback` uuendab nuppu vastavalt atribuudile. Kui `sold-out` on olemas, muutub tekst "Välja müüdud" ja nupp keelatakse; kui puudub, näeb kasutaja teksti "Vali kohad".

---

### 7. Import map ja `seatmap`

`index.html` sisaldab import map'i, mis ühendab nime `seatmap` failiga `../materials/seatmap.js`. Kui nuppu klõpsatakse, tehakse `await import("seatmap")` ja veebilehel ilmub saaliplaan. Tegelikult tuleb see laadimine alles klõpsu käigus, mitte lehe alglaadimisel.

---

### 8. CustomEvent ja `bubbles` / `composed`

Kliki peale saadab komponent sündmuse `ticket-seatmap-request` lippega `bubbles: true` ja `composed: true`. Lehe `document`-kuulaja püüab selle kinni ja käivitab seatmapi laadimise. See on vajalik, sest sündmus tuleb läbi shadow DOMi piiri.

---

### 9. Network ja tegelik käitumine

Network-paneelis näeb ainult sündmuse järel laetud `seatmap.js` moodulit. See ilmub pärast klõpsu "Vali kohad", mitte lehe alglaadimisel, ja see on täpselt see, mida ülesandes soovitakse kontrollida. Teostus: `public/main.js`, event listener `ticket-seatmap-request`.

---

## Oodatav tulemus

Faili docs/component.md kuju. Isolatsioon on MÕÖDETUD, mitte eeldatud.

```text
# Ülesanne 6 - veebikomponent, moodulid ja prototüüb
## Varjus-DOM isoleerib — tõestatud
Lehel on h3 { color: rgb(255, 0, 0) }
varjus-DOM on h3 { color: rgb(0, 0, 0) }

## Kumb auk, mis on MEELEGA jäetud
:host
pärimine
color, font, var(--line)
::part()

## Moodul käivitub ainult pärast klõpsu
seatmap.js laeb pärast "Vali kohad"
```

Mõõdetud väärtused kinnitavad: `:host` ja `::part()` on nähtavad ainult komponenti sees, `color` ja `font` pärivad välja. `seatmap.js` tuleb laadida ainult klõpsu järel.
