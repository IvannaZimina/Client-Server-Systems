# Ülesanne 6 — Nõuded ja arhitektuuri valik

### 1. Kirjuta ühe lausega, mida rakendus teeb, ja kolm asja, mis peavad õnnestuma.

Piletikassa võimaldab kasutajal sündmusi sirvida, valida piletid ja vormistada ostu.

Õnnestuma peavad:

1. sündmuste ja piletite sirvimine;
2. koha või pileti valimine ja ostu vormistamine;
3. makse ning pileti hilisem valideerimine ilma sama koha topeltmüügita.

### 2. Kirjelda kolm rolli ja ütle, milline neist EI OLE konto liik.

* `kasutaja` on globaalne ostja;
* `korraldaja` tegutseb ühe sündmuse ulatuses;
* `süsteemihaldur` haldab globaalselt toimumiskohti ja saaliplaane.

Korraldaja ei ole eraldi konto liik. See on sündmusega seotud roll: sama inimene võib olla ühe sündmuse korraldaja ja teise sündmuse ostja.

### 3. Järjesta funktsioonid tähtsuse järgi ja põhjenda esimest nelja.

1. Sündmuste ja piletite sirvimine — ilma pakkumise nägemiseta ei saa ost alguse.
2. Istekoha või pileti valik — kasutaja peab saama valida soovitud pakkumise.
3. Makse sooritamine — kinnitab tehingu ja loob tulu.
4. Sissepääs ja pileti valideerimine — kontrollib sündmusele pääsemist.
5. Sündmuste loomine ja haldamine.
6. Istekohtade ajutine broneerimine.
7. Toimumiskohtade ja saaliplaanide administratiivne seadistamine.

Esimesed neli moodustavad kasutajateekonna: tule, vali, maksa, sisene.

### 4. Joonista andmete üldpilt: olemid ja seosed, ilma veergudeta.

```text
kasutaja --< sündmus >-- toimumiskoht --< saaliplaan --< koht
    |                         |
    +--< hinnaklass            +--< ost --< pilet >-- koht
                                      |
                                      +--< sissepääs

hoid: koht + ostja + aegumisaeg
```

### 5. VIHJE: esimesed neli funktsiooni on ÜKS lugu — tule, vali, maksa, sisene.

Funktsioonide järjestus järgib sama kasutajateekonda: sündmuse leidmine, pileti valimine, ostu kinnitamine ja pileti kontrollimine.

### 6. Võrdle kolme mudelit: kes hoiab andmeid ja kes otsustab.

| mudel | kes hoiab andmeid | kes otsustab | sobivus |
|---|---|---|---|
| monoliit | üks server või masin | üks programm | sobib väiksemale kesksele süsteemile |
| P2P | iga osaleja | iga sõlm | ei sobi piletite ühise oleku jaoks |
| klient-server | keskne server | server | sobib |

### 7. Näita, MILLINE nõue sunnib klient-serverit — nimeta ta.

Klient-serveri arhitektuuri sunnib valima nõue **vältida sama istekoha topeltmüüki**. Keskne server peab hoidma ühte tõeallikat ja lahendama samaaegsed ostukatsed.

### 8. Ütle, millal P2P oleks õige valik, ja miks siin ei ole.

P2P sobib näiteks failijagamiseks või detsentraliseeritud suhtluseks, kus keskne otsustaja puudub. Piletikassas ei sobi see, sest sama koha müük peab saama ühe keskse ja usaldusväärse otsuse.

### 9. Loetle, mida kaasaegne CSS selles kontrolltöös JavaScripti asemel tegi.

* Grid ja Flexbox lahendasid paigutuse;
* `:focus-visible` näitas klaviatuurifookust;
* `:user-invalid` kujundas kasutaja sisestatud vigase välja;
* `@media (prefers-color-scheme: dark)` valis süsteemiteema;
* `@container` kohandas komponendi paigutust;
* `content-visibility` vähendas suure nimekirja renderdamise tööd.

### 10. KOMMIT: `git commit -m "C02 Ex6 — Nõuded ja arhitektuuri valik"`.

```bash
git add docs/requirements.md
git commit -m "C02 Ex6 — Nõuded ja arhitektuuri valik"
```

## Oodatav tulemus

### Faili `docs/requirements.md` kuju

```text
kasutaja --< sündmus >-- toimumiskoht --< saaliplaan --< koht
              |                                          |
              +--< hinnaklass                            |
              |                                          |
              +--< ost --< pilet >-----------------------+
                            |
                            +--< sissepääs

hoid: koht + ostja + aegumisaeg   (lühiajaline, aegub ise)

| mudel         | kes hoiab andmeid | kes otsustab | siin          |
|---------------|-------------------|--------------|---------------|
| monoliit      | üks masin         | üks programm  | teine küsimus |
| p2p           | igal osalejal     | igaüks        | EI SOBI       |
| klient-server | server            | server        | sobib         |
```

Keskne server hoiab piletite ja kohtade ühist olekut ning otsustab samaaegsete ostukatsete tulemuse.
