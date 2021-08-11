"use strict";

const calculatorBlockCls = `pcalculator`;
const currentValueCls = `pcalculator__current-value`;
const partnersId = `pcalc-partners`;
const investId = `pcalc-invest`;
const moSalesId = `pcalc-mosales`;
const profitId = `pcalc-profit`;

let mainMenuL2 = document.querySelector(`.main-menu`)
mainMenuL2.classList.add(`fixed-menu-transparent-bg`)

document.addEventListener(`scroll`, function () {
    let offset = window.pageYOffset
    if (offset > 20) {
        mainMenuL2.classList.remove(`fixed-menu-transparent-bg`)
    } else {
        mainMenuL2.classList.add(`fixed-menu-transparent-bg`)
    }
})


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// каждые 100к = 20 партнеров
// партнеры  * 4к = вложения
// продажи = партнеры * 25?
// прибыль продажи * 60рублей?

function updateCalculations(valueStr, obj) {
    let {partnersEl, investEl, moSalesEl, profitEl} = obj
    let value = +valueStr.replace(',', '')
    let partners = value / 100000 * 20
    let investment = partners * 4000
    let sales = partners * 25
    let profit = sales * 60
    partnersEl.innerText = partners;
    //investEl.innerText = `${numberWithCommas(investment)} р.`
    moSalesEl.innerText = sales;
    profitEl.innerText = `${numberWithCommas(profit)} р.`
}


let currentValue = document.querySelector(`.${currentValueCls}`);
let updateObj = {
    partnersEl: document.querySelector(`#${partnersId}`),
    investEl: document.querySelector(`#${investId}`),
    moSalesEl: document.querySelector(`#${moSalesId}`),
    profitEl: document.querySelector(`#${profitId}`),
}

var calcSlider = new rSlider({
    target: '#calculator-range',
    values: [`100,000`, `150,000`, `200,000`, `250,000`, `300,000`, `350,000`, `400,000`, `450,000`, `500,000`],
    range: false,
    tooltip: false,
    scale: false,
    labels: true,
    set: [`200,000`],
    onChange: function(vals) {
        currentValue.innerText = vals
        updateCalculations(vals, updateObj)
    }
});

///////////////////////////////////////
//////////// SLIDER ///////////////////
///////////////////////////////////////

let sliderWrapCls = `landing-2__header-slider-wrapper`;
let paginationCls = `landing-2__header-slider-pagination`;

function switchPagination(paginations, num){
    paginations.forEach(function (el) {
        el.classList.remove(`${paginationCls}--active`)
    })
    let activeTab = [...paginations].filter(thistab => thistab.dataset.slide == +num)[0];
    activeTab.classList.add(`${paginationCls}--active`)
}

const l2sliderParams = {
    speed: 500,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 4200,
    },
    loop: true,
    // preloadImages: false,
    // // Enable lazy loading
    // lazy: true,
    on: {
        init: function () {

        },
        slideChangeTransitionEnd: function () {
            let activeSlideNum = this.$el[0].querySelector('.swiper-slide-active').getAttribute('data-swiper-slide-index')
            switchPagination(paginations, activeSlideNum)
        }
    },
};

let sliderEl = document.querySelector(`.${sliderWrapCls}`);
let paginations = sliderEl.querySelectorAll(`.${paginationCls}`);
let l2slider = new Swiper('.landing-2__header-slider', l2sliderParams);



paginations.forEach(function(el){
    el.addEventListener('click', function(){
        let slideNum = this.dataset.slide
        l2slider.slideToLoop(+slideNum)
        switchPagination(paginations, slideNum)
    })
})

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
