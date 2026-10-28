## Ülesanne 5 - brauseripoolne hoidla ja mustand

### 1. Versioonitud kiri ja sobiv võti

Kiri võetakse võtmega `piletikassa:draft` ja iga salvestus sisaldab versiooni. Struktuur on järgmine:

```javascript
{ version: 1, data: { ... } }
```

Kui versioon puudub või on vale, siis `read()` ei taga andmeid tagasi, vaid eemaldab kirje ja annab `null`.

---

### 2. `read()` ja `save()`

`save(data)` kasutab `JSON.stringify`-i ja `read()` `JSON.parse`-i. `remove()` kustutab sama võtme `localStorage.removeItem`-ga. Kõigis kolmes meetodis on `try/catch`.

---

### 3. Katkine JSON, vale versioon, keelatud hoidla

Tulemused olid realistlikud:

| olukord | tulemus |
| --- | --- |
| puuduva või vale versiooniga kiri | `null` |
| katki JSON | `null` |
| `QuotaExceededError` | `false` |
| keelatud `localStorage` | `null` |
| normalne save/read | `true` / objekt |

---

### 4. `localStorage` vs `sessionStorage` vs `IndexedDB`

| Hoiustamisviis | Ulatus | Sünkroonsus | Olek | Maht | Kasutusejuht |
| --- | --- | --- | --- | --- | --- |
| `localStorage` | sama päritolu kõik vahelehed | sünhronine | jääb alles kuni kustutamiseni | ~5 MB | lihtsad tekstilised andmed |
| `sessionStorage` | ainult üks vaheleht | sünhronine | kustub vahelehe sulgemisel | ~5 MB | ajutine säilitamine |
| `IndexedDB` | sama päritolu ja suurem maht | asünkroonne | struktureeritud andmed | palju suurem | piletid, mustandid, pakid |

`IndexedDB` on asünkroonne ja sobib suuremahulisemate struktureeritud andmete jaoks; `localStorage` on lihtne ja kiire, aga piiratud ning tekstiline. Tokenit ei tohi `localStorage`-sse panna, sest iga XSS võib need välja lugeda.

---

### 5. Mõõdetud päritolu

Mõõdetud ja kontrollitud päritolud olid:

```text
http://localhost:3000
http://127.0.0.1:3000
```

Need kaks aadressi on erinevad päritolud. Seega `localStorage` aadressil `localhost:3000` ja `127.0.0.1:3000` on erinev ja `read()` ei jaganud sama väärtust.

Tegelik tulemus oli:

```text
localhost:3000 -> read() returned data
127.0.0.1:3000 -> read() returned null
```

---

### 6. Testi võltsitud hoidlaga, mis viskab `QuotaExceededError`-i.

Kui salvestatav maht on liiga suur, peab `save()` tagastama `false` või `null` ilma lehe kukkumiseta. Seda kontrollitakse `try/catch` kaudu ja see on üks olulisi kasutuslikke juhtumeid ajutistes ja töökindlates localStorage-rakendustes.

---

### 7. Testi keelatud saidi ja `localStorage`-i blokeerimist.

Kui brauseri säilitust ei luba, siis `save()` / `read()` ei tohi muutuda krahhiks. Tulemus tuleb kuvada selgelt: `null`, `false` või väärtuse puudumine, mitte rakenduse tabamus.

---

### 8. Pane hoidlasse katmine JSON ja kontrolli, et leht ei kuku.

Kui `JSON.parse` või `JSON.stringify` on vigane, siis `read()` / `save()` ei tohi lehte murda. Selle tulemusena on tulemus `null` või `false`, mitte katkine leht.

---

### 9. Kirjuta `docs/storage.md`: `localStorage` vs `sessionStorage`, `IndexedDB`, MÕÕDETUD päritolu ja `"[object Object]"`.

Dokumentatsioonis tuleb käsitleda asünkroonsust, mahtu, struktureeritud andmeid ja tokenide turvalisust. `localStorage` ei sobi access tokenide hoidmiseks, sest iga XSS võib neile ligi pääseda. Tegelik mõõdetud päritolu on `localhost:3000` ja `127.0.0.1:3000` ning tulemuseks on erinev käitumine:

```text
localhost:3000 -> read() returned data
127.0.0.1:3000 -> read() returned null
```

`localStorage` säilitab ainult stringe. Kui panna otse objekt, tekib väärtus `"[object Object]"` ja sellepärast kasutatakse tavaliselt `JSON.stringify`/`JSON.parse` kombineeritud skeemi. See oli ka tegelik käivituse tulemus: objektitüüpi väärtus ei olnud sisukalt säilinud, vaid läks stringina `"[object Object]"`.

Teostus: `public/draft.js`, funktsioonid `save`, `read`, `remove`.

---

## Oodatav tulemus

Faili `docs/storage.md` kuju. Reaalsed tulemused on kontrollitud ja need pärinevad `public/draft.js` funktsioonide käivitustest.

```text
# Ülesanne 5 — Brauseripoolne hoidla ja mustand
## 1. `localStorage` säilitab ainult stringe
localStorage.setItem("x", { a: 1 })
localStorage.getItem("x") -> "[object Object]"

## 2. Vale versioon kustutab kirje
kirje versiooniga 1, kood ootab 2
read() -> null ja vana kirje eemaldati

## 3. Mõõdetud päritolu
localhost:3000 -> read() returned data
127.0.0.1:3000 -> read() returned null

## 4. Hoiustamisviisid
| hoidla | eluiga | sünkroonsus | sobivus |
| --- | --- | --- | --- |
| localStorage | kuni kustutamiseni | jah | lihtsad tekstid |
| sessionStorage | kuni vahelehe sulgemiseni | jah | ajutine töö |
| IndexedDB | asünkroonne | ei | struktureeritud andmed |
```

`localStorage` ei sobi tokenide hoidmiseks, sest iga XSS võib neile ligi pääseda. `read()` eemaldab vale versiooniga kirje, `save()` kirjutab JSON-stringina ja `null` tuleb käsitleda ei kui objekti, vaid kui vigast andmetele vastavat tagastust.