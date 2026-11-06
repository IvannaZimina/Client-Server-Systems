# C06 — Ülesanne 3: Express — marsruudid ja vahevara

### 1. Päringu ID määramine

Failis `server/middleware.js` loodi funktsioon `requestId()`.
Middleware kontrollib, kas klient saatis päise `X-Request-Id`.
Kui klient saatis oma ID, kasutatakse seda väärtust.
Kui päis puudub või on tühi, genereeritakse uus ID funktsiooniga `randomUUID()`.
ID salvestatakse `req.id` sisse ja lisatakse vastuse päisesse `X-Request-Id`.
Nii saab iga päringu siduda vastava logikirjega.

---

### 2. JSON-päringu keha suuruse piirang

Failis `server/app.js` kasutatakse middleware'i:
```js
app.use(express.json({ limit: '10kb' }));
```

See loeb JSON-päringu keha ja salvestab andmed `req.body` sisse.
Keha suuruse piir on 10 kB.
Kui päringu keha on sellest suurem, tekib viga koodiga `413`.
Viga liigub edasi üldisesse veakäsitlejasse.
Pärast liiga suurt päringut saab server uusi päringuid edasi töödelda.

---

### 3. Vigade edastamine üldisesse veakäsitlejasse

Failis `server/app.js` lisati etteantud `errorHandler()` pärast kõiki marsruute ja `notFound` käsitlejat.
Kasutatakse funktsiooni `simpleResponse()`, mis määrab veale vastava HTTP-koodi ja vastuse keha.
Veakäsitleja võtab vastu neli parameetrit: `err`, `req`, `res` ja `next`.
Express tunneb veakäsitleja ära nelja parameetri järgi.
Asünkroonsete marsruutide vigade edastamiseks kasutatakse etteantud funktsiooni `wrap()`.
Näiteks vigane sündmuse ID tekitab vea koodiga `400`, mis jõuab üldisesse veakäsitlejasse.
Kui vastuse päised on juba saadetud, antakse viga edasi Expressi järgmisele veakäsitlejale.

---

### 4. Middleware'ide ja marsruutide järjekord

Rakenduse middleware'id ja marsruudid on failis `server/app.js` järgmises järjekorras:
1. `requestId()` — määrab päringule ID ja lisab selle vastuse päisesse.
2. `logger(log)` — mõõdab päringu töötlemise aega ja kirjutab logi pärast vastuse lõppu.
3. `express.json({ limit: '10kb' })` — loeb JSON-andmed ja kontrollib keha suurust.
4. `express.static()` — võimaldab väljastada staatilisi faile.
5. `/api/events` — sündmuste marsruuter.
6. `/api/orders` — tellimuste marsruuter.
7. `/api/health` — serveri tervisekontroll.
8. `notFound` — tagastab `404`, kui ükski marsruut ei sobi.
9. `errorHandler()` — käsitleb rakenduse käigus tekkinud vigu.

Järjekord on oluline, sest Express töötleb middleware'e ja marsruute nende lisamise järjekorras.

---

### 5. Päringu töötlemise aja mõõtmine

Failis `materials/logger.js` on etteantud logimise näidis.
Päringu alguses salvestatakse aeg funktsiooniga `process.hrtime.bigint()`.
Vastuse lõppu kuulatakse sündmusega `res.on('finish')`.
Selle sündmuse käivitumisel arvutatakse päringu töötlemiseks kulunud aeg millisekundites.
Aega ei mõõdeta `next()` ümber, sest `next()` annab juhtimise kohe järgmisele ahela lülile ega oota vastuse valmimist.
Logisse kirjutatakse päringu meetod, URL, vastuse staatus ja töötlemise aeg.

---

### 6. Sündmuste ja tellimuste marsruuterid

Failis `server/routes.js` loodi kaks eraldi Expressi marsruuterit.

`eventsRouter(store)` käsitleb sündmuste päringuid:

- `GET /api/events` — tagastab sündmuste nimekirja.
- `GET /api/events?search=...` — võimaldab otsida sündmusi otsingusõna järgi.
- `GET /api/events/popular` — tagastab populaarse sündmuse.
- `GET /api/events/:id` — tagastab ühe sündmuse ID järgi.
- `PATCH /api/events/:id` — muudab sündmuse andmeid.

`ordersRouter(store)` käsitleb tellimusi:

- `GET /api/orders` — tagastab tellimuste nimekirja.
- `POST /api/orders` — loob uue tellimuse.
- `DELETE /api/orders/:id` — kustutab tellimuse.

Andmete hoidmiseks kasutatakse etteantud `materials/store.js` faili.
See on mälupõhine andmeait ja eraldi andmebaasiühendust ei ole vaja.

---

### 7. Konkreetse ja parameetrilise marsruudi järjekord

Marsruut `GET /popular` lisati enne marsruuti `GET /:id`.
Express valib esimese sobiva marsruudi, mitte tingimata kõige täpsema.
Kui `/:id` oleks enne, käsitleks Express sõna `popular` ID väärtusena.
Seetõttu tagastatakse `/api/events/popular` päringule populaarne sündmus, mitte vigase ID viga.
Kontrollimisel tagastatakse üks sündmus nimega `Talveball`.

---

### 8. HTTP vastusekoodid

Marsruutides kasutatakse järgmisi vastusekoode:
- `201 Created` — tellimus loodi edukalt. Vastuses on tellimuse andmed ja päis `Location`, mis sisaldab loodud tellimuse aadressi.
- `204 No Content` — tellimus kustutati. Vastuse keha on tühi.
- `400 Bad Request` — sündmuse ID ei ole korrektne number.
- `404 Not Found` — sündmust, tellimust või marsruuti ei leitud.
- `409 Conflict` — sündmus on välja müüdud või vabu kohti ei jätku.
- `422 Unprocessable Content` — tellimuse sisendandmed on vigased või sündmust ei ole olemas.

Staatus `409` tähistab olukorda, kus sisendandmed on korrektsed, kuid olemasolev seisund ei võimalda toimingut teha.

---

### 9. Marsruutide kontrollimine curl-käskudega

Käsitsi kontrollimiseks käivitatakse server käsuga `node server/start.js`.
Sündmuste nimekirja päring:
```cmd
curl.exe -i http://localhost:3006/api/events
```

Sündmuste otsimine:
```cmd
curl.exe -i "http://localhost:3006/api/events?search=kontsert"
```

Uue tellimuse loomine — `201` ja `Location`:
```cmd
curl.exe -i -X POST http://localhost:3006/api/orders -H "Content-Type: application/json" -d "{\"event\":3,\"qty\":2}"
```

Vigased tellimuse andmed — `422`:
```cmd
curl.exe -i -X POST http://localhost:3006/api/orders -H "Content-Type: application/json" -d "{\"event\":\"x\"}"
```

Välja müüdud sündmus — `409`:
```cmd
curl.exe -i -X POST http://localhost:3006/api/orders -H "Content-Type: application/json" -d "{\"event\":2,\"qty\":1}"
```

Tellimuse kustutamine — `204`:
```cmd
curl.exe -i -X DELETE http://localhost:3006/api/orders/9001
```

Teine kustutamine — `404`:
```cmd
curl.exe -i -X DELETE http://localhost:3006/api/orders/9001
```

Kustutamise käskudes kasutatakse tellimuse ID-d, mis saadi tellimuse loomise vastusest. Kui saadud ID erineb näites kasutatud väärtusest `9001`, asendatakse see tegeliku ID-ga.

Olematu sündmus — `404`:
```cmd
curl.exe -i http://localhost:3006/api/events/99
```

Liiga suure päringu kontrollimiseks luuakse esmalt 20 000 märgiga JSON-fail:
```cmd
node -e "require('fs').writeFileSync('large.json', JSON.stringify({event:3,qty:1,note:'x'.repeat(20000)}))"
```

Seejärel saadetakse see serverile:
```cmd
curl.exe -i -X POST http://localhost:3006/api/orders -H "Content-Type: application/json" --data-binary "@large.json"
```

Oodatav vastuse kood on `413`.
Pärast kontrolli võib faili kustutada:

```cmd
del large.json
```

Päringu ID kontrollimiseks:
```cmd
curl.exe -i http://localhost:3006/api/health
```

Kliendi enda ID kontrollimiseks:
```cmd
curl.exe -i -H "X-Request-Id: minu-id" http://localhost:3006/api/health
```

Vastuse päises peab olema `X-Request-Id: minu-id`.

---

### Süstitud defektid ja nende tagajärjed

| Defekt                          | Tagajärg                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `express.json()` eemaldati      | `req.body` on `undefined` ja kaheksa kontrolli ebaõnnestuvad.                         |
| `/popular` marsruut eemaldati   | `popular` käsitletakse parameetrina `:id`, seega populaarse sündmuse päring ei tööta. |
| `requestId()` eemaldati         | `X-Request-Id` puudub vastuse päisest ja päringu ID ei ole saadaval.                  |
| `204` asendati `200`-ga         | Kustutamise vastuse staatus ei vasta nõudele.                                         |
| Kohtade arvu kontroll eemaldati | Välja müüdud sündmusele saab tellimuse teha ja ülemüük läheb läbi.                    |

### Oodatav tulemus

Kontrollimiseks kasutatakse etteantud faili `materials/check-app.js`.
Automaatse kontrolli tulemus oli `27 kontrolli OK`.
Töö näitab, et Expressi rakenduse käitumine sõltub middleware'ide ja marsruutide järjekorrast ning õigesti valitud HTTP vastusekoodidest.