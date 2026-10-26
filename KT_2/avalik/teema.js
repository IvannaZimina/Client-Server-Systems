const root = document.documentElement;
const lüliti = document.querySelector("[data-teema-luliti]");
const salvestatudTeema = localStorage.getItem("piletikassa-teema");

if (salvestatudTeema === "hele" || salvestatudTeema === "tume") {
    root.dataset.teema = salvestatudTeema;
}

function uuendaLülitit() {
    const tume =
        root.dataset.teema === "tume" ||
        (!root.dataset.teema &&
            matchMedia("(prefers-color-scheme: dark)").matches);

    lüliti.setAttribute("aria-pressed", String(tume));
    lüliti.textContent = tume
        ? "Kasuta heledat teemat"
        : "Kasuta tumedat teemat";
}

lüliti.addEventListener("click", () => {
    const uusTeema = root.dataset.teema === "tume" ? "hele" : "tume";
    root.dataset.teema = uusTeema;
    localStorage.setItem("piletikassa-teema", uusTeema);
    uuendaLülitit();
});

uuendaLülitit();
