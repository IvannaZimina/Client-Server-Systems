import { TEMPLATE } from "../materials/card-template.js";

// 6.1.
class TicketCard extends HTMLElement {
    static observedAttributes = ["sold-out"];
    #button;
    #onClick;

    constructor() {
        super();
        this.attachShadow({ mode: "open" }).append(TEMPLATE.content.cloneNode(true));
    }

    // 6.3.
    connectedCallback() {
        this.#button = this.shadowRoot.querySelector("button");
        this.#onClick = () => {
            this.dispatchEvent(
                new CustomEvent("ticket-seatmap-request", {
                    bubbles: true,
                    composed: true,
                    detail: { eventId: this.dataset.eventId },
                }),
            );
        };
        this.#button?.addEventListener("click", this.#onClick);
        this.updateButton();
    }

    // 6.3.
    disconnectedCallback() {
        if (this.#button && this.#onClick) {
            this.#button.removeEventListener("click", this.#onClick);
        }
        this.#button = null;
        this.#onClick = null;
    }

    attributeChangedCallback() {
        this.updateButton();
    }

    // 6.6.
    updateButton() {
        const button = this.#button ?? this.shadowRoot?.querySelector("button");
        if (!button) return;
        const soldOut = this.hasAttribute("sold-out");
        button.disabled = soldOut;
        button.textContent = soldOut ? "Välja müüdud" : "Vali kohad";
    }
}

// 6.2.
customElements.define("ticket-card", TicketCard);
console.info("ticket-card module loaded");
