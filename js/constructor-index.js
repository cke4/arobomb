"use strict";

const mobBtnCls = `constructor__box-mobile-selector-span`;

let constructorBlobs = document.querySelectorAll(`.constructor-blob-svg`);

constructorBlobs.forEach(function (blob) {
    let parent = blob.parentElement;
    let animate = blob.querySelector(`animate`)
    parent.addEventListener(`mouseenter`, function(){
        if (blob.animationsPaused()) {
            blob.unpauseAnimations();
        } else {
            animate.beginElement();
        }
    })

    parent.addEventListener(`mouseleave`, function(){
        blob.pauseAnimations();
    })
})

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

let mobileBtns = document.querySelectorAll(`.${mobBtnCls}`);
let box1 = document.querySelector(`.js-box-1-mobile`);
let box2 = document.querySelector(`.js-box-2-mobile`);
let info1 = document.querySelector(`.constructor__box-info--1`);
let info2 = document.querySelector(`.constructor__box-info--2`);
let blob1 = document.querySelector(`.constructor__blob-btn--1`);
let blob2 = document.querySelector(`.constructor__blob-btn--2`);
let mobileProceedBtn = document.querySelector(`.constructor__index-mobile-btn`)

mobileProceedBtn.addEventListener(`click`, function () {
    currentBox.price = currentBoxType.price
    currentBox.discount = currentBoxType.discount
    currentBox.name = currentBoxType.name
    currentBox.code = currentBoxType.code
    currentBox.imgs = currentBoxType.imgs
    goToStep2();
})


mobileBtns.forEach(function(btn){
    btn.addEventListener(`click`, function(evt){
        evt.preventDefault();
        let type = this.dataset.boxtype;
        let isActive = this.classList.contains(`${mobBtnCls}--active`);
        if (type == "small" && !isActive) {
            box1.classList.add(`js-box-1-mobile-active`)
            box1.classList.remove(`js-box-1-mobile-inactive`)
            box2.classList.remove(`js-box-2-mobile-active`)
            box2.classList.add(`js-box-2-mobile-inactive`)
            info1.classList.add(`js-info-mobile-active`)
            info2.classList.remove(`js-info-mobile-active`)
            currentBoxType = boxTypes.small;
        } else if (type == "big" && !isActive) {
            box2.classList.add(`js-box-2-mobile-active`)
            box2.classList.remove(`js-box-2-mobile-inactive`)
            box1.classList.remove(`js-box-1-mobile-active`)
            box1.classList.add(`js-box-1-mobile-inactive`)
            info2.classList.add(`js-info-mobile-active`)
            info1.classList.remove(`js-info-mobile-active`)
            currentBoxType = boxTypes.big;
        }

        mobileBtns.forEach(function (mbBtn) {
            mbBtn.classList.remove(`${mobBtnCls}--active`)
        })
        this.classList.add(`${mobBtnCls}--active`);

    })
})

box1.addEventListener(`click`, function(){
    if (box1.classList.contains(`js-box-1-mobile-inactive`)) {
        box1.classList.add(`js-box-1-mobile-active`)
        box1.classList.remove(`js-box-1-mobile-inactive`)
        box2.classList.remove(`js-box-2-mobile-active`)
        box2.classList.add(`js-box-2-mobile-inactive`)
        info1.classList.add(`js-info-mobile-active`)
        info2.classList.remove(`js-info-mobile-active`)
        currentBoxType = boxTypes.small;
        mobileBtns.forEach(function (mbBtn) {
            if (mbBtn.dataset.boxtype !== "small") {
                mbBtn.classList.remove(`${mobBtnCls}--active`)
            } else {
                mbBtn.classList.add(`${mobBtnCls}--active`)
            }
        })
    }
})

box2.addEventListener(`click`, function(){
    if (box2.classList.contains(`js-box-2-mobile-inactive`)) {
        box2.classList.add(`js-box-2-mobile-active`)
        box2.classList.remove(`js-box-2-mobile-inactive`)
        box1.classList.remove(`js-box-1-mobile-active`)
        box1.classList.add(`js-box-1-mobile-inactive`)
        info2.classList.add(`js-info-mobile-active`)
        info1.classList.remove(`js-info-mobile-active`)
        currentBoxType = boxTypes.big;
        mobileBtns.forEach(function (mbBtn) {
            if (mbBtn.dataset.boxtype !== "big") {
                mbBtn.classList.remove(`${mobBtnCls}--active`)
            } else {
                mbBtn.classList.add(`${mobBtnCls}--active`)
            }
        })
    }
})

blob1.addEventListener(`click`, function () {
    currentBox.price = currentBoxType.price
    currentBox.discount = currentBoxType.discount
    currentBox.name = currentBoxType.name
    currentBox.code = currentBoxType.code
    currentBox.imgs = currentBoxType.imgs
    goToStep2()
})

blob2.addEventListener(`click`, function () {
    currentBoxType = boxTypes.big;
    currentBox.price = currentBoxType.price
    currentBox.discount = currentBoxType.discount
    currentBox.name = currentBoxType.name
    currentBox.code = currentBoxType.code
    currentBox.imgs = currentBoxType.imgs
    goToStep2()
})
