# Ülesanne 1 — Semantika ja ligipääsetavus

### 1. Täienda KT1 `public/index.html`-i: skelett on juba olemas, uut faili ei tehta.

Olemasolevat HTML-i täiendati semantilise struktuuriga. Uut eraldi HTML-faili ülesande jaoks ei loodud.

### 2. Pane paika viis maamärki ja anna igale sektsioonile `aria-labelledby`.

Kasutati `header`-, `nav`-, `main`- ja `footer`-maamärki. Sisuplokkidele lisati `section` ja `aria-labelledby`, mis seob ploki vastava pealkirjaga. `main`-elemendile lisati `aria-labelledby="page-title"`.

### 3. Sündmuste võrdlus on TABEL: `caption` ja iga päis oma `scope`-iga.

Võrdlustabelis kasutati nähtamatult kuvatavat `caption`-elementi. Veerupäistele lisati `scope="col"` ja sündmuse nimetustele rea päist tähistav `scope="row"`.

### 4. Esiletõstetud kaardid on NIMEKIRI: `ul > li > article`.

Esiletõstetud kaart paigutati struktuuri `ul > li > article`. Nimekirja esitluseks eemaldati vaikimisi loendimarkerid CSS-i abil.

### 5. VIHJE: reapäis on `th scope="row"`, mitte `td` — muidu ei tea lugeja, mis rida.

Sündmuse nimi on tabelis `th scope="row"`. Nii jääb rea tähendus ekraanilugejale arusaadavaks ka veergude vahel liikudes.

### 6. Lisa hüppelink, mis on nähtav ainult fookuses, ja tee ta esimeseks.

Lehe esimese fookustatava elemendina lisati link `Hüppa põhisisu juurde`, mis viib `#main`-elemendini. Link muutub nähtavaks klaviatuurifookuse saamisel.

### 7. Käi leht Tabiga läbi: fookus on nähtav ja järjekord vastab visuaalsele.

Kõigile interaktiivsetele elementidele jäeti loomulik fookusjärjekord. `:focus-visible` lisab klaviatuuriga liikumisel nähtava ääre ning hüppelink võimaldab korduva navigatsiooni vahele jätta.

### 8. Mõõda SINU lehe iga tekstipaari värvid ja arvuta kontrastisuhe — näidise arvud on `style-1.css`-i omad.

Kontrollitud heleda teema tekstipaarid:

| paar | suhe | AA 4,5:1 |
|---|---:|---|
| põhitekst valgel | 17,40:1 | jah |
| abitekst valgel | 7,72:1 | jah |
| fookuse ääris valgel | 5,98:1 | jah |

### 9. Kirjuta `docs/accessibility.md` ja loetle, mida automaatkontroll EI leia.

Automaatkontroll ei otsusta, kas alt-tekst kirjeldab pilti õigesti, kas fookusjärjekord on loogiline, kas maamärkide jaotus on kasutajale mõistlik või kas `aria-label` on arusaadav.

## Oodatav tulemus

### Faili `docs/accessibility.md` kuju

```text
# Ülesanne 1 - semantiline märgend ja ligipääsetavus

| paar                 | suhe    | AA (4,5:1) |
|----------------------|---------|------------|
| põhitekst valgel    | 17,40:1 | jah        |
| abitekst valgel     |  7,72:1 | jah        |
| fookuse ääris valgel|  5,98:1 | jah        |
```

### Mida automaatkontroll EI leia

```text
kas alt-tekst on ÕIGE - "pilt123.jpg" läbib kontrolli
kas fookusjärjekord on LOOGILINE
kas maamärkide jaotus on mõttekas
kas aria-label on kasutajale arusaadav
```

Semantiline HTML, nähtav klaviatuurifookus, toimiv hüppelink, kirjeldav tabeli struktuur ja kontrollitud kontrastisuhted on esitatud koos mõõdetud tulemustega.
