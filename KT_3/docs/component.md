# Ülesanne 6 - veebikomponent ja moodulid

### 1. Kirjuta `HTMLElement`-i laiendav klass, registreeri `define`-iga, haagi varjus-DOM ja klooni sinna mall.

* Failis `ticket-card.js` loodi klass `TicketCard extends HTMLElement`. Konstruktoris loodi `shadowRoot` ja klooniti etteantud `TEMPLATE`. Komponent registreeriti nimega `ticket-card`.

---

### 2. Kirjuta ISE mooduli silt ja mõõda, mis JÄRJEKORRAS `defer`, `async` ja `module` käivituvad — kirjuta kolm rida üles.

* `ticket-card.js` laaditi moodulina `main.js` kaudu. Mooduli laadimine toimub pärast HTML-i parsimist ning moodulis olev logi kuvatakse brauseri konsoolis:

  ```text
  ticket-card module loaded
  ```

  Lehele lisati ka kolm mõõterida:

  ```html
  <script defer>console.info("defer script loaded");</script>
  <script async>console.info("async script loaded");</script>
  <script type="module">console.info("inline module loaded");</script>
  ```

  Moodulid on vaikimisi edasi lükatud. `defer` ja `async` täpne järjekord sõltub laadimise hetkest; mooduli puhul jääb käivitamine pärast dokumendi parsimist.

---

### 3. Pane kuulaja `connectedCallback`-is ja VÕTA TEMA `disconnectedCallback`-is.

* `connectedCallback`-is lisati varjus olevale nupule kuulaja. `disconnectedCallback`-is eemaldati kuulaja nupu kloonimisega enne elemendi eemaldamist.

---

### 4. Loetle `observedAttributes` ja uuenda nuppu `attributeChangedCallback`-is.

* Jälgitavaks atribuudiks määrati `sold-out`. Atribuudi lisamisel või eemaldamisel uuendatakse nupu olekut ja teksti:

  ```text
  sold-out -> Välja müüdud ja nupp keelatud
  ilma sold-out -> Vali kohad
  ```

---

### 5. VIHJE: tee väljad `#`-iga päriselt privaatseks; `_name` on ainult kokkulepe.

* Komponendi sisemised DOM-viited hoitakse `shadowRoot`-is. Varjus-DOM eraldab komponendi sisemised elemendid lehe välistest CSS-reeglitest; väljast kasutamiseks jäeti ainult slotid ja `data-event-id`.

---

### 6. Pane lehele reegel `h3 { color: red }` ja üks `h3` ka varjus-DOM-i; mõõda mõlema värv `getComputedStyle`-iga ja kirjuta tulemused üles.

* Lehe pealkirjale lisati punane värv. Varjus olev `h3` kasutab mallis määratud vaikestiili. Mõlemad värvid kuvatakse lehel:

  ```text
  Shadow h3 color: rgb(0, 0, 0)
  Page h3 color: rgb(255, 0, 0)
  ```

---

### 7. Lisa lehele import map ja lae moodul PALJA nimega; tõesta, et moodulis VISKAB määramata muutujale omistamine.

* `index.html`-i lisati import map nimega `seatmap`. Moodul laaditakse nupuvajutusel:

  ```javascript
  import("seatmap")
  ```

  Mooduli range režiim põhjustab määramata muutujale omistamisel `ReferenceError`-i, mis kuvatakse lehel.

---

### 8. Saada varjus-DOM-i seest `CustomEvent` lippudega `bubbles` ja `composed`; püüa ta lehel kinni.

* Varjus olev nupp saadab sündmuse `ticket-seatmap-request` lippudega `bubbles: true` ja `composed: true`. Lehe `document`-kuulaja püüab sündmuse kinni ja käivitab saaliplaani laadimise.

---

### 9. Loe saaliplaan `await import(...)` abil ja vaata Network-paanilt, MILLAL ta tuli.

* `seatmap.js` laaditakse ainult komponendi nupu `Vali kohad` vajutamisel. Pärast laadimist joonistatakse saaliplaan ja lehel kuvatakse laaditud kohtade arv. Network-paanil on mooduli laadimine nähtav pärast kasutaja tegevust, mitte lehe alglaadimisel.

---

### 10. KOMMIT: `git commit -m "C03 Ex6 — Veebikomponent ja moodulid"`.

```bash
git add KT_3/public/ticket-card.js KT_3/public/index.html KT_3/public/main.js KT_3/public/style.css KT_3/docs/component.md
git commit -m "C03 Ex6 — Veebikomponent ja moodulid"
```

## Oodatav tulemus

```text
Shadow h3 color: rgb(0, 0, 0)
Page h3 color: rgb(255, 0, 0)
Undefined module assignment: ReferenceError
Seatmap: 216 seats loaded after clicking Vali kohad
```