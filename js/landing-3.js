"use strict";

let mainMenuL3 = document.querySelector(`.main-menu`)
mainMenuL3.classList.add(`fixed-menu-transparent-bg`)
mainMenuL3.classList.add(`main-menu--white-text`)

document.addEventListener(`scroll`, function () {
    let offset = window.pageYOffset
    if (offset > 20) {
        mainMenuL3.classList.remove(`fixed-menu-transparent-bg`)
        mainMenuL3.classList.remove(`main-menu--white-text`)
    } else {
        mainMenuL3.classList.add(`fixed-menu-transparent-bg`)
        mainMenuL3.classList.add(`main-menu--white-text`)
    }
})

let landing3TabsSwiper = new Swiper('.landing3-swiper-container', {
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


const videoBtn = document.querySelector(`.landing3__video-play-btn`);
const videoModal = document.querySelector(`.landing3__video-modal`);
const video = videoModal.querySelector(`iframe`);
const videoBackdrop = document.querySelector(`.landing3__video-backdrop`);
const videoCloseBtn = document.querySelector(`.landing3__video-close`);
const videoLink = videoModal.querySelector(`iframe`).getAttribute(`src`);


const videoClose = function(){
    videoModal.classList.remove(`landing3__video-modal--active`)
    video.remove();
};

videoBtn.addEventListener(`click`, function () {
    videoModal.classList.add(`landing3__video-modal--active`)
    if (!videoModal.contains(video)) {
        videoModal.appendChild(video);
    }
})

// videoMobileBtn.addEventListener(`click`, function () {
//     videoModal.classList.add(`landing3__video-modal--active`)
//     indexSwiper.autoplay.stop();
//     if (!videoModal.contains(video)) {
//         videoModal.appendChild(video);
//     }
//     // window.location.href =  videoLink;
// })

videoBackdrop.addEventListener(`click`, videoClose);

videoCloseBtn.addEventListener(`click`, videoClose);
