// public/view.js

/**
 * Task 3.1: Single state object containing events, sort field, direction, search query, and loading status.
 */
let state = {
    events: [],
    sort: "name",
    dir: "asc",
    search: "",
    loading: false,
};

/**
 * Updates the state with partial changes and returns the read state copy.
 */
export function setState(changes) {
    state = { ...state, ...changes };
    return readState();
}

/**
 * Task 3.2: Returns a deep copy of the current state, preventing direct reference mutation.
 */
export function readState() {
    return JSON.parse(JSON.stringify(state));
}

/**
 * Task 3.2 & 3.3: forView(state)
 * Derives presentation data: filters events by search query (name/venue) and sorts them.
 * Returns TWO things: { rows, state }.
 * Note: The view drawer never looks back into the state directly (unidirectional flow).
 */
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
