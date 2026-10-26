// public/stats.js

/**
 * Task 2.1: available - Returns events that have at least one free seat.
 */
export function available(events) {
    return events.filter((event) => event.seats - event.sold > 0);
}

/**
 * Task 2.1 & 2.2: list - Calculates free seats and fill percentage for each event.
 */
export function list(events) {
    return events.map((event) => {
        const freeSeats = event.seats - event.sold;
        const fillPercentage =
            event.seats > 0 ? Math.round((event.sold / event.seats) * 100) : 0;
        return {
            ...event,
            freeSeats,
            fillPercentage,
        };
    });
}

/**
 * Task 2.1: findById - Finds a single event by its ID. Returns the element or undefined.
 */
export function findById(events, id) {
    return events.find((event) => event.id === id);
}

/**
 * Task 2.1: revenue - Calculates total revenue from all sold tickets across all events.
 */
export function revenue(events) {
    return events.reduce((total, event) => total + event.sold * event.price, 0);
}

/**
 * Task 2.1: anyFree - Checks if at least one event has free seats.
 */
export function anyFree(events) {
    return events.some((event) => event.seats - event.sold > 0);
}

/**
 * Task 2.1 & 2.9: allSoldOut - Checks if all events are completely sold out.
 * Note: every([]) returns true by default, so we check for empty selection to return false[cite: 9, 19].
 */
export function allSoldOut(events) {
    if (!events || events.length === 0) {
        return false; // Task 2.9: An empty selection is NOT sold out[cite: 9, 19]
    }
    return events.every((event) => event.seats - event.sold === 0);
}

/**
 * Task 2.3, 2.4 & 2.5: sortBy - Sorts events by field and direction without mutating original array.
 * Uses spread syntax ([...rows]) and provides a stable sort by id for equal elements[cite: 7, 19].
 */
export function sortBy(rows, field, dir = "asc") {
    // Task 2.5: Create a copy using spread syntax to avoid mutating caller's dataset[cite: 7, 19]
    return [...rows].sort((a, b) => {
        let valA = a[field];
        let valB = b[field];

        // Handle string comparison
        if (typeof valA === "string" && typeof valB === "string") {
            const comparison = valA.localeCompare(valB);
            if (comparison !== 0) {
                return dir === "asc" ? comparison : -comparison;
            }
        } else {
            if (valA < valB) return dir === "asc" ? -1 : 1;
            if (valA > valB) return dir === "asc" ? 1 : -1;
        }

        // Task 2.4: Stable sort fallback - sort by id if primary fields are equal[cite: 19]
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });
}

/**
 * Task 2.6: summary - Demonstrates object destructuring, renaming, and default values[cite: 19].
 */
export function summary(event) {
    const {
        name: eventName,
        price: ticketPrice = 10,
        venue = "Unknown",
    } = event;
    return `${eventName} at ${venue} costs ${ticketPrice} EUR`;
}

/**
 * Task 2.7: organizerName - Uses optional chaining (?.) safely[cite: 19].
 */
export function organizerName(event) {
    return event?.organizer?.name ?? "Teadmata korraldaja";
}

/**
 * Task 2.7: seatsText - Uses nullish coalescing (??) to preserve 0 instead of falling back incorrectly[cite: 9, 19].
 */
export function seatsText(event) {
    // s.seats ?? "?" preserves 0 instead of falling back to "?" incorrectly[cite: 9, 19]
    const seatsCount = event?.seats ?? "?";
    return `${seatsCount} kohta`;
}

/**
 * Task 2.8: pack - Safely packs data into a JSON string[cite: 19].
 */
export function pack(data) {
    try {
        return JSON.stringify(data);
    } catch (error) {
        console.error("Packing error:", error);
        return null;
    }
}

/**
 * Task 2.8: unpack - Safely unpacks JSON data. Corrupted JSON will not crash the page[cite: 19].
 */
export function unpack(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        // Corrupted JSON is caught here, page won't break[cite: 19]
        return null;
    }
}