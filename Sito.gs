function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("Inventario");
}

function getInventario() {
  const sheet = SpreadsheetApp.getActive()
    .getSheetByName("Inventario");

  const data = sheet.getDataRange().getValues();
  data.shift(); // rimuove intestazioni

  return data
    .filter(r =>
      r[0] &&        // barcode
      r[1] &&        // nome
      r[2] &&        // peso
      r[3] !== ""    // quantità
    )
    .map(r => ({
      barcode: String(r[0]).trim(),
      nome: r[1],
      peso: r[2],
      quantita: Number(r[3])
    }));
}

function aggiornaQuantita(barcode, delta) {
  const sheet = SpreadsheetApp.getActive()
    .getSheetByName("Inventario");

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === barcode) {
      let nuova = Number(data[i][3]) + delta;
      if (nuova < 0) nuova = 0;
      sheet.getRange(i + 1, 4).setValue(nuova);
      return;
    }
  }
}

