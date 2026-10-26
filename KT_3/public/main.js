// public/main.js
import { setState, readState, forView } from "./view.js";
import { runPerformanceBenchmarks, runCollectionTests } from "./perf.js";

// 1. Initial state setup
setState({
    events: [
        { id: 1, name: "Jazz Night", venue: "Salme" },
        { id: 2, name: "Rock Concert", venue: "Tondiraba" },
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
