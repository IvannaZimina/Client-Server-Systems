# Ülesanne 2 - massiivid ja objektid deklaratiivselt

### 1. Kirjuta `available`, `list`, `findById`, `revenue`, `anyFree` ja `allSoldOut`
* Kirjutati kõik kuus funktsiooni deklaratiivses stiilis, kasutades õigeid massiivimeetodeid vastavalt nende tähendusele:
  - `available`: filtreerib välja sündmused, kus on vabu kohti (`event.seats - event.sold > 0`).
  - `list`: teisendab iga sündmuse kirjet `map`-i abil.
  - `findById`: otsib üles esimese sobiva sündmuse ID järgi (`find`).
  - `revenue`: koondab kogu müügitulu üheks summaks (`reduce`).
  - `anyFree`: kontrollib, kas kasvõi ühel sündmusel on vabu kohti (`some`).
  - `allSoldOut`: kontrollib, kas kõik sündmused on välja müüdud (`every`).

---

### 2. `list` arvutab iga sündmuse kohta vabad kohad ja täitumuse protsendina
* Funktsioon `list` arvutab iga sündmuse juurde dünaamiliselt kaks uut välja:
  ```javascript
  const freeSeats = event.seats - event.sold;
  const fillPercentage = event.seats > 0 ? Math.round((event.sold / event.seats) * 100) : 0;
  return { ...event, freeSeats, fillPercentage };
  ```
  See võimaldab vaatel kuvada täitumust ilma lisapöördumisteta.

---

### 3. Kirjuta sortBy(rows, field, dir), mis EI MUUDA kutsuja massiivi
- Kuna JavaScripti sisseehitatud `sort()` muudab algset massiivi kohapeal (*in-place*), vältiti seda andmestiku rikkumist, luues alati esmalt uue koopia *spread*-süntaksi abil: `[...rows].sort(...)`.

---

### 4. Anna võrdsetele elementidele stabiilne järjestus id järgi
- Kui sorteeritavatel elementidel on sama väärtus (nt sama hind või täitumus), lisati tagavaravõtme:
```javascript
if (a.id < b.id) return -1;
if (a.id > b.id) return 1;
return 0;
```
See tagab, et nimekiri ei hüple ekraanil suvaliselt.

---

### 5. VIHJE: `[...rows].sort(...)` — muidu muutub kutsuja andmestik tema selja taga

* See on kriitiline reegel. `sort()` on ainus massiivimeetod selles plokis, mis muudab oma sisendit. *Spread*-kopia `[...rows]` tagab puhta funktsionaalse programmeerimise põhimõtte, kus funktsioon ei muuda väliseid andmeid salaja.

---

### 6. Kirjuta `summary`, mis destruktureerib, nimetab ümber ja annab vaikeväärtuse

* Kasutati objekti destruktureerimist koos ümbernimetamise ja vaikimisi väärtustega:

```javascript
const { name: eventName, price: ticketPrice = 10, venue = "Unknown" } = event;
return `${eventName} at ${venue} costs ${ticketPrice} EUR`;
```

See hoiab koodi lühikese ja kaitseb puuduvate omaduste eest.

---

### 7. Kirjuta `organizerName` ja `seatsText`, kasutades `?.` ja `??` operaatoreid

* `organizerName` kasutab optional chaining'ut, et puuduv `organizer` või selle `name` ei tekitaks viga. Kui väärtust ei ole, tagastatakse tekst `"Teadmata korraldaja"`.

  `seatsText` kasutab nullish coalescing'ut. See tähendab, et `0` säilib korrektse väärtusena, kuid `null` või `undefined` asendatakse küsimärgiga:

  ```javascript
  organizerName({ organizer: { name: "Anna" } }) // "Anna"
  organizerName({})                               // "Teadmata korraldaja"
  seatsText({ seats: 0 })                         // "0 kohta"
  seatsText({})                                   // "? kohta"
  ```

  Erinevalt operaatorist `||` ei pea `??` nulliks väärtusi `0`, `false` ega tühja stringi.

---

### 8. Kirjuta `pack` ja `unpack`; vigane JSON ei tohi lehte katkestada

* `pack` teisendab andmed funktsiooniga `JSON.stringify` JSON-stringiks. `unpack` taastab andmed funktsiooniga `JSON.parse`. Mõlemad funktsioonid on ümbritsetud `try...catch`-plokiga, mistõttu vigase JSON-i korral ei teki lehel töötlemata erindit.

  ```javascript
  const json = pack({ name: "Jazz Night", seats: 10 });
  const event = unpack(json);
  const invalid = unpack("{vigane json}");
  ```

  Kehtiva sisendi korral tagastavad funktsioonid vastavalt JSON-stringi ja JavaScripti väärtuse. Vigase JSON-i või serialiseerimisvea korral tagastatakse `null`; `pack` logib vea konsooli.

---

### 9. Tee `allSoldOut` nii, et tühi valik EI OLE välja müüdud

* Ainult `every` kasutamisel oleks tühi massiiv ekslikult välja müüdud, sest JavaScripti reegel ütleb, et `[].every(...)` annab tulemuseks `true`. Seetõttu kontrollib funktsioon enne `every` kasutamist, kas valik on tühi:

  ```javascript
  allSoldOut([])                    // false
  allSoldOut([{ seats: 2, sold: 2 }]) // true
  allSoldOut([{ seats: 2, sold: 1 }]) // false
  ```

  Nii vastab funktsioon rakenduse tähendusele: kui ühtegi sündmust ei ole valitud, ei saa väita, et kõik sündmused on välja müüdud.

---

## Oodatav tulemus ja kontrollnäited

Need näited näitavad ülesandes nõutud erandlikke tulemusi.

### Tühi valik

`allSoldOut` ei tohi tühja massiivi lugeda välja müüdud valikuks:

```javascript
allSoldOut([])                       // false
allSoldOut([{ seats: 2, sold: 2 }]) // true
```

Põhjus on selles, et ainult `every` kasutamisel annaks `[].every(...)` tulemuseks `true`. Meie funktsioon kontrollib tühja valikut enne `every` kasutamist.

### `sort()` ja algse massiivi muutmine

JavaScripti vaikimisi `sort()` võrdleb väärtusi sõnedena ja muudab algset massiivi:

```javascript
[10, 9, 1].sort() // [1, 10, 9]
```

Seetõttu kasutab `sortBy` koopiat `[...rows]`: algne massiiv säilib ja sorteeritud tulemus tagastatakse uue massiivina. Võrdsete väärtuste korral kasutatakse järjestamiseks `id`-d.

### `??` ei ole sama mis `||`

Nullish coalescing säilitab väärtuse `0`, sest `0` ei ole `null` ega `undefined`:

```javascript
seatsText({ seats: 0 }) // "0 kohta"
```

Kui kasutada selle asemel `s.seats || "?"`, muutuks `0` ekslikult küsimärgiks.

### `JSON.stringify`

`JSON.stringify(null)` annab sõne `"null"`. Väärtus `undefined` jäetakse objektist välja:

```javascript
JSON.stringify(null)                // "null"
JSON.stringify({ note: undefined }) // "{}"
```

Seetõttu on oluline eristada `null`-i ja `undefined`-i, kui andmeid JSON-kujul edastatakse.
