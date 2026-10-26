import { TEMPLATE } from "../materials/card-template.js";

class TicketCard extends HTMLElement {
    static observedAttributes = ["sold-out"];
    #button;

    constructor() {
        super();
        // Task 6.1: create a shadow root and clone the provided template.
        this.attachShadow({ mode: "open" }).append(TEMPLATE.content.cloneNode(true));
    }

    connectedCallback() {
        // Task 6.3: run setup when the element is added to the DOM.
        this.updateButton();
        this.#button = this.shadowRoot.querySelector("button");
        this.#button.addEventListener("click", () => {
                this.dispatchEvent(
                    new CustomEvent("ticket-seatmap-request", {
                        bubbles: true,
                        composed: true,
                        detail: { eventId: this.dataset.eventId },
                    }),
                );
            });
    }

    disconnectedCallback() {
        // Task 6.3: clean up when the element is removed from the DOM.
        this.#button?.replaceWith(this.#button.cloneNode(true));
        this.#button = null;
    }

    attributeChangedCallback() {
        // Task 6.4: update the component when an observed attribute changes.
        this.updateButton();
    }

    updateButton() {
        const button = this.#button ?? this.shadowRoot?.querySelector("button");
        if (!button) return;
        const soldOut = this.hasAttribute("sold-out");
        button.disabled = soldOut;
        button.textContent = soldOut ? "Välja müüdud" : "Vali kohad";
    }
}

customElements.define("ticket-card", TicketCard);

// Task 6.2: this file is an ES module and is loaded after defer/async examples.
console.info("ticket-card module loaded");
