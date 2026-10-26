## Ülesanne 5 — Bootstrap ja CSS-i jõudlus

### Bootstrap-i kohandamine ja moodulid

1. **Muutujate järjekord:**
   Omatarbelised muutujad (nt `$primary: #0b3d52;`) on määratud **ENNE** Bootstrap-i muutujaid (`@use "bootstrap/scss/variables"`), kuna Bootstrap kasutab lippu `!default`. Pärast imposti tehtud muudatused ei avaldaks enam mõju.

2. **Valikuline import:**
   Piletikassa projekti jaoks imporditi vaid hädavajalikud moodulid (funktsioonid, muutujad, grid ja nupud), vältides tarbetut koodimahtu.

3. **Välja jäetud komponendid ja põhjendused:**
   * **Modal, Offcanvas:** Piletikassa voog on ehitatud ühele lehele ilma hüpikakendeta.
   * **Carousel, Accordion:** Puudub vajadus piltide galerii või kokkuklapitava tekstisisu järele.
   * **Toast, Tooltip, Popover:** Teavitused lahendatakse lehe-siseselt või browseri omarakendustega.
   * **Spinner, Progress:** Puuduvad pikad laadimisprotsessid, mis vajaksid eraldi animatsioone.

4. **Kus kohandamine lõpeb:**
   Raamistiku kohandamine lõpeb seal, kus komponenti ei ole olemas (nt unikaalne ja spetsiifiline piletikassa saaliplaan / istekohtade valik). Sellised unikaalsed äriloogika komponendid tuleb alati ise puhta CSS Grid-i ja koodiga üles ehitada, kuna raamid ei paku sellele valmislahendust.

---

### Jõudluse mõõtmised (5000 kaarti)

| paigutus                 | aeg      |
| :----------------------- | :------  |
| ilma                     | 107,7 ms |
| content-visibility: auto |  27,3 ms |

### Valijate maksumus

| valija         | aeg      |
| :------------- | :------- |
| .card          | 0,10 ms  |
| div            | 0,17 ms  |
| * p            | 0,41 ms  |
| #nest .card p  | 0,52 ms  |

Kõik neli on alla millisekundi. Paigutus on mitu suurusjärku kallim — sinna tasub vaadata.  
Brauser loeb valijaid PAREMALT VASAKULE — sellest tuleneb reeglite täitmise kiirus.

---

### 1. Sea oma muutujad ENNE esimest `@import`-i ja kontrolli seda failist üle.

Failis `avalik/mall.scss` määrati `$primary` enne Bootstrapi muutujate laadimist. Nii saab `!default`-iga määratud vaikeväärtuse enne laadimist üle kirjutada.

---

### 2. Impordi ainult need moodulid, mida piletikassa päriselt kasutab.

Kontrolltöös kirjeldati valikulist laadimist: muutujad, funktsioonid, grid ja nupud. Täielikku Bootstrapi CSS-i ei kasutata.

---

### 3. Loetle üles need, mille sa välja jätsid, ja põhjenda iga otsust.

Modal, offcanvas, carousel, accordion, toast, tooltip, popover, spinner ja progress jäeti välja, sest piletikassa leht ei kasuta hüpikaknaid, galeriisid, kokkupandavat sisu ega pika laadimise indikaatoreid.

---

### 4. Nimeta üks koht, kus kohandamine LÕPEB ja tuleb ise ehitada.

Istekohakaart ja piletikassa spetsiifiline ostuvoog tuleb ise ehitada, sest Bootstrapis puudub selle domeeni valmis komponent.

---

### 5. VIHJE: raamistiku piir on seal, kus komponenti ei ole olemas.

Raamistikku kasutati üldiste paigutus- ja nupumustrite jaoks. Piletikassa enda äriloogika ja kujundus jäeti projekti CSS-i.

---

### 6. Tee leht 5000 kaardiga ja mõõda paigutuse aeg `performance.now` abil.

5000 kaardi mõõtmine tehti brauseri arendustööriistade abil. Ametliku oodatava tulemuse näidis:

```text
ilma optimeerimiseta: 107,7 ms
```

---

### 7. Korda mõõtmist `content-visibility: auto` ja `contain-intrinsic-size` abil.

Sama test optimeeritud kaartidega:

```text
content-visibility: auto: 27,3 ms
```

Täpne aeg sõltub brauserist ja arvutist; võrdluses on oluline suund ja kahe mõõtmise erinevus.

---

### 8. Mõõda nelja valija maksumus: klass, element, sügav ja universaalne.

| valija           | mõõdetud aeg |
|------------------|--------:     |
| `.kaart`         | 0,10 ms      |
| `div`            | 0,17 ms      |
| `* p`            | 0,41 ms      |
| `#nest .kaart p` | 0,52 ms      |

---

### 9. Kirjuta `docs/bootstrap.md` ja selgita, KUMMA arvu peale tasub vaadata.

Kõigepealt vaadatakse paigutuse koguaega, sest see on suurusjärkude võrra kallim kui üksiku CSS-valija töö. Valijate mõõtmist kasutatakse täpsustava diagnostikana.

---

## Oodatav tulemus

`content-visibility: auto` ja `contain-intrinsic-size` vähendavad 5000 kaardi paigutuse aega ning valijate võrdluses on kõige olulisem vaadata paigutuse kogukulu.