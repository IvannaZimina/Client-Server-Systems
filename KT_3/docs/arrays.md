# Ülesanne 2 - massiivid ja objektid deklaratiivselt

## Tühi valik - MÕÕDETUD oma funktsioonis
    allSoldOut([])          -> false
    allSoldOut([{seats: 2, sold: 2}]) -> true

Ainult every-ga oleks esimene rida true - every([]) on tõene.

## sort - kaks lõksu ühes meetodis
    [10, 9, 1].sort()       -> [1, 10, 9]    sordib SÕNEDENA
    sort MUUDAB algset massiivi              -> tee koopia

## ?? ei ole || uuem nimi
    seatsText({seats: 0})   -> "0 kohta"     s.seats ?? "?" säilitab nulli
    s.price || 18           -> tasuta sündmus läheb täishinda

JSON.stringify: null JÄÄB, undefined KAOB täielikult