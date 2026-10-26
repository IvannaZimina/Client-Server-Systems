# Ülesanne 3 - andmete edastamise neli viisi

### 1. Saada ost päringustringina, JSON-ina, urlencoded-ina ja multipartina; kirjuta koodid üles.

Sama ost oli `event=3`, `qty=2`, `buyer=Mari`. Päring saadeti päringustringi,
urlencoded-vormi, JSON-i ja multipart-vorminguna.

| viis | Content-Type | kood |
|---|---|---:|
| päringustring | keha puudub | 415 |
| vormiandmed | `application/x-www-form-urlencoded` | 201 |
| JSON | `application/json` | 201 |
| multipart | `multipart/form-data` | 201 |

---

### 2. Mõõda iga keha baitides ja pane neli arvu ühte tabelisse.

Mõõdetud tulemused:

| viis | keha |
|---|---:|
| päringustring | 0 B |
| vormiandmed | 24 B |
| JSON | 34 B |
| multipart | 356 B |

Multipart oli sama kolme välja puhul umbes 14,8 korda suurem kui urlencoded,
sest iga osa vajab piiritlejat ja oma päiseid.

---

### 3. Saada üks päring tüübiga `text/plain` ja kirjuta kood ning põhjus üles.

`text/plain` päring tagastas koodi `415 Unsupported Media Type`. Etteantud
server toetab selles harus JSON-i, urlencoded-vormi ja multipart-vormi, kuid
ei toeta `text/plain` tüüpi tellimuse kehana.

---

### 4. Vaata vastusest `Location`-päist ja seleta, miks 201 ilma temata on poolik.

Õnnestunud loomise vastus oli `201 Created` ja sisaldas päist:

```text
Location: /api/orders/<id>
```

`Location` näitab loodud ressursi aadressi. Ilma selle päiseta peaks klient
aadressi ise tuletama ja vastus oleks puudulik.

---

### 5. VIHJE: multipart eraldab iga välja oma piiritlejaga — vaata peeglist toorest keha.

Multipart-keha koosneb osadest. Iga osa algab piiritlejaga ja sisaldab oma
päiseid, näiteks välja nime, seejärel tühja rida ja väärtust. Peegelduses oli
näha piiritleja ning iga välja eraldi osa.

---

### 6. Näita, et urlencoded annab arvu SÕNENA, JSON aga arvuna.

Urlencoded-i korral jõuab `qty` parserisse sõnena:

```text
qty=2 -> "2"
```

JSON säilitab tüübi:

```json
{"qty":2}
```

Tulemuseks on `"2" + 1` korral `"21"`, kuid `2 + 1` korral `3`.

---

### 7. Kirjuta, millal on õige valik päringustring ja miks ta ostuks ei kõlba.

Päringustring sobib otsinguks, filtreerimiseks, sortimiseks ja ressursi
lugemiseks. Seda ei kasutata ostu loomiseks, sest ost muudab serveri olekut
ning URL võib jääda logidesse, järjehoidjatesse ja vahemäludesse.

---

### 8. Seleta, miks `charset` ei ole valikuline — too näide täpitähega.

`charset` näitab, kuidas keha baite märkideks dekodeerida. Näiteks `Mari Õun`
vajab UTF-8 kodeeringut, sest `Õ` ei ole ASCII-märk ja tema baitide arv ei
võrdu ühe märgiga.

---

### 9. Kirjuta `docs/transfer.md` koos mõõdetud baitidega.

Käesolevas failis on esitatud kõik neli nõutud vormingut, nende
`Content-Type`-id, keha suurused, olekukoodid, `Location`-päis ning tüüpide
erinevus.

---

## Oodatav tulemus

```text
vormiandmed -> 24 B -> 201
JSON         -> 34 B -> 201
multipart    -> 356 B -> 201
text/plain   -> 1 B  -> 415
```

Päringu kehas oli multipart urlencoded-ist oluliselt suurem. `201` vastuses
oli `Location`-päis.
