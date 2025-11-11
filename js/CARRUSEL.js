/* -------------------------------------------------------------
   Iniciador carrusel & botones
------------------------------------------------------------- */

// Carrusel.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper === 'undefined') {
        console.error('Swiper no está cargado. Revisa el orden de los <script>.');
        return;
    }

    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        loop: true,
    });
});