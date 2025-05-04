// script.js
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

    if (breakingText && data.length > 0) {
      breakingText.textContent = `
