# Ülesanne 3 - DOM kui puu: olek -> vaade

## Nimekirja renderdamine - 2000 rida
| viis                     | aeg     |
| ------------------------ | ------- |
| tsüklis appendChild      | 1.71 ms |
| replaceChildren(...rows) | 0.48 ms |
| DocumentFragment         | 1.81 ms |

Vahe on protsentides, MITTE kordades - brauser pakib paigutuse kokku.

## Elav ja staatiline kollektsioon - kümme elementi, tsükkel eemaldab
| kollektsioon                | eemaldas | jäi alles |
| --------------------------- | -------- | --------- |
| elav getElementsByClassName | 5        | 5         |
| staatiline querySelectorAll | 10       | 0         |

Elav kollektsioon lüheneb keset tsüklit ja iga teine element jääb vahele.