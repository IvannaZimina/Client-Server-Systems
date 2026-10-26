# Ülesanne 2 — Ostuvorm ja valideerimine

### 1. Ehita `purchase.html`: kaks `fieldset`-i legendiga, kaheksa välja.

Ostuvorm asub failis `avalik/ost.html`. Vormis kasutati kahte `fieldset`-i: `Isikuandmed` ja `Tellimuse üksikasjad`. Välju on kaheksa: eesnimi, perenimi, e-post, korduv e-post, telefon, piletite arv, postiindeks ja märkus.

---

### 2. Igal väljal `label`+`for`, `name` ja `aria-describedby` oma veakastile.

Kõik sisestusväljad seoti `label`-iga `for` ja `id` kaudu ning said `name`-atribuudi. Abi- ja veateated ühendati väljaga `aria-describedby` kaudu. Veakastid on DOM-is olemas ka tühjana.

---

### 3. Lisa piirangud: `required`, `type`, `minlength`, `min`, `max`, `step`, `pattern`.

Kasutati:

| väli | piirangud |
|---|---|
| eesnimi, perenimi | `required`, `minlength="2"` |
| e-post | `required`, `type="email"` |
| telefon | `type="tel"`, `pattern` |
| piletite arv | `required`, `type="number"`, `min="1"`, `max="6"`, `step="1"` |
| postiindeks | `required`, `pattern="[0-9]{5}"` |
| märkus | `maxlength="300"` |

---

### 4. Pane vormile `novalidate` ja veakastid alati DOM-i, ka tühjana.

Vormile lisati `novalidate`, et kasutada hüpikakende asemel oma veateateid. Iga välja juures on tühi `span.viga` koos `role="alert"`.

---

### 5. VIHJE: `novalidate` lülitab välja HÜPIKTEATED, mitte valideerimise.

Brauseri `ValidityState` jääb kasutusele. `novalidate` peatab ainult vormi vaikimisi hüpikdialoogi; skript loeb endiselt väljade valideerimisolekut.

---

### 6. `message()`: loe `ValidityState` lipud ja anna päris arv, mitte üldlause.

Projektis täidab seda rolli eksporditud funktsioon `teade(vali)`. Kontrollitakse järjekorras `valueMissing`, `typeMismatch` või `patternMismatch`, `tooShort`, `rangeOverflow` ja `rangeUnderflow`. Tulemuseks antakse konkreetne teade koos vajaliku väärtusega.

Kontrollitud tulemused:

```text
tühi kohustuslik väli -> "See väli on kohustuslik."
vale e-posti kuju -> "Kontrolli e-posti aadressi kuju."
minlength=2 -> "Vähemalt 2 tähemärki."
max=6 -> "Suurim väärtus on 6."
```
---

### 7. `show()` kirjutab veakasti ja `aria-invalid`, tühjendab paranduse järel; `checkMatch()` võrdleb kaht e-posti `setCustomValidity()`-ga.

Projektis täidavad neid rolle `naita(vali)` ja `kontrolliKordust(a, b)`. Vigase välja korral lisatakse `aria-invalid="true"` ja tekst veakasti. Parandatud välja korral tekst kustutatakse ja atribuut eemaldatakse. Erinevate e-posti aadresside korral kasutatakse `setCustomValidity()`-i.

---

### 8. Saatmisel: peata, näita kõik vead ja vii fookus ESIMESE vea peale.

`submit`-käsitleja kontrollib kõik väljad, näitab vead, kutsub `preventDefault()`-i ning seab fookuse esimesele vigasele väljale.

---

### 9. Kirjuta `docs/purchase-form.md`: `message()` juhtumid ja `:invalid` vs `:user-invalid`.

` :invalid` kehtib kohe ka tühja kohustusliku välja puhul. `:user-invalid` rakendub pärast seda, kui kasutaja on väljaga tegelenud. Seetõttu kasutatakse vormi seisundi kujundamisel `:user-invalid`-i.

---

## Oodatav tulemus

### Faili `docs/purchase-form.md` kuju ja `message()` kontrollitud juhtumid

```text
# message() kontrollitud juhtumid
  tühi kohustuslik väli        -> "See väli on kohustuslik."
  vale e-posti kuju            -> "Kontrolli kuju ..."
  minlength=2                  -> "Vähemalt 2 tähemärki."
  max=6                        -> "Suurim väärtus on 6."
  tundmatu põhjus              -> brauseri oma teade
  valueMissing + typeMismatch  -> kohustuslikkus võidab

| valija         | millal kehtib                        |
|----------------|--------------------------------------|
| :invalid       | KOHE lehe avanemisel                 |
| :user-invalid  | alles pärast väljaga tegelemist      |
```

Vorm kuvab konkreetse vea õige välja juures, ei kasuta hüpikdialoogi, võrdleb e-posti aadresse, kontrollib tellimuse piiranguid ning viib vigase saatmise korral fookuse esimesele probleemsele väljale.
