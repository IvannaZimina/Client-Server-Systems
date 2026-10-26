# Ülesanne 4 - küpsised, päritolu ja CORS

### 1. Sea viis küpsist ja vaata neid Application-paneelilt üle.

Server seadis järgmised küpsised:

```text
simple=1; Path=/
httponly=2; Path=/; HttpOnly
short=3; Path=/; Max-Age=10
same_site=4; Path=/; SameSite=Strict
cross_site=5; Path=/; SameSite=None; Secure
```

Küpsised kontrolliti brauseri Application-paneelilt.

---

### 2. Võrdle `document.cookie` sisu sellega, mida server oma nimekirjas näitab.

```text
document.cookie -> simple=1; same_site=4; short=3; cross_site=5
server näeb    -> simple=1; httponly=2; same_site=4; short=3; cross_site=5
```

Server nägi kõiki saadetud küpsiseid, kuid JavaScript ei näinud HttpOnly
küpsist.

---

### 3. Nimeta küpsis, mis on ÜHES nimekirjas ja puudub teisest.

`httponly=2` oli serveri nimekirjas, kuid puudus `document.cookie` loendist.
`HttpOnly` peidab küpsise JavaScripti eest, mitte serveri eest.

---

### 4. Seleta, miks istungimärgis ei kuulu `localStorage`-isse (C03 Ex5).

`localStorage` on JavaScriptile loetav. XSS-rünnaku korral võiks pahatahtlik
skript sealt istungimärgise varastada. HttpOnly küpsist JavaScript lugeda ei
saa, mistõttu sobib see serveripoolse istungi jaoks paremini.

---

### 5. VIHJE: `Max-Age=10` küpsis kaob kümne sekundiga — laadi leht uuesti ja vaata.

`short=3` määrati kümne sekundi pikkuse elueaga. Pärast kümmet sekundit ja
lehe uuesti laadimist küpsist enam ei olnud.

---

### 6. Küsi pordilt 3005 ilma CORS-ita: kirjuta Console-paneeli teade üles ja näita Network-paneelilt, et server VASTAS, kuigi leht vastust ei saanud.

Päring tehti teise päritoluga pordile `3005`. Console-paneel näitas CORS-i
veateadet ja `fetch` ei andnud vastust JavaScriptile. Network-paneel näitas
siiski, et server sai päringu ja vastas.

---

### 7. Saada PUT lubatud CORS-iga ja loe välja, mitu päringut brauser tegi.

Lubatud PUT-ile eelnes brauseri CORS-i eelkontroll:

```text
1. OPTIONS
2. PUT
```

Seega tegi brauser kokku kaks päringut.

---

### 8. Küsi 3005-lt `credentials`-iga ja kirjuta üles, KAS `SameSite=Strict` küpsis läks.

`credentials: "include"` korral saadeti küpsised, sealhulgas `SameSite=Strict`.
Pordid `3004` ja `3005` on erineva päritoluga, kuid sama saidiga, sest port ei
kuulu saidi määratlusse.

---

### 9. Seleta, mida HTTPS-i sertifikaat tõendab ja mida mitte, ja nimeta kolm asja, mis ilma HTTPS-ita ei tööta.

HTTPS-i sertifikaat tõendab sertifikaadis nimetatud hosti seost avaliku võtmega
ja võimaldab TLS-ühendust. See ei tõenda veebilehe omaniku ausust ega sisu
õigsust. Ilma HTTPS-ita ei saa kasutada:

1. krüpteeritud TLS-ühendust;
2. `Secure`-küpsist;
3. sertifikaadipõhist serveri autentimist.

---

## Oodatav tulemus

`HttpOnly` küpsis puudub `document.cookie` loendist, kuid server näeb seda.
Tavaline ristpäritolu päring blokeeritakse CORS-i tõttu, credentialed päring
saab lubatud CORS-i korral küpsised ja PUT-ile eelneb OPTIONS.
