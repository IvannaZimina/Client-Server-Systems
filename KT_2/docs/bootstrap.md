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

### Jõudluse mõõtmised (5000 kaarti)

| paigutus                 | aeg     |
| :----------------------- | :------ |
| ilma                     | 41,7 ms |
| content-visibility: auto | 22,8 ms |

### Valijate maksumus

| valija         | aeg      |
| :------------- | :------- |
| .kaart         | 0,238 ms |
| div            | 0,371 ms |
| * p            | 0,397 ms |
| #pesa .kaart p | 0,001 ms |

Kõik neli on alla millisekundi. Paigutus on mitu suurusjärku kallim — sinna tasub vaadata.  
Brauser loeb valijaid PAREMALT VASAKULE — sellest tuleneb reeglite täitmise kiirus.  