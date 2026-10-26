const KEY = "piletikassa:draft";
const VERSION = 1;

// Task 5.1: use one versioned localStorage key.
export function read() {
    try {
        const raw = localStorage.getItem(KEY);
        if (raw === null) return null;

        const record = JSON.parse(raw);
        // Task 5.5: reject and remove data without the expected version.
        if (record?.version !== VERSION) {
            localStorage.removeItem(KEY);
            return null;
        }
        return record.data ?? null;
    } catch {
        // Task 5.2, 5.4, 5.7 and 5.8: invalid or unavailable storage returns null.
        return null;
    }
}

// Task 5.3, 5.4 and 5.6: save JSON data and handle storage errors safely.
export function save(data) {
    try {
        localStorage.setItem(
            KEY,
            JSON.stringify({ version: VERSION, data }),
        );
        return true;
    } catch {
        return false;
    }
}

// Task 5.3 and 5.4: remove the stored draft safely.
export function remove() {
    try {
        localStorage.removeItem(KEY);
        return true;
    } catch {
        return false;
    }
}

export { KEY, VERSION };