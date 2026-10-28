## Ülesanne 2 — Massiivid ja objektid

### 1. Kirjuta `available(events)`: tagasta ainult sündmused, millel on vähemalt üks koht vaba.

`available` filtreerib massiivi nii, et alles jäävad need sündmused, mille `seats - sold > 0`. See on lihtne, kuid oluline kontroll: "vaba koht" tähendab positiivset jääki, mitte lihtsalt mitte-`null` väärtust.

---

### 2. Kirjuta `list(events)`: arvuta iga sündmuse kohta vabad kohad ja täitmisprotsent.

`list` teeb iga sündmuse kohta uue objekti, lisab `freeSeats` ja `fillPercentage`, ja hoiab andmestiku selgelt struktureeritud. See on näide sellest, kuidas `map` saab teha loetava ning toimiva transformatsiooni ilma algset massiivi muutmata.

---

### 3. Kirjuta `findById(events, id)`: leia sündmus ID järgi.

`findById` kasutab `find`, et tagastada esimene sobiv element. Kui midagi ei leita, tuleb tagasi `undefined`. See on tavapärane tegemine, kui andmestikus on unikaalsed identifikaatorid.

---

### 4. Kirjuta `revenue(events)`: arvuta müüdud piletite kogutulu.

`revenue` kasutab `reduce`, et liita kõigi sündmuste `sold * price` väärtused kokku. See on klassikaline aggregatsiooniprobleem ja näitab, kuidas array meetodiga saab puhta kokkuvõtte luua.

---

### 5. Kirjuta `anyFree(events)`: kas on vähemalt üks vaba koht.

`anyFree` kasutab `some`, et kontrollida, kas vähemalt üks sündmus vastab tingimusele `seats - sold > 0`. See on erinev loogika `allSoldOut`-st: siin piisab ühest vabast kohast, mitte kõigi olukorra kontrollist.

---

### 6. Kirjuta `summary`, mis destruktureerib, nimetab ümber ja annab vaikeväärtuse.

`summary` koondab andmed selgelt ja kasutab objektide destruktureerimist, ümbernimetamist ja vaikeväärtust. See aitab eemaldada liigselt loogikat ja hoida koodi lühidalt loetavaks.

---

### 7. Kirjuta `organizerName` ja `seatsText`, kasutades `?.` ja `??` operaatoreid.

`organizerName` kasutab kindlasti `?.`-i, et vältida vigast juurdepääsu siis, kui mõni väli puudub. `seatsText` kasutab `??`-i, et `0` jääks väärtuseks ja ei muutuks "puuduvaks". See on üks neist kohtadest, kus `||` oleks vale.

---

### 8. Kirjuta `pack` ja `unpack`; vigane JSON EI tohi lehte tappa.

`pack` kasutab `JSON.stringify` ja `unpack` `JSON.parse`. Vigane JSON, puuduv väärtus või ebatavaline sisend ei tohi lehte murda. See on oluline, kui andmed tulevad kasutaja sisendist.

---

### 9. Tee `allSoldOut` nii, et tühi valik EI ole välja müüdud; kirjuta tulemus üles.

`allSoldOut` peab tagasi andma `false`, kui valik on tühi. See on loogiline, sest tühja massiivi ei saa pidada "kõik müüdud" olukorraks. Samuti tuleb käsitleda üle müüdud olukorda `<= 0` tsükliga õigesti.

---

## Oodatav tulemus

Faili `docs/arrays.md` kuju. Reaalsed väärtused on saadud `public/stats.js` funktsioonidest ja vastavad tegelikule käitumisele.

```text
# Ülesanne 2 — Massiivid ja objektid
## 1. available(events)
available([{ seats: 2, sold: 1 }, { seats: 2, sold: 2 }]) -> [{ seats: 2, sold: 1 }]

## 2. list(events)
list([{ seats: 5, sold: 2, price: 10, name: "A" }])[0].freeSeats -> 3

## 3. sortBy(rows, "id")
sortBy([{ id: 2, name: "b" }, { id: 1, name: "a" }], "id") -> [{ id: 1, name: "a" }, { id: 2, name: "b" }]

## 4. allSoldOut(events)
allSoldOut([]) -> false
allSoldOut([{ seats: 2, sold: 2 }]) -> true

## 5. organizerName ja seatsText
organizerName({ organizer: { name: "Mari" } }) -> "Mari"
organizerName({}) -> "Teadmata korraldaja"
seatsText({ seats: 0 }) -> "0 koht"
seatsText({}) -> "? koht"

## 6. pack ja unpack
pack({ a: 1 }) -> "{\"a\":1}"
unpack("{\"a\":1}") -> { a: 1 }
unpack("bad") -> null
```

Mõlemad operandid `?.` ja `??` on siin olulised: `?.` kaitseb puuduvate objektide juurdepääsu ja `??` säilitab `0` asemel `null`/`undefined` väärtuse. `allSoldOut` peab käsitleda tühja valikut erinevalt müüdud olemusest.
