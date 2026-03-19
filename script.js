(() => {
    "use strict";

    const board = document.getElementById("board");
    const movesEl = document.getElementById("moves");
    const matchesEl = document.getElementById("matches");
    const totalPairsEl = document.getElementById("totalPairs");
    const timerEl = document.getElementById("timer");
    const statusEl = document.getElementById("status");
    const restartBtn = document.getElementById("restart");
    const starfield = document.getElementById("starfield");
    const celebration = document.getElementById("celebration");
    const celebrationParticles = document.getElementById("celebrationParticles");
    const celebrationMeteors = document.getElementById("celebrationMeteors");
    const celebrationStats = document.getElementById("celebrationStats");
    const celebrationClose = document.getElementById("celebrationClose");

    const PAIRS = 8;

    const CONSTELLATIONS = [
        {
            id: "orion",
            name: "Orion",
            /* Jäger: Kopf, Schultern, Gürtel, Beine */
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="#070b14"/><g fill="#9ab4e8" opacity="0.35"><circle cx="20" cy="70" r="0.9"/><circle cx="95" cy="65" r="0.8"/><circle cx="105" cy="40" r="0.7"/><circle cx="12" cy="38" r="0.7"/></g><g stroke="#8eb4ff" stroke-width="1.15" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"><path d="M48 16 L46 50"/><path d="M14 34 L54 28"/><path d="M14 34 L34 50"/><path d="M54 28 L56 50"/><path d="M34 50 L46 50 L56 50"/><path d="M34 50 L26 76"/><path d="M56 50 L66 76"/></g><circle cx="48" cy="16" r="1.6" fill="#aac8ff"/><circle cx="14" cy="34" r="3.2" fill="#ffc4a8"/><circle cx="54" cy="28" r="2.5" fill="#e8f2ff"/><circle cx="34" cy="50" r="2.3" fill="#fff"/><circle cx="46" cy="50" r="2.3" fill="#fff"/><circle cx="56" cy="50" r="2.3" fill="#fff"/><circle cx="26" cy="76" r="2.2" fill="#c8dcff"/><circle cx="66" cy="76" r="3.3" fill="#b8d8ff"/></svg>`,
        },
        {
            id: "ursa",
            name: "Großer Bär",
            /* Asterismus Großer Wagen: Schale + drei Sterne am Stiel */
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="#070b14"/><g fill="#8fa6d4" opacity="0.35"><circle cx="18" cy="22" r="0.8"/><circle cx="108" cy="58" r="0.9"/><circle cx="52" cy="78" r="0.7"/></g><g stroke="#9eb8ff" stroke-width="1.15" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 38 L36 30 L46 46 L30 54 L22 38"/><path d="M46 46 L58 40 L74 32 L102 22"/></g><circle cx="22" cy="38" r="3" fill="#ffe9b8"/><circle cx="36" cy="30" r="2.6" fill="#fff"/><circle cx="46" cy="46" r="2.4" fill="#e8f0ff"/><circle cx="30" cy="54" r="2.5" fill="#fff"/><circle cx="58" cy="40" r="2.6" fill="#fff"/><circle cx="74" cy="32" r="2.7" fill="#fff"/><circle cx="102" cy="22" r="3.1" fill="#e8c547"/></svg>`,
        },
        {
            id: "cassiopeia",
            name: "Kassiopeia",
            /* markantes W aus fünf hellen Sternen */
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="#070b14"/><g fill="#a8b8e0" opacity="0.35"><circle cx="60" cy="12" r="0.8"/><circle cx="110" cy="78" r="0.7"/></g><g stroke="#c4a8ff" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10 62 L30 28 L52 58 L74 24 L108 66"/></g><circle cx="10" cy="62" r="2.6" fill="#fff"/><circle cx="30" cy="28" r="3.2" fill="#e8c547"/><circle cx="52" cy="58" r="2.7" fill="#fff"/><circle cx="74" cy="24" r="3" fill="#ffd8a8"/><circle cx="108" cy="66" r="2.8" fill="#fff"/></svg>`,
        },
        {
            id: "lyra",
            name: "Leier",
            /* Wega + Raute der Leier */
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="#070b14"/><g fill="#8899cc" opacity="0.35"><circle cx="95" cy="72" r="0.8"/><circle cx="15" cy="48" r="0.7"/></g><g stroke="#b8c8ff" stroke-width="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M60 18 L60 38"/><path d="M60 38 L42 58 L52 72 L70 68 L78 52 L60 38"/></g><circle cx="60" cy="18" r="4" fill="#e8f4ff"/><circle cx="60" cy="38" r="2.3" fill="#fff"/><circle cx="42" cy="58" r="2.2" fill="#fff"/><circle cx="52" cy="72" r="2" fill="#dde8ff"/><circle cx="70" cy="68" r="2.1" fill="#fff"/><circle cx="78" cy="52" r="2.2" fill="#fff"/></svg>`,
        },
        {
            id: "cygnus",
            name: "Schwan",
            /* Nordkreuz: Deneb – Sadr – Albireo */
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="#070b14"/><g fill="#8899bb" opacity="0.35"><circle cx="22" cy="18" r="0.7"/><circle cx="98" cy="78" r="0.8"/></g><g stroke="#a0b8ff" stroke-width="1.15" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M60 10 L60 82"/><path d="M22 38 L98 38"/></g><circle cx="60" cy="10" r="3.4" fill="#d0e8ff"/><circle cx="60" cy="38" r="3" fill="#fff"/><circle cx="60" cy="82" r="2.8" fill="#ffe8c8"/><circle cx="22" cy="38" r="2.4" fill="#fff"/><circle cx="98" cy="38" r="2.5" fill="#fff"/></svg>`,
        },
        {
            id: "scorpius",
            name: "Skorpion",
            /* Scheren, Antares, Bogen und Stachel */
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="#070b14"/><g fill="#884466" opacity="0.25"><circle cx="55" cy="12" r="0.8"/><circle cx="100" cy="70" r="0.7"/></g><g stroke="#e88888" stroke-width="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8 44 L18 40 M8 52 L20 54"/><path d="M20 48 L32 50 L44 48 L56 44 L68 38 L80 32 L92 26 L102 20 L112 14"/></g><circle cx="8" cy="44" r="1.5" fill="#ffc8c8"/><circle cx="8" cy="52" r="1.5" fill="#ffc8c8"/><circle cx="20" cy="48" r="1.8" fill="#fff"/><circle cx="32" cy="50" r="3.6" fill="#ff8866"/><circle cx="44" cy="48" r="2.2" fill="#fff"/><circle cx="56" cy="44" r="2.1" fill="#fff"/><circle cx="68" cy="38" r="2" fill="#fff"/><circle cx="80" cy="32" r="2" fill="#fff"/><circle cx="92" cy="26" r="1.9" fill="#fff"/><circle cx="102" cy="20" r="1.8" fill="#fff"/><circle cx="112" cy="14" r="2.2" fill="#ffcccc"/></svg>`,
        },
        {
            id: "leo",
            name: "Löwe",
            /* Sichel und Dreieck zum Denebola */
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="#070b14"/><g fill="#c9a86e" opacity="0.3"><circle cx="58" cy="78" r="0.8"/><circle cx="8" cy="28" r="0.7"/></g><g stroke="#f0c86a" stroke-width="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M88 58 L78 44 L64 34 L50 36 L40 46 L34 58"/><path d="M34 58 L18 48 L88 58"/></g><circle cx="88" cy="58" r="3.2" fill="#e8e8ff"/><circle cx="78" cy="44" r="2.4" fill="#fff"/><circle cx="64" cy="34" r="2.5" fill="#ffe8a8"/><circle cx="50" cy="36" r="2.2" fill="#fff"/><circle cx="40" cy="46" r="2.1" fill="#fff"/><circle cx="34" cy="58" r="2.3" fill="#fff"/><circle cx="18" cy="48" r="3" fill="#c8dcff"/></svg>`,
        },
        {
            id: "pegasus",
            name: "Pegasus",
            /* Großes Quadrat, Beine zu Enif, Kette zur Andromeda */
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="#070b14"/><g fill="#8899cc" opacity="0.35"><circle cx="18" cy="78" r="0.8"/><circle cx="105" cy="68" r="0.7"/></g><g stroke="#aab8ff" stroke-width="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M32 24 L82 24 L82 58 L32 58 Z"/><path d="M32 24 L18 12"/><path d="M82 58 L92 72 L100 78"/></g><circle cx="32" cy="24" r="3" fill="#e8f0ff"/><circle cx="82" cy="24" r="2.8" fill="#fff"/><circle cx="82" cy="58" r="2.7" fill="#fff"/><circle cx="32" cy="58" r="2.9" fill="#fff"/><circle cx="18" cy="12" r="2.6" fill="#e8c547"/><circle cx="92" cy="72" r="2.1" fill="#dde4ff"/><circle cx="100" cy="78" r="2.3" fill="#fff"/></svg>`,
        },
    ];

    function svgToDataUrl(svg) {
        const encoded = encodeURIComponent(svg.replace(/\s+/g, " ").trim());
        return `data:image/svg+xml;charset=utf-8,${encoded}`;
    }

    let deck = [];
    let opened = [];
    let locked = false;
    let moves = 0;
    let matches = 0;
    let timerId = null;
    let seconds = 0;

    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function startTimerIfNeeded() {
        if (timerId !== null) return;
        seconds = 0;
        timerEl.textContent = "0\u00a0s";
        timerId = setInterval(() => {
            seconds += 1;
            timerEl.textContent = `${seconds}\u00a0s`;
        }, 1000);
    }

    function stopTimer() {
        if (timerId === null) return;
        clearInterval(timerId);
        timerId = null;
    }

    function setStatus(text) {
        statusEl.textContent = text;
    }

    function updateHUD() {
        movesEl.textContent = String(moves);
        matchesEl.textContent = String(matches);
        totalPairsEl.textContent = String(PAIRS);
    }

    function buildDeck() {
        const cards = [];
        for (const c of CONSTELLATIONS) {
            cards.push({ constellationId: c.id, kind: "name", label: c.name });
            cards.push({
                constellationId: c.id,
                kind: "image",
                imageSrc: svgToDataUrl(c.svg),
                label: c.name,
            });
        }
        return shuffle(cards);
    }

    function isMatch(a, b) {
        if (!a || !b) return false;
        if (a.constellationId !== b.constellationId) return false;
        if (a.kind === b.kind) return false;
        return true;
    }

    function escapeHtml(s) {
        const div = document.createElement("div");
        div.textContent = s;
        return div.innerHTML;
    }

    function makeCard(data, index) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.constellationId = data.constellationId;
        card.dataset.kind = data.kind;
        card.dataset.index = String(index);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute(
            "aria-label",
            data.kind === "name" ? "Karte: Name des Sternbilds" : "Karte: Sternbild (Abbild)"
        );

        const backContent =
            data.kind === "name"
                ? `<div class="card-back card-back--name">${escapeHtml(data.label)}</div>`
                : `<div class="card-back card-back--image"><img src="${data.imageSrc}" alt="Sternbild: ${escapeHtml(data.label)}" loading="lazy" width="120" height="90"></div>`;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"><span class="card-front-icon" aria-hidden="true">✦</span></div>
                ${backContent}
            </div>
        `;

        const activate = () => handleCardClick(card, data);
        card.addEventListener("click", activate);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate();
            }
        });

        return card;
    }

    function flip(card) {
        card.classList.add("flipped");
    }

    function unflip(card) {
        card.classList.remove("flipped");
    }

    function markMatched(card) {
        card.classList.add("matched");
        card.setAttribute("tabindex", "-1");
    }

    function handleCardClick(card, data) {
        if (locked) return;
        if (card.classList.contains("matched")) return;
        if (card.classList.contains("flipped")) return;
        if (opened.length >= 2) return;

        startTimerIfNeeded();
        flip(card);
        opened.push({ el: card, data });

        if (opened.length === 2) {
            locked = true;
            moves += 1;
            updateHUD();

            const [first, second] = opened;
            const ok = isMatch(first.data, second.data);

            if (ok) {
                markMatched(first.el);
                markMatched(second.el);
                opened = [];
                matches += 1;
                updateHUD();
                locked = false;

                if (matches === PAIRS) {
                    stopTimer();
                    setStatus(
                        `Geschafft! Alle Paare — ${moves} ${moves === 1 ? "Zug" : "Züge"}, ${seconds}\u00a0s.`
                    );
                    showCelebration(moves, seconds);
                } else {
                    setStatus("Passt! Die Sterne stimmen überein.");
                }
            } else {
                setStatus("Das sind zwei verschiedene Sternbilder …");
                window.setTimeout(() => {
                    unflip(first.el);
                    unflip(second.el);
                    opened = [];
                    locked = false;
                    setStatus("Suche das Paar: Name ↔ Sternbild.");
                }, 900);
            }
        }
    }

    function resetGame() {
        hideCelebration();
        stopTimer();
        opened = [];
        locked = false;
        moves = 0;
        matches = 0;
        seconds = 0;
        timerEl.textContent = "0\u00a0s";

        deck = buildDeck();
        board.innerHTML = "";
        deck.forEach((item, i) => {
            board.appendChild(makeCard(item, i));
        });

        updateHUD();
        setStatus("Decke zwei Karten auf: den Namen und das Bild desselben Sternbilds.");
    }

    const CELE_COLORS = ["#7eb8ff", "#e8c547", "#c4a8ff", "#a8e8ff", "#ffffff"];

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function hideCelebration() {
        if (!celebration) return;
        celebration.classList.add("celebration--hidden");
        celebration.setAttribute("aria-hidden", "true");
        if (celebrationParticles) celebrationParticles.innerHTML = "";
        if (celebrationMeteors) celebrationMeteors.innerHTML = "";
    }

    function fillCelebrationParticles() {
        if (!celebrationParticles) return;
        celebrationParticles.innerHTML = "";
        const reduced = prefersReducedMotion();
        const count = reduced ? 14 : 56;
        const symbols = ["✦", "✧", "⋆", "✹", "·"];
        for (let i = 0; i < count; i++) {
            const el = document.createElement("span");
            const useSymbol = Math.random() < 0.42;
            el.className = useSymbol ? "cele-particle" : "cele-particle cele-particle--dot";
            if (useSymbol) {
                el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                el.style.fontSize = `${6 + Math.random() * 10}px`;
            } else {
                const c = CELE_COLORS[Math.floor(Math.random() * CELE_COLORS.length)];
                el.style.setProperty("--cele-color", c);
                el.style.width = `${2 + Math.random() * 3}px`;
                el.style.height = el.style.width;
            }
            el.style.left = `${Math.random() * 100}%`;
            el.style.animationDuration = `${2.8 + Math.random() * 4}s`;
            el.style.animationDelay = `${Math.random() * 2.2}s`;
            celebrationParticles.appendChild(el);
        }
    }

    function fillCelebrationMeteors() {
        if (!celebrationMeteors || prefersReducedMotion()) return;
        celebrationMeteors.innerHTML = "";
        const n = 5;
        for (let i = 0; i < n; i++) {
            const m = document.createElement("div");
            m.className = "cele-meteor";
            m.style.top = `${6 + Math.random() * 42}%`;
            m.style.left = `${58 + Math.random() * 38}%`;
            m.style.setProperty("--meteor-angle", `${-28 - Math.random() * 22}deg`);
            m.style.animationDuration = `${0.75 + Math.random() * 0.55}s`;
            m.style.animationDelay = `${0.2 + i * 0.45 + Math.random() * 0.4}s`;
            celebrationMeteors.appendChild(m);
        }
    }

    function showCelebration(totalMoves, totalSeconds) {
        if (!celebration || !celebrationStats) return;
        fillCelebrationParticles();
        fillCelebrationMeteors();
        const zugText = totalMoves === 1 ? "1 Zug" : `${totalMoves} Züge`;
        celebrationStats.textContent = `${zugText} · ${totalSeconds}\u00a0s · ${PAIRS} Sternbilder`;
        celebration.classList.remove("celebration--hidden");
        celebration.setAttribute("aria-hidden", "false");
        window.setTimeout(() => {
            celebrationClose?.focus();
        }, 120);
    }

    function createStars() {
        if (!starfield) return;
        const count = 110;
        for (let i = 0; i < count; i++) {
            const s = document.createElement("div");
            s.className = "star";
            const size = Math.random() < 0.15 ? 2.2 : Math.random() * 1.6 + 0.8;
            s.style.width = `${size}px`;
            s.style.height = `${size}px`;
            s.style.left = `${Math.random() * 100}%`;
            s.style.top = `${Math.random() * 100}%`;
            const dur = 2 + Math.random() * 4;
            const delay = Math.random() * 5;
            const base = 0.25 + Math.random() * 0.45;
            s.style.setProperty("--tw-dur", `${dur}s`);
            s.style.setProperty("--tw-delay", `${delay}s`);
            s.style.setProperty("--tw-base", String(base));
            starfield.appendChild(s);
        }
    }

    createStars();
    restartBtn.addEventListener("click", resetGame);

    celebrationClose?.addEventListener("click", () => {
        hideCelebration();
        restartBtn?.focus();
    });

    celebration?.querySelector(".celebration-backdrop")?.addEventListener("click", () => {
        hideCelebration();
        restartBtn?.focus();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && celebration && !celebration.classList.contains("celebration--hidden")) {
            hideCelebration();
            restartBtn?.focus();
        }
    });

    resetGame();
})();
