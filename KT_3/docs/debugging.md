# Ülesanne 1 - keel, ulatus ja silumine

### 1. `public/format.js` ja viis funktsiooni

* Faili lisati viis nõutud funktsiooni:

  - `freeText(free = 0)` vormistab vabade kohtade arvu;
  - `price(tier = "standard", qty = 1, ...extras)` arvutab piletite hinna;
  - `withVat(sum = 0, vatRate = 0.22)` lisab summale käibemaksu;
  - `createCart()` loob sulundiga ostukorvi;
  - `seatLabel(row = 1, nr = 1, separator = "-")` vormistab istekoha nimetuse.

  Vaikeparameetrite kasutamine võimaldab väljakutseid ka ilma argumentideta:

  ```javascript
  freeText()   // "välja müüdud"
  price()      // 10
  withVat()    // 0
  seatLabel()  // "Rida 1-Nr 1"
  ```

---

### 2. `freeText` eristab nulli, positiivset arvu ja vigast sisendit

* Enne väärtuse kasutamist kontrollitakse, kas tegemist on arvuga. Nulli kontrolliti rangelt tingimusega `free === 0`, positiivne arv kuvati vabade kohtade arvuna ning muu väärtus määrati vigaseks sisendiks.

  ```javascript
  freeText(0)      // "välja müüdud"
  freeText(5)      // "5 vaba"
  freeText(-1)     // "vigane sisend"
  freeText("5")    // "vigane sisend"
  freeText(NaN)    // "vigane sisend"
  ```

  Selline järjekord on vajalik, sest `0` on JavaScriptis falsy väärtus, kuid ülesandes tähistab arvuline null välja müüdud sündmust.

---

### 3. `price` viskab tundmatu hinnaklassi puhul `RangeError`-i

* Kasutatud hinnaklassid on `standard`, `vip` ja `child`. Tundmatu klassi puhul ei tagastata `NaN`-i, vaid visatakse selge veaga `RangeError`. Funktsioonis kasutati vaikeparameetreid ja rest-parameetrit `...extras`.

  ```javascript
  price()                 // 10
  price("vip", 2)         // 50
  price("vip", 2, 3, 4)   // 57
  price("unknown")        // RangeError
  ```

  Rest-parameetri kaudu antud arvulised lisatasud liideti kogusummale.

---

### 4. `createCart` tagastab sulundi peidetud sisemise massiiviga

* `rows` loodi funktsiooni sees ning otsetagastust ei kasutata. Ostukorviga suhtlemine toimub ainult meetodite `add`, `getRows` ja `getCount` kaudu. `getRows` tagastab massiivi koopia, vältides sisemise oleku muutmist.

  ```javascript
  const cart = createCart();
  cart.add({ name: "Pilet" });
  cart.getCount(); // 1

  const rows = cart.getRows();
  rows.push({ name: "Kopeeritud pilet" });
  cart.getCount(); // 1
  ```

  Sulundi sees olev `rows` jääb väljastpoolt varjatuks ja kaitstuks.

---

### 5. Vihje: kontrolli `=== 0`, mitte lihtsalt `if (!free)`

* Tingimus `if (!free)` käsitleks nulliga samamoodi ka teisi falsy väärtusi, näiteks `""`, `false` ja `undefined`. Funktsioonis kasutati täpset kontrolli `free === 0`, sest ainult arvuline null tähistab ülesandes välja müüdud sündmust.

  ```javascript
  freeText(0)       // "välja müüdud"
  freeText(false)   // "vigane sisend"
  freeText("")      // "vigane sisend"
  ```

  Range comparison (`===`) ei teisenda väärtuste tüüpe automaatselt.

---

### 6. `scopeDemo(3)`: `var` ja `let` sulundis

* `var` on funktsiooniulatusega. Kõik loodud funktsioonid loevad sama muutujat `i`, väärtuseks pärast tsüklit jääb `3`. `let` on plokiulatusega ning iga tsükli korduseks luuakse eraldi muutuja `j`.

  ```javascript
  scopeDemo(3);
  // {
  //   var_: [3, 3, 3],
  //   let_: [0, 1, 2]
  // }
  ```

  Tulemused näitavad `let` sobivust tsüklis loodud sulundite kasutamisel.

---

### 7. `comparisons()` ja `prototypeChain()`: tulemused tabelina

#### Võrdlusoperaatorid

| Avaldis | Tulemus | Selgitus |
| --- | --- | --- |
| `0 == ""` | `true` | lõtv võrdlus teisendab tüüpe |
| `0 === ""` | `false` | range võrdlus ei teisenda tüüpe |
| `"6" == 6` | `true` | sõne teisendatakse arvuks |
| `null == undefined` | `true` | erandlik lõdva võrdluse reegel |
| `null === undefined` | `false` | väärtused ja tüübid on erinevad |
| `NaN === NaN` | `false` | `NaN` ei võrdu iseendaga |

JavaScripti kaheksa falsy väärtust on `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` ja `NaN`. `NaN` kontrollimiseks tuleb kasutada `Number.isNaN()` või `Number.isNaN(value)`, mitte võrdlust `value === NaN`.

#### Prototüübiahel ja `this`

`prototypeChain()` tagastab:

```javascript
{
  chain: true,
  class_type: "function",
  this_with_object: "VIP",
  this_detached: "TypeError"
}
```

Tulemused näitavad `Child.prototype` pärinemist `Base.prototype`-ist, klassi tüübiks JavaScriptis on `function` ning objekti kaudu tehtud meetodiväljakutses määratakse `this` väärtuseks objekt. Meetodi eraldamisel muutujasse ja väljakutsel ilma objektita puudub vajalik `this` ning tekib `TypeError`.

---

### 8. Tingimuslik katkestuspunkt piletiklassi kontrollimiseks

* Funktsioonis `price` kontrollitakse, kas `tier` leidub hinnaklasside objektis. Silumisel saab kasutada tingimuslikku breakpoint'i tingimusega:

  ```javascript
  tier === "vip"
  ```

  Katkestus toimub ainult VIP-pileti arvutamisel. Nii saab vaadata `qty`, `extras` ja `total` väärtusi ilma iga funktsioonikutse juures peatamata.

---

### 9. `docs/debugging.md`: ulatus, võrdlemine, sulund ja prototüübiahel

* Failis dokumenteeriti kõik ülesandes nõutud teemad:

  - `var` ja `let` erinevused sulundis;
  - `var` hoisting ja `let`-i ajaline surnud tsoon;
  - lõtv (`==`) ja range (`===`) võrdlus;
  - falsy väärtused ja `NaN`;
  - sulundiga peidetud ostukorvi olek;
  - klasside prototüübiahel;
  - `this` käitumine meetodi ühendatud ja eraldatud väljakutses.

---

## Oodatav tulemus ja kontrollnäited

```javascript
scopeDemo(3)
// var_: [3, 3, 3]
// let_: [0, 1, 2]

hoisting()
// var_before: "undefined"
// var_after: 18
// let_before: "ReferenceError"
// let_after: 120
```

Hoisting'u oluline erinevus seisneb selles, et `var` on enne deklaratsioonirida olemas väärtusega `undefined`, kuid `let` asub enne deklaratsioonirida ajalises surnud tsoonis ja lugemine põhjustab `ReferenceError`-i.

```javascript
freeText(0)       // "välja müüdud"
freeText(12)      // "12 vaba"
freeText(NaN)     // "vigane sisend"
price("wrong")    // RangeError
```
