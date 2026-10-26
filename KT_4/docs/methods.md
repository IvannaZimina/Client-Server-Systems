# Ülesanne 2 - meetodid ja olekukoodid

### 1. Tee tabel: meetod, ohutu, idempotentne, kus teda piletikassas kasutad.

| meetod | ohutu | idempotentne | kasutus piletikassas |
|---|---|---|---|
| GET | jah | jah | sündmuste nimekiri või ühe sündmuse vaade |
| HEAD | jah | jah | päiste kontroll ilma kehata |
| OPTIONS | jah | jah | CORS-i eelkontroll |
| POST | ei | ei | uue ostu loomine |
| PUT | ei | jah | sündmuse muutmine `If-Match` abil |
| PATCH | ei | jah* | sündmuse osaline muutmine sama eeltingimusega |
| DELETE | ei | jah | ostu tühistamine |

Ohutu päring ei muuda serveri olekut. Idempotentse päringu kordamine annab sama
lõppseisu, kuigi vastused võivad erineda.

---

### 2. Saada sama POST kaks korda ja loe kokku, mitu ostu tekkis.

Sama keha saatmisel kaks korda tekkis kaks eraldi ostu:

```text
POST /api/orders sama kehaga kaks korda -> oste kokku: 2
```

POST ei ole idempotentne, sest iga saatmine võib luua uue ressursi.

---

### 3. Saada sama PUT (`If-Match`!) kaks korda: lõppseis on sama.

Esimene PUT kasutas kehtivat ETag-i ja tagastas `200`. Pärast muudatust tekkis
uus ETag. Teine PUT kasutas vana ETag-i ja tagastas `412`.

```text
PUT /api/events/4 {"price":9} 2x -> 200, siis 412
```

---

### 4. Seleta ühe lausega, miks GET-tee „…/cancellation“ on ohtlik.

GET peab olema ohutu, kuid `.../cancellation` võib tühistada ostu. Brauser,
otsingurobot või lingi eellaadimine võib GET-i automaatselt teha ja põhjustada
soovimatu olekumuutuse.

---

### 5. VIHJE: brauser teeb ohutuid päringuid ISE — näiteks lingi eellaadimisel.

Brauser võib teha GET-päringu ise näiteks lingi eellaadimisel, lehe
eellaadimisel või eelvaate loomisel. Seetõttu ei tohi olekut muutvat tegevust
siduda GET-iga.

---

### 6. Jooksuta `/api/status/301`, 401, 405 ja 429 ning kirjuta lisapäised üles.

Mõõdetud tulemused:

```text
301 -> Location: /api/events
401 -> WWW-Authenticate: ******"piletikassa"
405 -> Allow: GET, HEAD, OPTIONS
429 -> Retry-After: 5
```
---

### 7. Vali kood: märgis on aegunud; korraldaja muudab TEISE korraldaja sündmust.

Vana `If-Match` märgise korral kasutatakse koodi `412 Precondition Failed`.
Teise korraldaja sündmuse muutmise korral kasutatakse koodi `403 Forbidden`,
sest kasutaja on teada, kuid tal puudub õigus.

---

### 8. Vali kood iga ülesande esimesel slaidil loetletud olukorra jaoks.

| olukord | kood |
|---|---:|
| nimekirja muutmiskatse | 405 |
| ei ole sisse logitud | 401 |
| logitud, aga ei ole korraldaja | 403 |
| viimane koht müüdi vahepeal ära | 409 |
| liiga palju päringuid | 429 |
| andmebaas ei vasta | 503 |

---

### 9. Seleta, miks 301 on ohtlikum kui 302.

301 tähendab püsivat ümberpaigutamist. Kliendid, brauserid ja vahemälud võivad
uue aadressi pikaks ajaks salvestada. 302 tähendab ajutist suunamist ja ei
muuda ressursi püsivat aadressi.

---

## Oodatav tulemus

POST tekitas kaks ostu. Sama PUT andis esmalt `200` ja seejärel aegunud märgise
tõttu `412`. Olekukoodid sisaldasid oma tähenduslikke päiseid `Location`,
`WWW-Authenticate`, `Allow` ja `Retry-After`.
