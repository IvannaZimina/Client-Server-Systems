# Ülesanne 6 — Teenustöötaja ja võrguta pilet ★★★

### 1. Kirjuta `install`: lae kest vahemällu ja anna vahemälule VERSIOON.

Failis `public/sw.js` registreeritud `install`-sündmuse töötleja avab
`caches.open(VERSION)` abil vahemälu `piletikassa-v3` ja lisab
`cache.addAll(SHELL)` abil viis kestafaili: `/index.html`, `/app.js`,
`/style.css`, `/logo.svg` ja `/manifest.webmanifest`. `event.waitUntil()`
hoiab paigalduse nende failide laadimiseni.

---

### 2. Kirjuta `activate`: kustuta KÕIK vanad vahemälud ja võta lehed üle.

`activate` loetleb kõik vahemälud ja kustutab kõik nimed peale aktiivse
`piletikassa-v3`. `clients.claim()` annab uuele teenustöötajale aktiivsed
lehed üle.

---

### 3. Jooksuta proovijooks ja kontrolli, et v1 ja v2 said kustutatud.

Kontroll käivitatakse käsuga `node materials/check-sw.js` kaustas `KT_5`.
Failis `materials/check-sw.js` luuakse enne `activate`-sündmust vahemälud
`piletikassa-v1` ja `piletikassa-v2`. Pärast sündmuse töötleja lõppu annab
`caches.keys()` tulemuseks ainult `["piletikassa-v3"]`, sest vanad vahemälud
on kustutatud.

---

### 4. Seleta, millal `skipWaiting` on ohtlik ja mis selle kesta juures teeb ta ohutuks.

`skipWaiting` on ohtlik, kui uus teenustöötaja võtab avatud lehe üle ajal, mil
leht kasutab vana kesta ressursse. Selles lahenduses avab `install` vahemälu
`piletikassa-v3` ja `cache.addAll(SHELL)` laadib kõik viis faili enne
`event.waitUntil()` lõpetamist vahemällu. `activate` kustutab vanad vahemälud
ja võtab lehed üle. Kontrollskript kinnitas vähemalt viie faili laadimise, kuid
olemasoleva lehe täielikku versioonivahetuse riski `skipWaiting` ise ei kõrvalda.

---

### 5. VIHJE: brauser ei kustuta vanu vahemälusid KUNAGI ise.

Brauser ei kustuta Cache API kirjeid automaatselt. Vanad versioonid kustutatakse
teenustöötaja `activate`-s, et kettale ei jääks aegunud rakendusefaile.

---

### 6. Kirjuta `networkFirst()` KOOS ajalõpuga; võrguta tuleb vastus vahemälust.

`networkFirst()` proovib kõigepealt võrku ja kasutab määratud ajalõppu. Värske
vastus salvestatakse vahemällu. Võrguvea või ajalõpu korral tagastatakse
vahemälus olev vana vastus.

---

### 7. Kirjuta `staleWhileRevalidate()`: vana kohe, uus taustal, tausta viga vaikselt.

`staleWhileRevalidate()` tagastab olemasoleva vastuse kohe, et kasutajaliides
reageeriks kiiresti. Samal ajal laaditakse võrgust uus vastus ja salvestatakse
vahemällu. Taustal tekkinud viga ei katkesta vana vastuse kuvamist.

---

### 8. Kirjuta `pick()`: `/api/orders` on võrk-ainult ja seda EI vahemälustata.

`pick()` annab kestale `shell-first` (cache-first),  
sündmuste nimekirjale `network-first`,  
teatud piletile `stale-while-revalidate` ja  
`/api/orders`-ile `network-only`.  
Ostunimekiri sisaldab muutuvaid ja isiklikke andmeid, mida ei tohi vanast vahemälust kuvada.

---

### 9. Kirjuta `docs/service-worker.md`: mida võrguta SAAB ja mida EI SAA.

Teenustöötaja teeb rakenduse võrguta loetavaks, mitte täielikult võrguta
töötavaks. Võrguta saab:
- avada vahemällu salvestatud rakenduse kesta;
- lugeda sündmuste vana versiooni;
- lugeda vahemällu salvestatud pileti andmeid.

Võrguta ei saa:
- kontrollida uue ostu õnnestumist;
- luua usaldusväärset uut tellimust;
- kasutada `stale-while-revalidate`-andmeid vaba kohtade arvu täpseks   näitamiseks, sest andmed võivad olla vananenud.

---

## Mõõdetud tulemus

## Elutsükkel - mõõdetud

```text
install  -> kest laetud (5 faili), skipWaiting kutsutud
activate -> alles jäi ainult ["piletikassa-v3"]
```

## Kolm strateegiat

| strateegia | kasutajale | kasutus |
|---|---|---|
| shell-first (cache-first) | kohe | kest (5 faili) |
| network-first | värsket, võrguta vana | sündmuste nimekiri |
| SWR | vana kohe, uus hiljem | üks pilet |

## Isikuandmed: mis läheb vahemällu ja mis mitte

```text
/api/orders       -> võrk-ainult   (isikuandmed, muutub iga ostuga)
/api/tickets/:id  -> SWR           (ei muutu, uksel vaja võrguta)
```

Kontrollskript andis tulemuseks `19 kontrolli OK`.
