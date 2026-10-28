const KEY = "piletikassa:draft";
const VERSION = 1;

// 5.1.
export function read() {
    try {
        const raw = localStorage.getItem(KEY);
        if (raw === null) return null;

        const record = JSON.parse(raw);
        // 5.5.
        if (record?.version !== VERSION) {
            localStorage.removeItem(KEY);
            return null;
        }
        return record.data ?? null;
    } catch {
        // 5.2.
        return null;
    }
}

// 5.3.
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

// 5.4.
export function remove() {
    try {
        localStorage.removeItem(KEY);
        return true;
    } catch {
        return false;
    }
}

export { KEY, VERSION };