document.addEventListener('DOMContentLoaded', function(event){
    const url = 'https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
    const input = document.querySelector('.header-item');
    const imgBox = document.querySelector('.main-content-item-box');
    // console.log(url);

    async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        const imageUrl = data.results[0].links.download;
        console.log(imageUrl);
        imgBox.style.backgroundImage = `url(${imageUrl})`;
    }
    getData();

    // imgBox.style.backgroundImage = url('data.results[0].links.download');
});