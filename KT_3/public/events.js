import { forView, readState, setState } from "./view.js";
import { readLog } from "../materials/capture-tool.js";

const events = [
    { id: 1, name: "Jazz Night", venue: "Salme", start: "2026-11-06", free: 18 },
    { id: 2, name: "Rock Concert", venue: "Tondiraba", start: "2026-11-12", free: 0 },
    { id: 3, name: "Autumn Theatre", venue: "Vaba Lava", start: "2026-11-20", free: 42 },
];

const actions = {
    // Task 4.3: use the event id to call the correct action.
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

function renderEvents() {
    const list = document.querySelector("#events");
    const count = document.querySelector("#count");
    if (!list || !count) return;

    // Task 4.1: render all event rows inside one delegated container.
    const { rows } = forView(readState());
    list.replaceChildren(
        ...rows.map((event) => {
            const item = document.createElement("li");
            item.className = "event-card";
            // Task 4.3: save the event id in a data attribute.
            item.dataset.id = String(event.id);
            item.innerHTML = `
                <h3>${event.name}</h3>
                <p>${event.venue} · ${event.start} · ${event.free} vaba kohta</p>
                <button type="button" data-action="details">Vaata</button>
                <button type="button" data-action="reserve" ${event.free === 0 ? "disabled" : ""}>Broneeri</button>
            `;
            return item;
        }),
    );
    count.textContent = `${rows.length} sündmust`;
}

function handleEventClick(event) {
    // Task 4.1: one click listener handles all current and future buttons.
    // Task 4.2: find the closest action button.
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const item = button.closest("[data-id]");
    // Task 4.3: read the id and select the matching action.
    const id = Number(item?.dataset.id);
    const action = actions[button.dataset.action];
    if (item && Number.isInteger(id) && action) {
        action(id);
    }
}

function handleSearchSubmit(event) {
    // Task 4.6: handle form submit instead of a button click.
    event.preventDefault();
    const form = event.currentTarget;
    // Task 4.8: stop and show the browser validation message for invalid data.
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Task 4.7: convert all form fields into one object.
    const data = Object.fromEntries(new FormData(form));
    setState({
        search: String(data.search ?? ""),
        sort: String(data.sort ?? "start"),
        dir: String(data.dir ?? "asc"),
    });
    renderEvents();
}

function handleSearchInput(event) {
    // Task 4.9: wait 250 ms after the last input event.
    clearTimeout(handleSearchInput.timer);
    handleSearchInput.timer = setTimeout(() => {
        setState({ search: event.target.value });
        renderEvents();
    }, 250);
}

export function initEvents() {
    const list = document.querySelector("#events");
    const form = document.querySelector("#search");
    const input = document.querySelector("#search-text");
    const clear = document.querySelector("#clear");

    if (!list || !form || !input || !clear) return;

    // Task 4.1: delegate clicks from the #events container.
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