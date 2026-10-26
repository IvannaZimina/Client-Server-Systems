// public/perf.js

/**
 * Task 3.6: Benchmarks rendering speed for 2000 rows using three different approaches.
 * Results are displayed in the browser console (F12 -> Console) to fill docs/view.md.
 */
export function runPerformanceBenchmarks() {
    console.log("=== DOM Performance Benchmarks (2000 rows) ===");
    const dummyRows = Array.from({ length: 2000 }, (_, i) => `Row ${i}`);

    // 1. Loop with appendChild
    const container1 = document.createElement("div");
    console.time("tsüklis appendChild");
    for (const text of dummyRows) {
        const el = document.createElement("div");
        el.textContent = text;
        container1.appendChild(el);
    }
    console.timeEnd("tsüklis appendChild");

    // 2. replaceChildren method
    const container2 = document.createElement("div");
    const elements2 = dummyRows.map((text) => {
        const el = document.createElement("div");
        el.textContent = text;
        return el;
    });
    console.time("replaceChildren(...rows)");
    container2.replaceChildren(...elements2);
    console.timeEnd("replaceChildren(...rows)");

    // 3. DocumentFragment method
    const container3 = document.createElement("div");
    const fragment = document.createDocumentFragment();
    console.time("DocumentFragment");
    for (const text of dummyRows) {
        const el = document.createElement("div");
        el.textContent = text;
        fragment.appendChild(el);
    }
    container3.appendChild(fragment);
    console.timeEnd("DocumentFragment");
}

/**
 * Task 3.7 & 3.8: Demonstrates why live and static collections behave differently during removal.
 */
export function runCollectionTests() {
    console.log("=== Live vs Static Collection Tests ===");

    // Live collection test (getElementsByClassName)
    const liveBox = document.createElement("div");
    for (let i = 0; i < 10; i++) {
        const div = document.createElement("div");
        div.className = "test-node";
        liveBox.appendChild(div);
    }
    const liveCol = liveBox.getElementsByClassName("test-node"); // Live collection
    let liveRemoved = 0;
    while (liveCol.length > 0) {
        liveBox.removeChild(liveCol[0]);
        liveRemoved++;
    }
    console.log(
        `Live collection (getElementsByClassName) -> Removed: ${liveRemoved}, Remaining: ${liveCol.length}`,
    );

    // Static collection test (querySelectorAll)
    const staticBox = document.createElement("div");
    for (let i = 0; i < 10; i++) {
        const div = document.createElement("div");
        div.className = "test-node";
        staticBox.appendChild(div);
    }
    const staticList = staticBox.querySelectorAll(".test-node"); // Static collection
    let staticRemoved = 0;
    staticList.forEach((el) => {
        staticBox.removeChild(el);
        staticRemoved++;
    });
    console.log(
        `Static collection (querySelectorAll) -> Removed: ${staticRemoved}, Remaining: ${staticList.length}`,
    );
}
