import { forView, readState, setState } from "./view.js";
import { readLog } from "../materials/capture-tool.js";

const events = [
    { id: 1, name: "Jazz Night", venue: "Salme", start: "2026-11-06", free: 18 },
    { id: 2, name: "Rock Concert", venue: "Tondiraba", start: "2026-11-12", free: 0 },
    { id: 3, name: "Autumn Theatre", venue: "Vaba Lava", start: "2026-11-20", free: 42 },
];

const actions = {
    // 4.3.
    details(id) {
        const event = events.find((item) => item.id === id);
        if (event) {
            console.log("Event details:", event);
        }
    },
    reserve(id) {
        const event = events.find((item) => item.id === id);
        if (event && event.free > 0) {
            console.log(`Reservation selected for event ${id}`);
        }
    },
};

// 4.1.
function renderEvents() {
    const list = document.querySelector("#events");
    const count = document.querySelector("#count");
    if (!list || !count) return;

    count.textContent = "";
    const { rows } = forView(readState());
    list.replaceChildren(
        ...rows.map((event) => {
            const item = document.createElement("li");
            item.className = "event-card";
            item.dataset.id = String(event.id);
            const title = document.createElement("h3");
            title.textContent = event.name;

            const meta = document.createElement("p");
            meta.textContent = `${event.venue} · ${event.start} · ${event.free} vaba kohta`;

            const detailsButton = document.createElement("button");
            detailsButton.type = "button";
            detailsButton.dataset.action = "details";
            detailsButton.textContent = "Vaata";

            const reserveButton = document.createElement("button");
            reserveButton.type = "button";
            reserveButton.dataset.action = "reserve";
            reserveButton.disabled = event.free === 0;
            reserveButton.textContent = "Broneeri";

            item.append(title, meta, detailsButton, reserveButton);
            return item;
        }),
    );
    count.textContent = `${rows.length} sündmust`;
}

// 4.2.
function handleEventClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const item = button.closest("[data-id]");
    const id = Number(item?.dataset.id);
    const action = actions[button.dataset.action];
    if (item && Number.isInteger(id) && action) {
        action(id);
        console.log(readLog());
    }
}

// 4.3.
function handleSearchSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = Object.fromEntries(new FormData(form));
    setState({
        search: String(data.search ?? ""),
        sort: String(data.sort ?? "start"),
        dir: String(data.dir ?? "asc"),
    });
    renderEvents();
}

// 4.9.
function handleSearchInput(event) {
    clearTimeout(handleSearchInput.timer);
    handleSearchInput.timer = setTimeout(() => {
        setState({ search: event.target.value });
        renderEvents();
    }, 250);
}

// 4.1.
export function initEvents() {
    const list = document.querySelector("#events");
    const form = document.querySelector("#search");
    const input = document.querySelector("#search-text");
    const clear = document.querySelector("#clear");

    if (!list || !form || !input || !clear) return;

    list.addEventListener("click", handleEventClick);
    form.addEventListener("submit", handleSearchSubmit);
    input.addEventListener("input", handleSearchInput);
    clear.addEventListener("click", () => {
        setState({ search: "", sort: "start", dir: "asc" });
        form.reset();
        renderEvents();
    });

    setState({
        events,
        sort: "start",
        dir: "asc",
        search: "",
        loading: false,
    });
    renderEvents();
}