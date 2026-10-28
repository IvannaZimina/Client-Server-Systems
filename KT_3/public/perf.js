// public/perf.js

// 3.6.
export function runPerformanceBenchmarks() {
    console.log("=== DOM Performance Benchmarks (2000 rows) ===");
    const dummyRows = Array.from({ length: 2000 }, (_, i) => `Row ${i}`);

    const buildElements = (rows) => rows.map((text) => {
        const el = document.createElement("div");
        el.textContent = text;
        return el;
    });

    const run = (label, fn) => {
        const start = performance.now();
        fn();
        const end = performance.now();
        console.log(`${label}: ${(end - start).toFixed(2)} ms`);
    };

    const container1 = document.createElement("div");
    document.body.appendChild(container1);
    const source1 = buildElements(dummyRows);
    run("tsüklis appendChild", () => {
        container1.replaceChildren();
        for (const el of source1) {
            container1.appendChild(el);
        }
    });

    const container2 = document.createElement("div");
    document.body.appendChild(container2);
    const source2 = buildElements(dummyRows);
    run("replaceChildren(...rows)", () => {
        container2.replaceChildren(...source2);
    });

    const container3 = document.createElement("div");
    document.body.appendChild(container3);
    const source3 = buildElements(dummyRows);
    const fragment = document.createDocumentFragment();
    run("DocumentFragment", () => {
        container3.replaceChildren();
        for (const el of source3) {
            fragment.appendChild(el);
        }
        container3.appendChild(fragment);
    });
}

// 3.7.
export function runCollectionTests() {
    console.log("=== Live vs Static Collection Tests ===");

    const liveBox = document.createElement("div");
    for (let i = 0; i < 10; i++) {
        const div = document.createElement("div");
        div.className = "test-node";
        liveBox.appendChild(div);
    }
    const liveCol = liveBox.getElementsByClassName("test-node");
    let liveRemoved = 0;
    for (let i = 0; i < liveCol.length; i++) {
        liveBox.removeChild(liveCol[i]);
        liveRemoved++;
    }
    console.log(
        `Live collection (getElementsByClassName) -> Removed: ${liveRemoved}, Remaining: ${liveCol.length}`,
    );

    const staticBox = document.createElement("div");
    for (let i = 0; i < 10; i++) {
        const div = document.createElement("div");
        div.className = "test-node";
        staticBox.appendChild(div);
    }
    const staticList = staticBox.querySelectorAll(".test-node");
    let staticRemoved = 0;
    staticList.forEach((el) => {
        staticBox.removeChild(el);
        staticRemoved++;
    });
    console.log(
        `Static collection (querySelectorAll) -> Removed: ${staticRemoved}, Remaining: ${staticBox.children.length}`,
    );
}
