/**
 * app.js
 * Handles rendering, search, and tier filtering for the brand grid.
 */

let activeTier = "all";

// ─── Tier helpers ────────────────────────────────────────────────────────────

function setTier(tier, btn) {
  activeTier = tier;
  document.querySelectorAll(".filter-btn").forEach((b) =>
    b.classList.remove("active")
  );
  btn.classList.add("active");
  filterCards();
}

// ─── Card builder ────────────────────────────────────────────────────────────

function buildCard(brand) {
  const dest = brand.commercial || brand.prodUrl;
  const displayUrl = dest.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const tierMeta = {
    plus:      { label: "Plus",      cls: "pill-plus" },
    essential: { label: "Essential", cls: "pill-essential" },
    test:      { label: "Test",      cls: "pill-test" },
  };
  const { label, cls } = tierMeta[brand.tier] ?? tierMeta.test;

  const card = document.createElement("a");
  card.className = "brand-card";
  card.href = dest;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.setAttribute("aria-label", `${brand.org} — ${brand.country}`);

  card.innerHTML = `
    <div class="card-top">
      <img
        class="brand-logo"
        src="${brand.logoUrl}"
        alt="${brand.org} logo"
        onerror="this.style.display='none';this.nextElementSibling.style.display='inline';"
      /><span class="flag" aria-hidden="true" style="display:none;">${brand.flag}</span>
      <span class="tier-pill ${cls}">${label}</span>
    </div>
    <div class="card-country">${brand.country}</div>
    <div class="card-org">${brand.org}</div>
    <div class="card-url">
      <span class="status-dot" aria-hidden="true"></span>${displayUrl}
    </div>
    <div class="card-key">key: ${brand.key}</div>
    <span class="open-icon" aria-hidden="true">↗</span>
  `;

  return card;
}

// ─── Filter & render ─────────────────────────────────────────────────────────

function filterCards() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const grid  = document.getElementById("brandGrid");
  const count = document.getElementById("resultCount");

  grid.innerHTML = "";

  const results = BRANDS.filter((b) => {
    const matchTier =
      activeTier === "all" || b.tier === activeTier;
    const matchQuery =
      !query ||
      b.country.toLowerCase().includes(query) ||
      b.org.toLowerCase().includes(query) ||
      b.key.toLowerCase().includes(query);
    return matchTier && matchQuery;
  });

  count.textContent =
    results.length + " brand" + (results.length !== 1 ? "s" : "");

  if (results.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No brands match your search.";
    grid.appendChild(empty);
    return;
  }

  results.forEach((brand) => grid.appendChild(buildCard(brand)));
}

// ─── Init ────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", filterCards);
