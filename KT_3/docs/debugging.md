# Ülesanne 1 - keel, ulatus ja silumine

## 1. Ulatus: var ja let sulundis
scopeDemo(3)
    var_: [3, 3, 3]          kõik kolm näevad ÜHT muutujat
    let_: [0, 1, 2]          igale ringile OMA muutuja
hoisting()
    var_before: "undefined"  let_before: ReferenceError

## 2. Võrdlemine
| avaldis            | tulemus |
| ------------------ | ------- |
| 0 == ""            | true    |
| "6" == 6           | true    |
| null === undefined | false   |
| NaN === NaN        | false   |

Kaheksa väära väärtust: false, 0, -0, 0n, "", null, undefined, NaN.

## 3. Sulund ja prototüübiahel
- **Sulund (`createCart`):** Tagab, et sisemine massiiv `rows` on väljastpoolt täielikult varjatud ja ligipääsetav ainult läbi meetodite.
- **Prototüübiahel (`prototypeChain`):** Kinnitab, et klassid on JavaScriptis funktsioonid ning nende prototüübid moodustavad ahela, mis lõpeb väärtusega `null`. Eraldatud meetodi puhul kaotab `this` oma seose objektiga ja annab `undefined`.