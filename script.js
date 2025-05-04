const sheetID = "128bSvr13vEVS2jKM_f7rFJd7WYit59FwSjKGAe3zCeE";
const sheetName = "berita"; // pastikan ini nama tab-nya
const url = `https://opensheet.elk.sh/${128bSvr13vEVS2jKM_f7rFJd7WYit59FwSjKGAe3zCeE}/${berita}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const beritaList = document.getElementById("berita-list");
    const beritaDetail = document.getElementById("berita-detail");
    const breakingText = document.getElementById("breaking-text");
    const sliderWrapper = document.getElementById("slider-wrapper");

    if (breakingText && data.length > 0) {
      breakingText.textContent = `Breaking News: ${data[data.length - 1].Judul}`;
    }

    if (sliderWrapper) {
      const topSlider = data.slice(-3).reverse();
      topSlider.forEach(item => {
        const img = document.createElement("img");
        img.src = item.Gambar || 'https://via.placeholder.com/600x300?text=No+Image';
        img.alt = item.Judul;
        sliderWrapper.appendChild(img);
      });
    }

    if (beritaList) {
      data.reverse().forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "berita-card";
        card.innerHTML = `
          <img src="${item.Gambar || 'https://via.placeholder.com/600x300?text=No+Image'}" alt="${item.Judul}">
          <div class="content">
            <h3>${item.Judul}</h3>
            <p>${item['Meta Deskripsi']}</p>
          </div>
        `;
        card.addEventListener("click", () => {
          window.location.href = `berita.html?slug=${item.Slug}`;
        });
        beritaList.appendChild(card);
      });
    }

    if (beritaDetail) {
      const slug = params.get("slug");
      const item = data.find(i => i.Slug === slug);

      if (item) {
        beritaDetail.innerHTML = `
          <h2>${item.Judul}</h2>
          <img src="${item.Gambar}" alt="${item.Judul}">
          <p><small>${item.Tanggal}</small></p>
          <p>${item.Isi}</p>
        `;
      } else {
        beritaDetail.innerHTML = "<p>Berita tidak ditemukan.</p>";
      }
    }
  })
  .catch(err => {
    console.error("Gagal mengambil data:", err);
  });
