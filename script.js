const sheetID = "128bSvr13vEVS2jKM_f7rFJd7WYit59FwSjKGAe3zCeE";
const sheetName = "Sheet1";
const url = `https://opensheet.elk.sh/${sheetID}/${sheetName}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const beritaList = document.getElementById("berita-list");
    const beritaDetail = document.getElementById("berita-detail");
    const breakingText = document.getElementById("breaking-text");
    const sliderWrapper = document.getElementById("slider-wrapper");
    const searchInput = document.getElementById("search-input");
    const kategoriLinks = document.querySelectorAll(".kategori-link");

    if (breakingText && data.length > 0) {
      breakingText.textContent = `Breaking News: ${data[data.length - 1].judul}`;
    }

    if (sliderWrapper) {
      const topSlider = data.slice(-3).reverse();
      topSlider.forEach(item => {
        const img = document.createElement("img");
        img.src = item.gambar || 'https://via.placeholder.com/600x300?text=No+Image';
        img.alt = item.judul;
        sliderWrapper.appendChild(img);
      });
    }

    const renderBerita = (filteredData) => {
      beritaList.innerHTML = '';
      filteredData.reverse().forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "berita-card";
        card.innerHTML = `
          <img src="${item.gambar || 'https://via.placeholder.com/600x300?text=No+Image'}
