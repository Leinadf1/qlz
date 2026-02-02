const API_URL = "https://script.google.com/macros/s/AKfycbydn8FphHtaqu0WlfiZmdJdf-q9r77IdtSOCq3T6WdL237Ub_AkRHX5sEKKLx6ae12t/exec";

/*************************************************
 * CARICA INVENTARIO
 *************************************************/
fetch(API_URL)
  .then(res => res.json())
  .then(prodotti => {
    render(prodotti);
  })
  .catch(() => {
    document.getElementById("contenuto").innerHTML =
      "<p class='loading'>Errore caricamento dati</p>";
  });


/*************************************************
 * RENDER INVENTARIO DIVISO PER PESO
 *************************************************/
function render(prodotti) {

  const contenuto = document.getElementById("contenuto");
  contenuto.innerHTML = "";

  const gruppi = {};

  prodotti.forEach(p => {
    if (!gruppi[p.peso]) gruppi[p.peso] = [];
    gruppi[p.peso].push(p);
  });

  Object.keys(gruppi).sort().forEach(peso => {

    const group = document.createElement("div");
    group.className = "peso-group";

    const title = document.createElement("div");
    title.className = "peso-title";
    title.textContent = "Peso: " + peso;
    group.appendChild(title);

    gruppi[peso].forEach(p => {

      const card = document.createElement("div");
      card.className = "card";

      if (p.quantita <= 2) card.classList.add("low");

      const info = document.createElement("div");
      info.innerHTML = `
        <div class="nome">${p.nome}</div>
        <div class="categoria">${p.categoria || ""}</div>
      `;

      const qty = document.createElement("div");
      qty.className = "qty";
      qty.textContent = p.quantita;

      card.appendChild(info);
      card.appendChild(qty);

      group.appendChild(card);
    });

    contenuto.appendChild(group);
  });
}
