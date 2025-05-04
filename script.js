const SHEET_URL = 'https://opensheet.elk.sh/128bSvr13vEVS2jKM_f7rFJd7WYit59FwSjKGAe3zCeE/Berita';

// Ambil data berita dari Spreadsheet
fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    // Tampilkan berita utama (headline) di halaman utama
    if (data.length > 0) {
      const headline = data[0]; // Berita pertama untuk headline
      document.getElementById('headline').innerHTML = `
        <img src="${headline.gambar}" alt="${headline.judul}" />
        <h2>${headline.judul}</h2>
        <p>${headline.isi.substring(0, 150)}...</p>
      `;
    }

    // Tampilkan daftar berita lainnya di grid
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

// Ambil data berita berdasarkan slug (untuk halaman detail berita)
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

if (slug) {
  fetch(SHEET_URL)
    .then(res => res.json())
    .then(data => {
      const beritaDetail = data.find(item => item.slug === slug);
      if (beritaDetail) {
        document.getElementById('berita-detail').innerHTML = `
          <h1>${beritaDetail.judul}</h1>
          <p><strong>${beritaDetail.tanggal}</strong> | ${beritaDetail.penulis}</p>
          <img src="${beritaDetail.gambar}" alt="${beritaDetail.judul}" />
          <p>${beritaDetail.isi}</p>
        `;
      } else {
        document.getElementById('berita-detail').innerHTML = '<p>Berita tidak ditemukan.</p>';
      }
    });
}
