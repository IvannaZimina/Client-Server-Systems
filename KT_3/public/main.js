// public/main.js
import { setState, readState, forView } from "./view.js";
import { runPerformanceBenchmarks, runCollectionTests } from "./perf.js";
import { initEvents } from "./events.js";
import { KEY, VERSION, read, remove, save } from "./draft.js";
import "./ticket-card.js";

// 1. Initial state setup
setState({
    events: [
        { id: 1, name: "Jazz Night", venue: "Salme", start: "2026-11-06", free: 18 },
        { id: 2, name: "Rock Concert", venue: "Tondiraba", start: "2026-11-12", free: 0 },
        { id: 3, name: "Autumn Theatre", venue: "Vaba Lava", start: "2026-11-20", free: 42 },
    ],
    search: "",
});

// 2. Render function (State -> View)
function render() {
    const { rows } = forView(readState());
    const list = document.getElementById("event-list");

    if (!list) return;
    list.innerHTML = "";

    for (const event of rows) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${event.name} (${event.venue})`;
        list.appendChild(li);
    }
}

// 3. Search input listener (setState -> render)
const searchInput = document.getElementById("search-input");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        setState({ search: e.target.value });
        render();
    });
}

// Run performance benchmarks and collection tests
runPerformanceBenchmarks();
runCollectionTests();

// Initial render
render();
initEvents();

function showStorageResults() {
    const data = { search: "jazz", sort: "start" };
    const saveResult = save(data);
    const readResult = read();

    document.getElementById("storage-key").textContent = KEY;
    document.getElementById("storage-save").textContent = String(saveResult);
    document.getElementById("storage-read").textContent = JSON.stringify(readResult);

    let versionResult;
    try {
        localStorage.setItem(KEY, JSON.stringify({ version: VERSION + 1, data }));
        versionResult = read() === null ? "null (old data rejected)" : "error";
    } catch {
        versionResult = "storage unavailable";
    }
    document.getElementById("storage-version").textContent = versionResult;

    let jsonResult;
    try {
        localStorage.setItem(KEY, "{broken json");
        jsonResult = read() === null ? "null (broken JSON rejected)" : "error";
    } catch {
        jsonResult = "storage unavailable";
    }
    document.getElementById("storage-json").textContent = jsonResult;

    const nativeStorage = window.localStorage;
    let quotaResult = "false";
    let blockedResult = "null";
    try {
        Object.defineProperty(window, "localStorage", {
            configurable: true,
            value: {
                setItem() {
                    throw new DOMException("Storage full", "QuotaExceededError");
                },
                getItem() {
                    throw new Error("Storage blocked");
                },
                removeItem() {},
            },
        });
        quotaResult = String(save(data));
        blockedResult = String(read());
    } finally {
        Object.defineProperty(window, "localStorage", {
            configurable: true,
            value: nativeStorage,
        });
    }
    document.getElementById("storage-quota").textContent = quotaResult;
    document.getElementById("storage-blocked").textContent = blockedResult;
    document.getElementById("storage-remove").textContent = String(remove());
}

showStorageResults();

function showComponentResults() {
    // Task 6.5 and 6.6: compare page CSS with Shadow DOM CSS.
    const card = document.querySelector("ticket-card");
    const shadowHeading = card?.shadowRoot?.querySelector("h3");
    const pageHeading = document.querySelector(".component-demo > h3");
    document.getElementById("component-shadow-color").textContent =
        getComputedStyle(shadowHeading).color;
    document.getElementById("component-page-color").textContent =
        getComputedStyle(pageHeading).color;

    let moduleTest = "no error";
    try {
        // Task 6.7: ES modules run in strict mode.
        undeclaredModuleValue = 1;
    } catch (error) {
        moduleTest = error.constructor.name;
    }
    document.getElementById("component-module-test").textContent = moduleTest;
}

document.addEventListener("ticket-seatmap-request", async (event) => {
    // Task 6.8 and 6.9: catch the composed event and load the seatmap lazily.
    const host = document.getElementById("seatmap-host");
    const result = document.getElementById("component-seatmap-result");
    const { drawSeatmap } = await import("seatmap");
    const info = drawSeatmap(host, event.detail.eventId);
    result.textContent = `${info.seats} seats loaded for event ${info.eventId}`;
});

showComponentResults();
