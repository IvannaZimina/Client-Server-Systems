# Ülesanne 3 - DOM kui puu: olek -> vaade

### 1. Loo olek ÜHE objektina: `events`, `sort`, `dir`, `search`, `loading`.

* Olek koondati üheks objektiks, mis sisaldab välju `events`, `sort`, `dir`, `search` ja `loading`:

  ```javascript
  {
    events: [],
    sort: "name",
    dir: "asc",
    search: "",
    loading: false
  }
  ```

  Selline struktuur võimaldab rakenduse andmeid, sortimise seadeid, otsingut ja laadimise olekut käsitleda ühes kohas.

---

### 2. Kirjuta `forView(state)`: otsi nime JA koha pealt, siis sordi.

* Funktsioonis `forView` luuakse sündmustest koopia ning rakendatakse otsingut nime ja toimumiskoha järgi. Otsingutekst teisendatakse väiketähtedeks ning vaste leidmisel jäetakse sündmus tulemusse.

  ```javascript
  const query = currentState.search.toLowerCase();
  rows = rows.filter(
    (event) =>
      event.name?.toLowerCase().includes(query) ||
      event.venue?.toLowerCase().includes(query),
  );
  ```

  Pärast filtreerimist sorteeritakse tulemused olekus määratud välja (`sort`) ja suuna (`dir`) järgi. Tekstiväljade puhul kasutatakse `localeCompare`-i.

---

### 3. Tagasta tuletisest KAKS asja: `rows` ja `state`.

* Funktsioon `forView` tagastab objekti kahe võtmega:

  ```javascript
  return {
    rows,
    state: currentState,
  };
  ```

  `rows` sisaldab kuvamiseks filtreeritud ja sorteeritud sündmusi. `state` sisaldab vaate tuletamiseks kasutatud olekut.

---

### 4. Joonista EI TOHI olekusse vaadata — muidu on üks suund lõhki läinud.

* Vaate koostamisel kasutatakse funktsiooni `forView(readState())`. DOM-i renderdamine toimub saadud `rows`-i põhjal ning renderdusfunktsioon ei pöördu otse globaalse oleku poole.

  Andmevoo suund on:

  ```text
  olek -> forView -> { rows, state } -> DOM
  ```

  Ühesuunaline andmevoog väldib olukorda, kus DOM muudab olekut otse või vaate koostamisel loetakse andmeid mitmest sõltumatust allikast.

---

### 5. VIHJE: tühi tulemus ja laadimine näevad DOM-is ühtemoodi välja.

* Filtreerimise tulemusena võib tekkida tühi `rows`-massiiv. Selline tulemus on korrektne ning seda saab DOM-is käsitleda ühtse renderdusloogikaga.

  `loading` kuulub samuti keskse olekuobjekti koosseisu. Laadimise oleku muutmine toimub oleku kaudu, mitte eraldi globaalse muutuja abil. Nii jääb olek ja selle põhjal tuletatav vaade ühtseks.

---

### 6. Mõõda 2000 rida kolmel viisil: tsükkel, `replaceChildren` ja fragment.

* Failis `perf.js` võrreldakse 2000 elemendi loomist kolmel viisil:

  1. tsükkel ja `appendChild`;
  2. elementide loomine ning `replaceChildren(...elements)`;
  3. elementide lisamine `DocumentFragment`-i ja fragmendi lisamine konteinerisse.

  Mõõtmised tehakse brauseri konsoolis `console.time` ja `console.timeEnd` abil.

  | Viis | Mõõdetud aeg |
  | --- | ---: |
  | tsükkel `appendChild` | 1.71 ms |
  | `replaceChildren(...rows)` | 0.48 ms |
  | `DocumentFragment` | 1.81 ms |

  Tulemused sõltuvad brauserist, arvutist ja DOM-i hetkeseisust. Seetõttu kirjeldavad mõõtetulemused konkreetset käivituskeskkonda, mitte universaalset järjestust.

---

### 7. Tee kümme elementi ja eemalda need tsüklis ELAVAST kollektsioonist.

* `getElementsByClassName` tagastab elava kollektsiooni. Kollektsiooni sisu muutub kohe pärast elemendi DOM-ist eemaldamist.

  Praeguses `runCollectionTests`-i koodis kasutatakse indeksiga `for`-tsüklit:

  ```javascript
  for (let i = 0; i < liveCol.length; i++) {
    liveBox.removeChild(liveCol[i]);
    liveRemoved++;
  }
  ```

  Elav kollektsioon lüheneb iga eemaldamise järel. Seetõttu liigutakse järgmise indeksi juurde ja iga teine element jääb alles:

  | Kollektsioon | Eemaldati | Jäi alles |
  | --- | ---: | ---: |
  | elav `getElementsByClassName` | 5 | 5 |

---

### 8. Korda sama STAATILISE kollektsiooniga ja võrdle, mitu jäi alles.

* `querySelectorAll` tagastab staatilise kollektsiooni. Kollektsiooni liikmed säilivad pärast DOM-ist eemaldamist kollektsioonis ning `forEach` saab kõik algselt leitud 10 elementi läbi käia.

  ```javascript
  staticList.forEach((element) => {
    staticBox.removeChild(element);
    staticRemoved++;
  });
  ```

  Tulemuseks on:

  | Kollektsioon | Eemaldati | Kollektsioonis alles |
  | --- | ---: | ---: |
  | staatiline `querySelectorAll` | 10 | 10 |

  DOM-ist eemaldatud elemendid ei kuulu enam `staticBox`-i, kuid staatiline nimekiri säilitab algse valiku.

--- 

### 9. Kirjuta `docs/view.md` koos mõõdetud millisekunditega.

* Käesolevas failis dokumenteeriti:

  - ühe olekuobjekti struktuur;
  - `forView(state)` filtreerimine nime ja toimumiskoha järgi;
  - sortimine välja ja suuna põhjal;
  - `rows` ja `state` tagastamine;
  - ühesuunaline voog olekust DOM-i;
  - 2000 rea renderdamise kolm meetodit;
  - elava ja staatilise kollektsiooni erinevus;
  - indeksiga tsükli tegelik tulemus elava kollektsiooni korral.

---

## Oodatav tulemus ja kontrollnäited

### Olekust vaate tuletamine

```javascript
const currentState = {
  events: [
    { id: 1, name: "Jazz Night", venue: "Salme" },
    { id: 2, name: "Rock Concert", venue: "Tondiraba" },
  ],
  sort: "name",
  dir: "asc",
  search: "jazz",
  loading: false,
};

forView(currentState).rows
// [{ id: 1, name: "Jazz Night", venue: "Salme" }]
```

### Olekust koopia tagastamine

```javascript
const snapshot = setState({ search: "rock" });
snapshot.search // "rock"
```

`readState()` kasutab `JSON.parse(JSON.stringify(state))` konstruktsiooni ning tagastab sügava koopia. Välise objekti muutmine ei muuda sisemist olekut.

### DOM-i kollektsioonid

```text
getElementsByClassName + indexed for:
removed: 5, remaining: 5

querySelectorAll + forEach:
removed: 10, collection length: 10
```

Indeksiga eemaldamistsükli korral muutuks elav kollektsioon tsükli ajal ning võimalikuks tulemuseks oleks 5 eemaldatud ja 5 alles.
