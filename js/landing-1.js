"use strict";

let mainMenuL1 = document.querySelector(`.main-menu`)
mainMenuL1.classList.add(`fixed-menu-transparent-bg`)

document.addEventListener(`scroll`, function () {

	let offset = window.pageYOffset
	if (offset > 20) {
		mainMenuL1.classList.remove(`fixed-menu-transparent-bg`)
	} else {
		mainMenuL1.classList.add(`fixed-menu-transparent-bg`)
	}
})


let landing1TabsSwiper = new Swiper('.tabs-swiper-container', {
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


let landing1PartnersSwiper = new Swiper('.partners-swiper-container', {
	speed: 400,
	spaceBetween: 30,
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
})


////////////// modal
//
// const l1modalCls = `l1modal`;
// const l1BtnCls = `landing-1__pitch-button`;
// const l1MobBtnCls = `landingmb`;
//
// const l1modalFormCls = `l1modal-form__wrapper`;
// const l1modalThanksCls = `l1modal-thanks__wrapper`;
//
// const l1modalCloseCls = `modal__close`;
// const l1modalSubmitCls = `l1modal-form__submit-btn`;
//
//
// let l1Btn = document.querySelector(`.` + l1BtnCls);
// let l1MobBtn = document.querySelector(`.` + l1MobBtnCls);
// let l1modal = document.querySelector(`.` + l1modalCls);
//
// let l1Submit = l1modal.querySelector(`.` + l1modalSubmitCls);
// let l1Close = l1modal.querySelector(`.` + l1modalCloseCls);
// let l1modalForm = l1modal.querySelector(`.` + l1modalFormCls);
// let l1modalThanks = l1modal.querySelector(`.` + l1modalThanksCls);
//
// l1Btn.addEventListener(`click`, function(e){
// 	e.preventDefault();
// 	l1modal.classList.add(`modal--active`)
// })
//
// l1MobBtn.addEventListener(`click`, function(e){
// 	if (this.dataset.modal == `true`) {
// 		e.preventDefault();
// 		l1modal.classList.add(`modal--active`)
// 	}
// })
//
// l1Submit.addEventListener(`click`, function (e) {
// 	e.preventDefault();
// 	l1modalForm.classList.remove(`modal-wrapper--active`)
// 	l1modalThanks.classList.add(`modal-wrapper--active`)
// })
//
// l1Close.addEventListener(`click`, function(e){
// 	e.preventDefault();
// 	l1modal.classList.remove(`modal--active`)
// 	l1modalForm.classList.add(`modal-wrapper--active`)
// 	l1modalThanks.classList.remove(`modal-wrapper--active`)
// })
//

