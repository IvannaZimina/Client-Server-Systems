## Ülesanne 6 — Nõuded ja arhitektuuri valik

### 1. Rakenduse eesmärk ja edukuse kriteeriumid
Piletikassa on veebipõhine piletite müügi ja sündmuste haldamise süsteem.
* **Kolm edukuse eeldust:**
  1. Kasutaja peab saama mugavalt sündmusi sirvida ja pileteid osta.
  2. Korraldaja peab saama hallata sündmusi ja saaliplaane.
  3. Süsteem peab tagama kohtade unikaalsuse (vältima topeltmüüki) ja maksete turvalisuse.

### 2. Rollid ja kontod
Süsteemis on kolm rolli:
* **kasutaja** (globaalne) — tavaline ostja.
* **korraldaja** (ühe sündmuse ulatuses) — sündmuse haldaja.
* **süsteemihaldur** (globaalne, ainult toimumiskohad) — tehniline administraator.

> **Märkus:** Korraldaja **EI OLE** eraldi konto liik, vaid seos — sündmuse looja on selle sündmuse korraldaja. Sama inimene võib ühel sündmusel olla korraldaja ja teisel tavaline ostja.

### 3. Funktsioonide prioriteet ja põhjendus
Funktsioonid on järjestatud tähtsuse järgi (ülevalt alla), lähtudes põhilistest kasutajateekondadest ("tule, vali, maksa, sisene"):

1. **Sündmuste ja piletite sirvimine** — süsteemi tuum, ilma milleta kasutaja ei saa teada pakutavatest üritustest.
2. **Istekoha / pileti valik** — võimaldab valida konkreetse koha saaliplaanilt.
3. **Makse sooritamine** — kriitiline tehinguline etapp, mis kinnitab broneeringu ja toob tulu.
4. **Sissepääs / pileti valideerimine** — tagab üritusel kiire ja korrektse pääsmete kontrolli.
5. Sündmuste loomine ja haldamine (korraldajale).
6. Istekohtade broneeringu ajutine hoidmine (aeguv lukk).
7. Administratiivne seadistamine (toimumiskohad ja saaliplaanid).

### 4. Andmete üldpilt (olemud ja seosed)

```text
kasutaja --< sundmus >-- toimumiskoht --< saaliplaan --< koht
   |                                                    |
   +--< hinnaklass                                      |
   |                                                    |
   +--< ost --< pilet >---------------------------------+
                 |
                 +--< sissepaas

hoid: koht + ostja + aegumisaeg  (lühiajaline, aegub ise)

### 5. Arhitektuuride võrdlus

| mudel              | kes hoiab andmeid     | kes otsustab | siin                     |
| :----------------- | :-------------------- | :----------- | :----------------------- |
| monoliit           | server (ühes kohas)   | server       | ei sobi hajutatuse jaoks |
| p2p (peer-to-peer) | iga sõlm (hajutatult) | igaüks ise   | **EI SOBI**              |
| klient-server      | server                | server       | **sobib**                |

### 6. Nõue, mis sunnib valima klient-server arhitektuuri
Kohtade unikaalsus ja topeltmüügi vältimine (ühine keskne tõeallikas ehk *single source of truth*). Kuna mitu klienti võivad samal sekundil proovida osta sama piletit/kohta, peab otsuse langetama ja andmeid hoidma keskne server, kes lahendab konfliktid ja tagab, et ühte kohta ei müüda mitu korda.

### 7. Millal P2P oleks õige valik ja miks siin ei ole
* **Õige valik:** P2P (peer-to-peer) sobib failide jagamiseks (nt BitTorrent), detsentraliseeritud krüptovõrkudeks või otmesuhtluseks, kus puudub vajadus keskse autoriteedi järele ja sõlmed usaldavad üksteist.
* **Miks siin ei sobi:** Piletikassa eeldab ühtset ja ranget järjekorda ning reaalajas keskselt kontrollitavat olekut (kes sai esimesena istekoha). P2P hajutatud arhitektuur tekitaks konfliktseid olukordi (kaks inimest ostavad samal ajal sama koha) ja sünkroniseerimisviivitusi.

### 8. Mida kaasaegne CSS tegi JavaScripti asemel
Selles projektis asendas kaasaegne CSS mitmeid varem JavaScriptiga lahendatud ülesandeid:
* **Jõudluse optimeerimine (virtuaalne skrollimine):** `content-visibility: auto` ja `contain-intrinsic-size` asendasid keerulise JavaScript-põhise elementide dünaamilise laadimise/eemaldamise DOM-ist suure hulga kaartide renderdamisel.
* **Küljendamine ja paigutus:** CSS Grid ja Flexbox asendasid vajaduse elementide asukohtade ja mõõtmete arvutamiseks skriptidega.
* **Ligipääsetavus ja fookus:** `:focus-visible` haldab visuaalset fookust otse brauseri tasemel, välistades vajaduse eraldi JS-eventide järele.