// Teeb kindlaks, milline ValidityState lipp on katki, ja tagastab vastava veateate
export function teade(vali) {
    const v = vali.validity;

    if (v.valueMissing) {
        return "See vali on kohustuslik.";
    }
    if (v.typeMismatch || v.patternMismatch) {
        if (vali.type === "email") return "Kontrolli e-posti aadressi kuju.";
        return "Kontrolli sisestatud väärtuse kuju.";
    }
    if (v.tooShort) {
        return `Vähemalt ${vali.minLength} tähemärki.`;
    }
    if (v.rangeOverflow) {
        return `Suurim väärtus on ${vali.max}.`;
    }
    if (v.rangeUnderflow) {
        return `Väikseim väärtus on ${vali.min}.`;
    }
    if (vali.validationMessage) {
        return vali.validationMessage;
    }
    return "Tundmatu viga.";
}

// Kirjutab veateate vastavasse veakasti ja seab aria-invalid atribuudi
export function naita(vali) {
    const vigaKast = document.getElementById(vali.id + "-viga");
    if (!vigaKast) return;

    if (vali.validity.valid) {
        vigaKast.textContent = "";
        vali.removeAttribute("aria-invalid");
    } else {
        vigaKast.textContent = teade(vali);
        vali.setAttribute("aria-invalid", "true");
    }
}

// Ristvali: kahe e-posti aadressi võrdlus
export function kontrolliKordust(a, b) {
    if (b.value && a.value !== b.value) {
        b.setCustomValidity("E-posti aadressid ei ühti.");
    } else {
        b.setCustomValidity("");
    }
}

// Sündmuste haldurid ja seadistus
document.addEventListener("DOMContentLoaded", () => {
    const vorm = document.querySelector("form");
    if (!vorm) return;

    const valjad = vorm.querySelectorAll("input, textarea, select");
    const epost1 = vorm.querySelector("#email");
    const epost2 = vorm.querySelector("#email2");

    valjad.forEach((vali) => {
        // Viga tekkib blur-il (kui väljalt liigutakse ära)
        vali.addEventListener("blur", () => {
            if (epost1 && epost2 && (vali === epost1 || vali === epost2)) {
                kontrolliKordust(epost1, epost2);
                naita(epost2);
            }
            naita(vali);
        });

        // Viga kaob input-il, aga uuendatakse ainult siis, kui viga on juba ees
        vali.addEventListener("input", () => {
            if (epost1 && epost2 && (vali === epost1 || vali === epost2)) {
                kontrolliKordust(epost1, epost2);
                if (epost1.getAttribute("aria-invalid") === "true") {
                    naita(epost1);
                }
                if (epost2.getAttribute("aria-invalid") === "true") {
                    naita(epost2);
                }
            }
            if (vali.getAttribute("aria-invalid") === "true") {
                naita(vali);
            }
        });
    });

    // Saatmisel peatame, näitame kõiki vigu ja viime fookuse ESIMESE vea peale
    vorm.addEventListener("submit", (e) => {
        if (epost1 && epost2) {
            kontrolliKordust(epost1, epost2);
        }

        let esimeneViga = null;

        valjad.forEach((vali) => {
            naita(vali);
            if (!vali.validity.valid && !esimeneViga) {
                esimeneViga = vali;
            }
        });

        if (esimeneViga) {
            e.preventDefault();
            esimeneViga.focus();
        }
    });
});
