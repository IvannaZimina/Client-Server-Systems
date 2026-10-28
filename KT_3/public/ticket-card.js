import { TEMPLATE } from "../materials/card-template.js";

// 6.1.
class TicketCard extends HTMLElement {
    // 6.4. Observed attributes
    static observedAttributes = ["sold-out"];
    // 6.5.
    #button;
    #onClick;

    constructor() {
        super();
        // 6.1.
        this.attachShadow({ mode: "open" }).append(
            TEMPLATE.content.cloneNode(true),
        );
    }

    // 6.3.
    connectedCallback() {
        this.#button = this.shadowRoot.querySelector("button");
        this.#onClick = () => {
            // 6.8.
            this.#button.dispatchEvent(
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

    // 6.4.
    attributeChangedCallback() {
        this.updateButton();
    }

    // 6.4.
    updateButton() {
        const button = this.#button ?? this.shadowRoot?.querySelector("button");
        if (!button) return;
        const soldOut = this.hasAttribute("sold-out");
        button.disabled = soldOut;
        button.textContent = soldOut ? "Välja müüdud" : "Vali kohad";
    }
}

// 6.1.
customElements.define("ticket-card", TicketCard);

// 6.2.
console.info("ticket-card module loaded");
