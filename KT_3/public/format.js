// public/format.js

/**
 * freeText distinguishes three cases: 0, positive number, and invalid input.
 * Uses strict check === 0 as required to prevent falsy branch errors.
 */
export function freeText(free = 0) {
    if (typeof free !== "number" || Number.isNaN(free)) {
        return "vigane sisend";
    }
    if (free === 0) {
        return "välja müüdud";
    }
    if (free > 0) {
        return `${free} vaba`;
    }
    return "vigane sisend";
}

/**
 * price calculates the total price and throws a RangeError for unknown price tiers
 * instead of returning NaN. Uses default parameters and rest parameters for extras.
 */
export function price(tier = "standard", qty = 1, ...extras) {
    // Available price tiers aligned with project requirements
    const priceTiers = {
        standard: 10,
        vip: 25,
        child: 5,
    };

    // Check if the tier exists; if not, throw RangeError (Item 3 requirement)
    if (!(tier in priceTiers)) {
        throw new RangeError(`Unknown price tier: ${tier}`);
    }

    let total = priceTiers[tier] * qty;

    // Sum up any additional extra costs using rest parameters
    for (const extra of extras) {
        if (typeof extra === "number") {
            total += extra;
        }
    }
    return total;
}

/**
 * Calculates total sum including VAT with a default rate of 22%.
 */
export function withVat(sum = 0, vatRate = 0.22) {
    return sum * (1 + vatRate);
}

/**
 * createCart returns an object where the internal rows array remains completely hidden (closure).
 */
export function createCart() {
    // Closure: rows array is NOT visible from the outside
    const rows = [];

    return {
        add(item) {
            rows.push(item);
        },
        getRows() {
            return [...rows]; // Return a shallow copy to protect internal state
        },
        getCount() {
            return rows.length;
        },
    };
}

/**
 * Formats a seat label using default parameters and a custom separator.
 */
export function seatLabel(row = 1, nr = 1, separator = "-") {
    return `Rida ${row}${separator}Nr ${nr}`;
}
