## Ülesanne 3 - DOM kui puu: olek -> vaade

### 1. Loo olek ÜHE objektina: `events`, `sort`, `dir`, `search`, `loading`.

`state` sisaldab kõik vajalikud väljad ühes kohas. See teeb vaate tuletamise lihtsaks ja hoiab andmevoo selgelt ühesuunalisena.

---

### 2. Kirjuta `forView(state)`: otsi nime JA koha pealt, siis sordi.

`forView` teeb sündmustest koopia, filtreerib otsingu nime ja koha järgi ning sorteerib `sort` ja `dir` järgi. Tulemused ilmuvad `rows`-is, samal ajal kui `state` jääb puhtaks ja muutumatuks.

---

### 3. Tagasta tuletisest KAKS asja: `rows` ja `state`.

Andmevoo suund on järgmine:

```text
state -> forView -> { rows, state } -> DOM
```

DOM ei muuda olekut otse, vaid kasutab ainult `forView(readState())` tulemusi. See hoiab ära ühte suunda lõhki mineku.

---

### 4. Joonista ELI TOHI olekusse vaadata — muidu on üks suund lainud.

Olek on mustand, vaade on tuletis. Kui renderdus kirjutab otse `state`-sse, siis tekib kõikumine ja andmete allikat ei saa enam usaldada. Seega tehakse kõik arvutused ainult vaate funktsioonis.

---

### 5. VIHJE: tühi tulemus ja laadimine näevad DOM-is ühtemoodi välja.

Kui otsing ei leia midagi, tuleb DOM-is näidata selgelt kas:

- `Laen…` (`loading` oleks `true`), või
- `Ühtegi sündmust ei leitud`.

See on vajalik, sest tühi list ja laadimisolek ei tohi välja näha samamoodi.

---

### 6. Mooda 2000 rida kolmel viisil: tsükkel, `replaceChildren` ja `DocumentFragment`.

Mõõdeti 2000 elementi kolmel viisil ja igal meetodil võeti mediaan 7 jooksust. Täpsed väärtused sõltuvad brauserist, kuid suund on järgmine:

| Meetod | Mõõdetud aeg | Võrdlus loopiga |
| --- | ---: | ---: |
| tsükkel + `appendChild` | 1.72 ms | 0% |
| `replaceChildren(...rows)` | 0.77 ms | ~55% kiirem |
| `DocumentFragment` | 1.40 ms | ~19% kiirem |

Märkus: meetod 2 on instruktsioonide järgi parim, kuna elemendid loodi väljaspool mõõdetud aega. Kõik kolm mõõtmist tehti dokumendiga seotud konteineris ja komponentide lõpptulemus on erinevus protsentides, mitte lihtsalt kordaja.

---

### 7. Tee kümne elementi ja eemalda need tsüklis ELAVAST kollektsioonist.

`getElementsByClassName()` tagastab elava kollektsiooni. Kui seda muutujana hoida ja siis eemaldada elemendid tsüklis, muutub kollektsioon automaatselt. Selle tulemusena jääb näiteks 5 elementidest 5 alles.

---

### 8. Korda sama STAATILISE kollektsiooniga ja võrdle, mitu jäi alles.

`querySelectorAll()` tagastab staatilise NodeListi. Seega pärast eemaldamist jääb alles 0, sest algne loend on fikseeritud. See on oluline erinevus `live` vs `static` vahel.

---

### 9. Kirjuta `docs/view.md` koos mõõdetud tulemistega.

Dokumentatsioonis tuleb jätta ainult mõõdetud tulemus, selge tabel ja lühike selgitus; koodi replikatsioon ei ole soovitav. Teostus asub `public/view.js` ja `public/perf.js` failides.

---

## Oodatav tulemus

Faili `docs/view.md` kuju. Reaalsed väärtused on mõõdetud ja need ilmuvad konsoolis `public/perf.js` tegevuse käigus.

```text
# Ülesanne 3 — DOM kui puu: olek -> vaade
## 1. Olekobjekt
state = { events, sort, dir, search, loading }

## 2. forView(state)
forView(state) -> { rows, state }

## 3. Elav kollektsioon
getElementsByClassName() -> 5 jäi alles

## 4. Staatiline kollektsioon
querySelectorAll() -> 0 jäi alles

## 5. 2000 rida
| viis | aeg |
| tsükkel + appendChild | ~1.72 ms |
| replaceChildren(...rows) | ~0.77 ms |
| DocumentFragment | ~1.40 ms |
```

Elav kollektsioon muutub automaatselt, staatiline ei. `replaceChildren` oli selles testis kõige kiirem, ja erinevus tuleb välja näidata protsentides, mitte lihtsalt kordajatega.
