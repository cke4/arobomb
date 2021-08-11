let landing1TabsSwiper = new Swiper('.constructor-landing-swiper-container', {
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 45,
    observer: true,
    centeredSlides: false,
    grabCursor: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        500: {
            slidesPerView: 3,
            centeredSlides: true,
        },

        600: {
            slidesPerView: 4,
            centeredSlides: false,
        },

        900: {
            slidesPerView: 5,
            centeredSlides: true,
        }
    }
});


let constructorLandingSwiper = new Swiper('.constructor-landing__landing-mob-slider', {
    speed: 400,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    }
});
