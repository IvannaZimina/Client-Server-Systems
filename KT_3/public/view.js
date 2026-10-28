// public/view.js

// 3.1.
let state = {
    events: [],
    sort: "name",
    dir: "asc",
    search: "",
    loading: false,
};

// 3.1.
export function setState(changes) {
    state = { ...state, ...changes };
    return readState();
}

// 3.1.
export function readState() {
    return JSON.parse(JSON.stringify(state));
}

// 3.2.
export function forView(currentState) {
    let rows = [...currentState.events];

    // Filter by search query if present
    if (currentState.search && currentState.search.trim() !== "") {
        const query = currentState.search.toLowerCase();
        rows = rows.filter(
            (event) =>
                (event.name && event.name.toLowerCase().includes(query)) ||
                (event.venue && event.venue.toLowerCase().includes(query)),
        );
    }

    // Sort rows based on sort field and direction
    rows.sort((a, b) => {
        let valA = a[currentState.sort];
        let valB = b[currentState.sort];

        if (typeof valA === "string" && typeof valB === "string") {
            const comp = valA.localeCompare(valB);
            return currentState.dir === "asc" ? comp : -comp;
        } else {
            if (valA < valB) return currentState.dir === "asc" ? -1 : 1;
            if (valA > valB) return currentState.dir === "asc" ? 1 : -1;
            return 0;
        }
    });

    return {
        rows,
        state: currentState,
    };
}
