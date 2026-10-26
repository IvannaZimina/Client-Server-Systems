# KT_4 — HTTP protokoll praktikas

Katsetusala on aadressidel `http://localhost:3004` ja
`http://localhost:3005`. Kontrollskriptid käivitatakse KT_4 juurkaustast:

```text
node materials/check-cache.js
node materials/check-representation.js
```
---

## Töö osad

- [Ülesanne 1 — päringu ja vastuse anatoomia](docs/anatomy.md)
- [Ülesanne 2 — meetodid ja olekukoodid](docs/methods.md)
- [Ülesanne 3 — andmete edastamise viisid](docs/transfer.md)
- [Ülesanne 4 — küpsised, päritolu ja CORS](docs/origin.md)
- [Ülesanne 5 — vahemälu ja tingimuslikud päringud](docs/cache.md)
- [Ülesanne 6 — sisu läbirääkimine ja osaline sisu](docs/representation.md)

`server/cache.js` ja `server/representation.js` sisaldavad kahe koodiülesande
funktsioone. `server/range.js` ja `server/mime-match.js` on õpetaja antud
abifailide koopiad, mida kontrollid impordivad.
