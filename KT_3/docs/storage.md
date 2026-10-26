# Ülesanne 5 - brauseripoolne hoidla ja mustand

### 1. Vali võti kujul `piletikassa:draft` ja anna kirjele `VERSION`.

* Kasutati võtit `piletikassa:draft` ja versiooni `VERSION = 1`. Salvestatav väärtus sisaldab versiooni ja andmeid:

  ```javascript
  {
    version: 1,
    data: { ... }
  }
  ```

---

### 2. Kirjuta `read()`: vale versiooniga kirje visatakse minema ja tuleb `null`.

* `read()` loeb kirje, parsib JSON-i ja kontrollib versiooni. Puuduva või vale versiooni korral tagastatakse `null`.

  ```javascript
  read() // null, kui kirjet ei ole või versioon ei sobi
  ```

---

### 3. Kirjuta `save()` ja `remove()`; `read()` ja `save()` käivad JSON-i kaudu.

* `save(data)` kasutab `JSON.stringify`-i enne `localStorage.setItem`-i. `read()` kasutab `JSON.parse`-i. `remove()` kustutab sama võtme `localStorage.removeItem`-iga. `save()` ja `remove()` tagastavad õnnestumisel `true`.

---

### 4. Pane IGA lugemine ja kirjutamine `try/catch` sisse.

* `read()`, `save()` ja `remove()` sisaldavad eraldi `try/catch`-plokke. Vea korral ei katkestata lehe tööd: `read()` tagastab `null` ning kirjutamis- ja kustutamistoiming tagastab `false`.

---

### 5. VIHJE: ilma versioonita katkeb kood kohas, millele ei ole vea nähtavat seost.

* Versioonikontroll toimub kohe pärast JSON-i parsimist. Nii ei kasutata vana või tundmatu struktuuriga kirjet rakenduse olekuna.

---

### 6. Testi võltsitud hoidlat, mis viskab kirjutamisel `QuotaExceededError`-i.

* `save()` on kaitstud `try/catch`-iga. Kui `localStorage.setItem` viskab `QuotaExceededError`-i, tagastatakse `false` ja leht töötab edasi.

---

### 7. Testi keelatud saidiandmetega: lugemine viskab, `read()` peab andma `null`.

* Kui brauser keelab `localStorage` kasutamise või lugemine viskab vea, püüab `read()` erindi kinni ja tagastab `null`.

---

### 8. Pane hoidlasse katkitud JSON ja kontrolli, et leht ei kuku.

* Katkise JSON-i korral viskab `JSON.parse` vea. `read()` püüab vea kinni ja tagastab `null`. Kontrolltulemus kuvatakse lehe ülesande 5 plokis.

---

### 9. Kirjuta `docs/storage.md`: `localStorage` vs `sessionStorage`, IndexedDB ja MÕÕDETUD päritolu (`localhost` vs `127.0.0.1`).

* `localStorage` säilib kuni kustutamiseni ja on sama päritolu vahelehtede vahel jagatud. `sessionStorage` säilib kuni vahelehe sulgemiseni ega ole teiste vahelehtedega jagatud. `IndexedDB` sobib suuremate ja struktureeritud andmete jaoks.

  Mõõdetud päritolu on:

  ```text
  http://localhost:3000
  http://127.0.0.1:3000
  ```

  Need on erinevad päritolud, mistõttu ühe aadressi `localStorage` ei ole teise aadressiga sama.

---

## Oodatav tulemus

```text
save(data) -> true
read()     -> {"search":"jazz","sort":"start"}
wrong version -> null
broken JSON   -> null
remove()  -> true
```

Võltsitud veaolukordade kontrollimisel saadi:

```text
QuotaExceededError salvestamisel -> false
keelatud hoidla lugemisel -> null
```

`localStorage` salvestab ainult sõne. Objekti otse salvestamisel saadakse väärtus `"[object Object]"`, mistõttu kasutatakse alati `JSON.stringify`-i ja `JSON.parse`-i.