## Ülesanne 3 — Kaskaad, kihid ja disainižetoonid

### Spetsiifilisuse tabel
| spetsiifilisus | selektor / märkus                |
| :------------- | :------------------------------- |
| `0-1-0`        | `.valja` (raamistik)             |
| `0-1-0`        | `.valja` (meie) — SAMA           |
| `0-2-0`        | `.leht .valja`                   |
| `0-0-0`        | `:where(h1, h2, h3)` (lahtestus) |
| `0-0-1`        | `:is(h2, h3)` (rühm)             |
| `0-2-1`        | `.kaardid > li:not(...)`         |
| `1-1-0`        | `#ost .valja`                    |

### Miks kiht asendab !important-i
Kihtide järjekord (kaskaadikihid) võimaldab määrata reeglite prioriteete struktuurselt — hilisem kiht kirjutab varasema üle isegi siis, kui varasemal on suurem spetsiifilisus. See lahendab stiilide konflikte puhtalt ja loogiliselt, muutes `!important` kasutamise enamikul juhtudest tarbetuks.

### Oma näide — Piletikassa teema

Projektis on viis kihti: `alused`, `raamistik`, `komponendid`, `meie` ja `erand`.
Fail `avalik/kihid.css` hoiab disainižetoone:

* `--pinnad`, `--pind-teine` ja `--tekst` määravad pinna ja teksti värvid.
* `--jooned` määrab neutraalse välja ja kaardi piiri.
* `--rõhk` määrab tellimisnupu ja linkide sooja aktsentvärvi.
* `--raadius` ja `--samm` hoiavad komponentide kuju ja vahed ühtsed.

Sinine 2 px raam eemaldati. `.valja` kasutab nüüd `--jooned` värvi ja `--raadius` väärtust, sest väli ei pea olema fookuses, et saada tugevat sinist äärist.

### Teema valimine

Mõlemal lehel on nupp `Kasuta tumedat teemat` / `Kasuta heledat teemat`. `avalik/teema.js`:

1. kasutab vaikimisi kasutaja `prefers-color-scheme` eelistust;
2. lubab kasutajal teemat nupuga muuta;
3. kirjutab valiku `data-teema` atribuudiks;
4. salvestab valiku `localStorage` abil järgmiseks külastuseks.

Kasutaja valik võidab süsteemi eelistuse, sest `[data-teema="hele"]` ja `[data-teema="tume"]` paiknevad pärast `prefers-color-scheme` reegleid.