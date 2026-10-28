// public/stats.js

// 2.1.
export function available(events) {
    return events.filter((event) => event.seats - event.sold > 0);
}

// 2.2.
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

// 2.1. (findById)
export function findById(events, id) {
    return events.find((event) => event.id === id);
}

// 2.1. (revenue)
export function revenue(events) {
    return events.reduce((total, event) => total + event.sold * event.price, 0);
}

// 2.1. (anyFree)
export function anyFree(events) {
    return events.some((event) => event.seats - event.sold > 0);
}

// 2.3., 2.4., 2.5.
export function sortBy(rows, field, dir = "asc") {
    return [...rows].sort((a, b) => {
        let valA = a[field];
        let valB = b[field];

        if (typeof valA === "string" && typeof valB === "string") {
            const comparison = valA.localeCompare(valB);
            if (comparison !== 0) {
                return dir === "asc" ? comparison : -comparison;
            }
        } else {
            if (valA < valB) return dir === "asc" ? -1 : 1;
            if (valA > valB) return dir === "asc" ? 1 : -1;
        }

        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });
}

// 2.6.
export function summary(event) {
    const {
        name: eventName,
        price: ticketPrice = 10,
        venue = "Unknown",
    } = event;
    return `${eventName} at ${venue} costs ${ticketPrice} EUR`;
}

// 2.7.
export function organizerName(event) {
    return event?.organizer?.name ?? "Teadmata korraldaja";
}

// 2.7.
export function seatsText(event) {
    const seatsCount = event?.seats ?? "?";
    return `${seatsCount} kohta`;
}

// 2.8.
export function pack(data) {
    try {
        return JSON.stringify(data);
    } catch (error) {
        console.error("Packing error:", error);
        return null;
    }
}

// 2.8.
export function unpack(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return null;
    }
}

// 2.9.
export function allSoldOut(events) {
    if (!events || events.length === 0) {
        return false;
    }
    return events.every((event) => event.seats - event.sold <= 0);
}
