// scripts.js - Busca, filtro e receita aleatória
document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");
  const filter = document.getElementById("filter");
  const randomBtn = document.getElementById("randomBtn");
  const cards = Array.from(document.querySelectorAll("#recipes .card"));

  function applyFilter() {
    const q = search.value.trim().toLowerCase();
    const cat = filter.value;
    let visible = 0;
    cards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category;
      const matchesQ = q === "" || name.includes(q);
      const matchesC = cat === "all" || category === cat;
      if (matchesQ && matchesC) {
        card.classList.remove("hidden");
        visible++;
      } else {
        card.classList.add("hidden");
      }
    });
    return visible;
  }

  search.addEventListener("input", () => {
    applyFilter();
    highlightSearch();
  });
  filter.addEventListener("change", () => applyFilter());

  function highlightSearch() {
    const q = search.value.trim().toLowerCase();
    cards.forEach((card) => {
      const titleEl = card.querySelector("h3");
      if (!titleEl) return;
      const txt = titleEl.textContent;
      if (q && txt.toLowerCase().includes(q)) {
        titleEl.classList.add("search-highlight");
      } else {
        titleEl.classList.remove("search-highlight");
      }
    });
  }

  randomBtn.addEventListener("click", () => {
    const visibleCards = cards.filter((c) => !c.classList.contains("hidden"));
    if (visibleCards.length === 0) {
      alert("Nenhuma receita encontrada para sortear.");
      return;
    }
    const pick = visibleCards[Math.floor(Math.random() * visibleCards.length)];
    pick.scrollIntoView({ behavior: "smooth", block: "center" });
    pick.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.03)" },
        { transform: "scale(1)" },
      ],
      { duration: 420 }
    );
    // breve destaque
    pick.style.boxShadow = "0 18px 36px rgba(213,84,0,0.14)";
    setTimeout(() => (pick.style.boxShadow = ""), 700);
  });

  // inicial
  applyFilter();
});
