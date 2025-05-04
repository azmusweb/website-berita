const SHEET_URL = 'https://opensheet.elk.sh/128bSvr13vEVS2jKM_f7rFJd7WYit59FwSjKGAe3zCeE/Berita';

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    if (data.length > 0) {
      const headline = data[0];
      document.getElementById('headline').innerHTML = `
        <img src="${headline.gambar}" alt="${headline.judul}" />
        <h2>${headline.judul}</h2>
        <p>${headline.isi.substring(0, 150)}...</p>
      `;
    }

    const beritaList = data.slice(1).map(item => `
      <div class="card">
        <a href="berita.html?slug=${item.slug}">
          <img src="${item.gambar}" alt="${item.judul}" />
          <h3>${item.judul}</h3>
        </a>
        <p>${item.tanggal} - ${item.penulis}</p>
      </div>
    `).join('');

    document.getElementById('berita-list').innerHTML = beritaList;
  });
