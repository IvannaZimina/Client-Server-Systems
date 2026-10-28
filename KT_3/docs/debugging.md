## Ülesanne 1 — Keel, ulatus ja silumine

### 1. Loo `public/format.js` ja kirjuta viis funktsiooni `const`-vaikeluguga.

Need viis funktsiooni on lahendatud `public/format.js` failis. Need on praktiliselt kasutatavad arvutused, kus iga funktsioon töötab kindla vaikimisi väärtusega:

- `freeText(free = 0)` — kui sisend on `0`, tagastab `"välja müüdud"`; kui on positiivne arv, tagastab `"N vaba"`; muudel juhtudel `"vigane sisend"`.
- `price(tier = "standard", qty = 1, ...extras)` — arvutab hinna hinnaklassi ja koguse järgi ning liidab lisakulud. Tundmatu hinnaklass viskab `RangeError`.
- `withVat(sum = 0, vatRate = 0.22)` — lisab käibemaksu 22% defaultina.
- `createCart()` — loob sulundiga objekti, kus `rows` on olemas ainult sisemuses.
- `seatLabel(row = 1, nr = 1, separator = "-")` — vormindab koha märgistuse kujul `Rida X-Nr Y`.

Vaikelugud tähendab seda, et puuduv argument võtab automaatselt väärtuse, näiteks `free = 0`, `tier = "standard"`, `qty = 1`, `vatRate = 0.22`, `row = 1`, `nr = 1`, `separator = "-"`.

---

### 2. `freeText` eristab kolme juhtu: 0, positiivne arv ja vigane sisend.

`freeText(0)` annab `"välja müüdud"`;  
`freeText(5)` annab `"5 vaba"`;  
`NaN`, `undefined`, `-1` ja stringid tuleb käsitleda vigasena. `price("vip")`  
ja `price("child")` töötavad, aga tundmatud hinnaklassid ei tagasta `NaN`, vaid viskavad `RangeError`.  

`Object.hasOwn(priceTiers, tier)` on õige kontroll, sest `tier in priceTiers` vaatab ka prototüübi ja võib anda vale tulemuse. See on oluline, et `price("toString")` ei oleks `NaN` vaid tõene veaga.

---

### 3. `price` viskab tundmatu hinnaklassi peale `RangeError`-i, mitte ei anna `NaN`.

`prototypeChain()` tulemuse väljastas tabelina:

| Vaade | Tulemus |
| --- | --- |
| `chain` | `true` |
| `class_type` | `"function"` |
| `this_with_object` | `"VIP"` |
| `this_detached` | `TypeError` |

See näitab, et `Child.prototype` pärineb `Base.prototype`-ist ja `this` sõltub sellest, kuidas meetod välja kutsutakse. Kui meetod eemaldada objektilt ja kutsuda ilma `this`-ta, tekib `TypeError`.

---

### 4. `createCart` tagastab objekti, mille sisemine massiiv jääb väjast nähtamatuks.

`NaN` ei võrdu iseendaga. Seega tuleb kasutada `Number.isNaN(value)`, mitte `value === NaN`.  
JavaScripti falsy väärtused on `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` ja `NaN`.  
Just seda loogikat kasutati `freeText()` ja `price()` kontrollides.

---

### 5. VIHJE: kontrolli `=== 0`, mitte `ifree` — null on väär ja haru läheb valeks.

Silumiseks oli kõige kasulikum tingimuslik breakpoint:

```javascript
tier === "vip"
```

Siis näeb brauser reaalset väärtust `qty`, `extras` ja `total` ilma iga kord uuesti sissekannetega peatamata.  
See on oluline, sest leheküljel kontrollitakse just VIP-pileteid ja nende koguhinda.

---

### 6. Jooksuta `scopeDemo(3)` ja kirjuta mõlemad massiivid täpselt üles.

`scopeDemo(3)` näitab selgelt, kuidas `var` ja `let` erinevalt töötavad. `var` on funktsiooni ulatuses, `let` aga ploki ulatuses. Tegelik tulemus on järgmine:

```text
var_ = [3, 3, 3]
let_ = [0, 1, 2]
```

See on oluline, sest ülesande eesmärk on kontrollida, milline muutuja ulatuslik käitumine on oodatud.

---

### 7. Jooksuta `comparison(s)` ja `prototypeChain()`; pane mõlemad tulemused tabelisse.

Võrdlemine ja prototüübi ahel on klassikalised JS-i vead. `NaN == NaN` annab `false` ja `prototypeChain()` näitab `Child -> Base -> Object` järjestust.  
Tulemused tuleb tabelina välja näidata, mitte lihtsalt kirjeldada.

---

### 8. Pane tingimuslik katkestuspunkt, mis peatab ainult `tier === "vip"` korral.

See on konstruktiivne silumispunkt, kus näeb täpselt `qty`, `extras` ja `total` väärtusi.  
Tulemuslikel testidel oli just VIP-juhtum kõige parem, sest seal on kogu arvutuse logika kokkuvõtlikult näha.

---

### 9. Kirjuta `docs/debugging.md`: ulatus, võrdlemine, sulund ja PROTOTÜÜBIAHEL.

Dokumentatsioonis tuleb kokkuvõte, tabelid ja reaalne tulemus.  
Teostus on `public/format.js` ja `debug.js`-sarnane väljastuspõhimõte, mitte teksti kloonimine koodist.

---

## Oodatav tulemus

Faili `docs/debugging.md` kuju. Reaalsed tulemused on jooksutatud ja vastavad `public/format.js` funktsioonide käitumisele.

```text
# Ülesanne 1 — Keel, ulatus ja silumine
## 1. Vaikelugud ja tulemused
freeText(0) -> "välja müüdud"
price("vip", 2, 3) -> 53
withVat(100) -> 122
createCart().getCount() -> 0
seatLabel(2, 5, "/") -> "Rida 2/Nr 5"

## 2. `RangeError` ja `Object.hasOwn`
price("toString") -> RangeError

## 3. Prototüübi ahel
priceTiers on objekt, `Object.hasOwn` kontrollib ainult enda omadusi.

## 4. Breakpoint
`tier === "vip"` peaks peatumispunktis näitama `qty`, `extras` ja `total`.
```

`NaN` ei võrdu iseendaga, seega tuleb kasutada `Number.isNaN(value)` ja `Object.hasOwn(...)` asemel `tier in ...` kontrolli.
