const sheetID = "128bSvr13vEVS2jKM_f7rFJd7WYit59FwSjKGAe3zCeE";
const sheetName = "Sheet1";
const url = `https://opensheet.elk.sh/${sheetID}/${sheetName}`;

async function loadBerita() {
  const response = await fetch(url);
  const data = await response.json();

  const container = document.getElementById("berita-container");
  container.innerHTML = "";

  data.reverse().forEach(berita => {
    const card = document.createElement("div");
    card.className = "berita-card";

    card.innerHTML = `
      <img src="${berita.gambar}" alt="gambar" class="berita-gambar">
      <div class="berita-info">
        <h3><a href="berita.html?slug=${berita.slug}">${berita.judul}</a></h3>
        <p class="kategori">${berita.kategori} - ${berita.tanggal}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

loadBerita();
