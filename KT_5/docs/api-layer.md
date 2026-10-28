# Ülesanne 5 — API-kiht kliendis ★★★

### 1. Kirjuta `toApiError()`, mis annab igast erindist `ApiError`-i õige laadiga.

`toApiError()` muudab võrgu-, HTTP-, vormingu-, ajalõpu- ja katkestusvead
ühtseks `ApiError`-iks. Kutsuja saab kasutada ühte veatüüpi.

---

### 2. Kata kuus laadi: `network`, `server`, `client`, `format`, `timeout` ja `abort`.

Funktsioon `toApiError()` tagastab kuue võimaliku väljaga `kind` väärtuse:
`TypeError` annab `network`, HTTP 5xx annab `server`, HTTP 4xx annab `client`,
vigane JSON annab `format`, `TimeoutError` annab `timeout` ja `AbortError`
annab `abort`.

---

### 3. Taga, et kutsuja enda katkestuse teade on `null`; ajalõpp on NÄHTAV ja korratav.

Kutsuja katkestuse teade on `null`, sest kasutaja algatatud katkestust ei ole
vaja veana näidata. Ajalõpu teade on nähtav ning ajutise serveriprobleemi tõttu
võib päringut korrata.

---

### 4. Kontrolli iga laadi proovijooksuga võltsitud `fetch`-i vastu.

`check-api.js` kutsub `makeApi({ fetchFn: fakeFetch(...) }).events()` viie
stsenaariumiga:
- `500` annab `ApiError(kind: 'server')`,
- `404` annab `ApiError(kind: 'client')`,
- võrguviga annab `ApiError(kind: 'network')`,
- vigane JSON annab `ApiError(kind: 'format')` ja
- 30 ms ajalõpp annab `ApiError(kind: 'timeout')`.
Eraldi katkestus annab `kind: 'abort'`.

---

### 5. VIHJE: laad otsustab kaks asja korraga — kas korrata ja mida öelda.

Vealaad määrab korratavuse ja kasutajale näidatava teate. Näiteks serveri- ja
võrguviga on tavaliselt ajutised, kuid 404-kliendiviga vajab päringu parandamist.

---

### 6. Kirjuta `toEvent()`: ISO-sõne -> `Date` ja arvutatud väli `free`.

`start` muudetakse ISO-sõnest `Date`-objektiks. `free` arvutatakse valemiga
`seats - sold`, et tuletatud väärtust ei peaks server eraldi saatma.
`soldOut` muutub väärtuseks `true`, kui vabu kohti ei ole.

---

### 7. Kirjuta `makeApi()` nii, et vaade näeb ainult nimesid, mitte URL-e.

Avalik liides sisaldab nimesid `events`, `event`, `seatmap` ja `buyTickets`.
URL-id, HTTP-meetodid, päised ja JSON-i lugemine jäävad API-kihi sisse.

---

### 8. Lisa ajalõpp ja `Accept`-päis ÜHTE kohta, mitte iga kutse juurde, ja kirjuta `docs/api-layer.md`: mis kuulub API-kihti ja mis EI kuulu.

Ajalõpp ja `Accept`-päis lisatakse ühes kohas API-kihis.  
API-kihti kuuluvad URL-ide koostamine, HTTP-vastuste kontroll ja serveri andmekuju teisendamine.  
API-kihti ei kuulu `loading`-, `empty`- ega `err`-oleku otsustamine, vaate renderdamine ega kasutajaliidese kujundus.

---

### 9. Otsusta KOLME vastuse ja JSON-päringute arvu pealt, milline neist on serveripoolne, kliendipoolne või API+SPA — ja mitu täisringi igaüks maksab.

HTML-vastuse ja JSON-päringute arvu järgi on serveripoolne renderdus `B`: valmis HTML saabub ühe täisringiga.  
Kliendipoolne renderdus on `C`, kus HTML sisaldab skripti ja andmed on juba dokumendis.  
API+SPA renderdus on `A`, kus HTML, skript ja hilisem JSON-päring annavad kolm täisringi.  
Järjekorras `server, client, api_spa` on tulemused `[1, 2, 3]`.

---

## Mõõdetud tulemus

## Iga erind tuleb välja ApiError-ina

| server andis | laad | korratav |
|---|---|---|
| 500 | server | jah |
| 404 | client | ei |
| võrguviga | network | jah |
| 200 + vigane JSON | format | ei |
| ajalõpp | timeout | jah |
| kutsuja katkestas | abort | ei |

## Teisendus piiril

```text
server    { start: "2026-10-04T19:00", seats: 420, sold: 118 }
rakendus  { start: Date, free: 302, soldOut: false }
```

`free` on ARVUTATUD. Server ei saada `free` välja, sest väärtus on tuletatav.

Kontrollskript andis tulemuseks `30 kontrolli OK`.

Renderdusviiside tegelikud kontrollväärtused olid:

```text
A -> api_spa
B -> server
C -> client
roundTrips -> [1, 2, 3]
```

`searchEngine` on `server`-režiimis täielik, `client`-režiimis piiratud ja
`api_spa`-režiimis sõltuv eelrenderdusest.
