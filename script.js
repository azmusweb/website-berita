const sheetID = "128bSvr13vEVS2jKM_f7rFJd7WYit59FwSjKGAe3zCeE";
const sheetName = "Sheet1";
const url = `https://opensheet.elk.sh/${sheetID}/${sheetName}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const beritaList = document.getElementById("berita-list");
    const beritaDetail = document.getElementById("berita-detail");

    if (beritaList) {
      data.reverse().forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "berita-card";
        card.innerHTML = `
          <img src="${item.gambar || 'https://via.placeholder.com/600x300?text=No+Image'}" alt="${item.judul}">
          <div class="content">
            <h3>${item.judul}</h3>
            <p>${item.deskripsi.slice(0, 100)}...</p>
          </div>
        `;
        card.addEventListener("click", () => {
          window.location.href = `berita.html?id=${index}`;
        });
        beritaList.appendChild(card);
      });
    }

    if (beritaDetail) {
      const id = parseInt(params.get("id"));
      const item = data[data.length - 1 - id]; // reverse index

      if (item) {
        beritaDetail.innerHTML = `
          <h2>${item.judul}</h2>
          <img src="${item.gambar}" style="width:100%; max-height:400px; object-fit:cover; margin:20px 0;" />
          <p>${item.deskripsi}</p>
        `;
      } else {
        beritaDetail.innerHTML = "<p>Berita tidak ditemukan.</p>";
      }
    }
  })
  .catch(err => {
    console.error("Gagal mengambil data:", err);
  });
