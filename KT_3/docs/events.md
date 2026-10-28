## Ülesanne 4 - sündmused ja delegeerimine

### 1. Üks delegeeritud `click`-kuulaja `#events`-is

Sündmused renderdatakse ühte `ul#events`-sse ja kogu tegevus käivitatakse ühest `click`-kuulajast. Selle asemel et lisada 100 nuppudele eraldi käitleja, kasutatakse delegeerimist `event.target.closest("button[data-action]")` abil. See on mõistlik ja vastab PDF-i ootusele.

| Variant | Kuulajaid | Uus nupp töötab |
| --- | ---: | --- |
| iga nupp eraldi | 100 | ei |
| üks `#events`-il | 1 | jah |

---

### 2. `closest()` ja `data-action`

Klõpsatud elemendist leitakse lähim sobiv nupp ja `data-action` väärtus. Selle järgi kutsutakse õiget tegevust. Delegeerimisel on põhiline: `event.target` on klõpsatud element ja `event.currentTarget` on kuulaja omanik.

---

### 3. Vormi ja otsingu käitumine

`#search` vorm kuulab `submit`-i, mitte nupu `click`-i, ning `event.preventDefault()` takistab lehe taaslaadimist. Vormi väljad loetakse `Object.fromEntries(new FormData(form))` abil ja seejärel uuendatakse `search`, `sort` ja `dir`.

`input`-kuulaja viivitusega 250 ms hoiab ära liigse renderduse. Nii ei käivitu renderdamine iga tähemuudatuse kohta, vaid pärast viimase sisendi pausi.

---

### 4. `capture-tool` ja faaside mõõtmine

Mõõdetud logi oli järgmine:

```text
capture #events
capture li
target
bubble li
bubble #events
```

See vastab ootusele: hõive `#events`, hõive `li`, sihtmärk `button`, mullitus `li`, mullitus `#events`.

---

### 5. `checkValidity()` ja valik

Käesolev vorm lisab otsingu väljale `minlength="2"`, et tühi või liiga lühike väärtus ei liiguks jaotusega edasi. `form.checkValidity()` ja `form.reportValidity()` kontrollivad selle täpselt ning vältivad vale otsingusisendi. `required` ei ole lisatud, sest tühi väärtus on eeldatavalt lubatud siinses rakenduses.

---

### 6. Kuula `submit`-sündmust, mitte nupu `click`-i.

Formi saatmine toimub `submit`-sündmusega, mitte lehe uuesti laadiva nupukuudlusega. `event.preventDefault()` on siin kriitiline, sest muidu läheb leht taaslaadimisega nulli ja filtri väärtus kaob.

---

### 7. Loe väljad `Object.fromEntries(new FormData(form))` abil.

`FormData` teeb vormi sisust tabelina, mis on lihtne üle anda `search`, `sort` ja `dir` muutujatele. See on selge ja ajasõbralik lahendus, kui vormi välju on palju.

---

### 8. Kontrolli `checkValidity()` ja `reportValidity()`.

Kui sisend on liialt lühike või tühi, tuleb kasutajale näidata selget veateadet. `checkValidity()` ja `reportValidity()` on siin osa turvalisusest ja kasutajakogemusest.

---

### 9. Lisa otsingu `input`-kuulajale 250 ms viivitus.

Käivitatakse ainult pärast viimast sisestust. Nii ei teki suurt arvu renderdusi, kui kasutaja kirjutab kiiresti. See on peen, kuid oluline performanssi ja kasutusmugavuse parandus.

---

## Oodatav tulemus

Faili `docs/events.md` kuju. Faaside järjestus on mõõdetud ja `readLog()` näitab reaalset järjestust.

```text
# Ülesanne 4 - sündmused ja delegeerimine
## Faaside järjekord - mõõdetud
capture #events
capture li
target button
bubble li
bubble #events

## Üks kuulaja saja asemel
| viis | kuulajaid | uus nupp töötab |
| --- | ---: | --- |
| igale nupule | 100 | ei |
| delegeeritud | 1 | jah |
```

`event.target` on klõpsatud element, `event.currentTarget` on kuulaja omanik. `FormData` meetod ja `form.checkValidity()` tagavad, et otsinguväli ei läheks liiga lühike ning submit-event jääb kontrollitud ja delegeeritud.

