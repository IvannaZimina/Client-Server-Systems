# Ülesanne 4 - sündmused ja delegeerimine

### 1. Pane ÜKS `click`-kuulaja `#events` elemendile, mitte igale nupule

* Tegevuste jaoks lisati `#events` elemendile üks delegeeritud `click`-kuulaja. Iga nupu jaoks eraldi tegevuskuulajaid ei lisatud:

  ```javascript
  list.addEventListener("click", handleEventClick);
  ```

  Sündmuste delegeerimine vähendab tegevuskuulajate arvu ja võimaldab töötada ka hiljem loodud nuppudega. Capture- ja bubble-faasi mõõtmine toimub etteantud `capture-tool`-i kaudu.

---

### 2. Leia `closest("button[data-action]")` ja välju vaikselt, kui teda ei ole

* Klõpsatud elemendi lähim sobiv nupp leitakse meetodiga `closest`:

  ```javascript
  const button = event.target.closest("button[data-action]");
  ```

  Kui klõps toimub nupu sees oleval elemendil, leitakse ikkagi õige tegevusnupp.

---

### 3. Loe rea `id` data-atribuudist ja suuna tegevus õigele funktsioonile

* Sündmuse identifikaator loetakse `data-id` atribuudist, tegevus loetakse `data-action` atribuudist ning vastav funktsioon leitakse `actions` objektist:

  ```javascript
  const id = Number(item?.dataset.id);
  const action = actions[button.dataset.action];
  ```

  Tegevused `details` ja `reserve` logivad tulemuse konsooli.

---

### 4. Jookse `capture-tool`-i ja kirjuta üles, mis järjekorras faasid käivitusid

* Käivitati etteantud `materials/capture-tool.js`. Klõpsu järel saab `readLog()` abil kontrollida sündmuse liikumist capture-, target- ja bubble-faasis.

---

### 5. VIHJE: `e.target` on KLÕPSATUD element, `e.currentTarget` on kuulaja omanik

* `event.target` tähistab tegelikult klõpsatud elementi. `event.currentTarget` tähistaks elementi, mille külge kuulaja on lisatud. Delegeerimise korral kasutatakse tegevuse leidmiseks `event.target` väärtust ja `closest`-meetodit.

  Tulemuste kustutamiseks lisati nupule `#clear` kuulaja, mis taastab otsingu algväärtuse ja renderdab kogu nimekirja uuesti.

---

### 6. Kuula vormi `submit`-sündmust, MITTE nupu `click`-i, ja kutsu `preventDefault`

* Vormile `#search` lisati üks `submit`-kuulaja. Vaikimisi lehe uuesti laadimine peatatakse:

  ```javascript
  event.preventDefault();
  ```

  Vormi saatmisel uuendatakse otsinguteksti, sortimise välja ja sortimise suunda.

---

### 7. Loe väljad `Object.fromEntries(new FormData(form))` abil

* Vormi väljad loetakse üheks objektiks:

  ```javascript
  const data = Object.fromEntries(new FormData(form));
  ```

  Seejärel kasutatakse väärtusi oleku uuendamiseks.

---

### 8. Kontrolli `checkValidity()` ja näita vead `reportValidity()`-ga

* Enne vormi andmete töötlemist kontrollitakse vormi kehtivust:

  ```javascript
  if (!form.checkValidity()) {
      form.reportValidity();
      return;
  }
  ```

  Vigase vormi korral kuvatakse brauseri standardne valideerimisteade ja töötlemine lõpetatakse.

---

### 9. Lisa otsinguväljale `input`-kuulaja 250 ms viivitusega

* Otsinguvälja `input`-sündmus käivitab `setTimeout`-iga 250 millisekundi pikkuse viivituse. Eelmine ootel taimer tühistatakse `clearTimeout`-iga:

  ```javascript
  clearTimeout(handleSearchInput.timer);
  handleSearchInput.timer = setTimeout(() => {
      setState({ search: event.target.value });
      renderEvents();
  }, 250);
  ```

  Nii ei renderdata nimekirja iga klahvivajutuse järel, vaid pärast lühikest pausi.

---

## Oodatav tulemus ja kontrollnäited

### Faaside järjekord

`#events`-is oleva nupu klõpsamisel kasutatakse ühte delegeeritud tegevuskuulajat ning `data-action` järgi käivitatakse õige tegevus. Capture- ja bubble-faasi mõõtelogi lisab etteantud tööriist.

```text
capture -> target -> bubble
```

### Vormi tulemus

Vormi saatmisel jääb leht samaks, otsing ja sortimine uuendatakse ning kuvatakse filtreeritud sündmuste arv elemendis `#count`.

### Otsingu tulemus

```text
250 ms pärast viimast sisendimuutust:
search -> olek -> forView -> #events
```
