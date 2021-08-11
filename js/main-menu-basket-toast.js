"use strict";

let basket = document.querySelector(`.main-menu__basket`)
let basketpopup = basket.querySelector(`.basket-popup`)

const emptyBasket = () => {
    let boxLs = JSON.parse(localStorage.getItem(`arobombBoxes`));
    let ls = JSON.parse(localStorage.getItem(`arobombCart`));
    return (boxLs || ls)
}

const generatePopupEl = (obj, code) => {
    let {images, name, quantity} = obj;
    let newEl = document.createElement(`div`);
    newEl.classList.add(`basket-popup__item`);
    newEl.innerHTML = `<img class="basket-popup__img" src="${images[0]}" alt="">
            <div class="basket-popup__text">
                <span class="basket-popup__title">${quantity} x ${name}</span>
                <span class="basket-popup__code">${code}</span>
            </div>`;
    return newEl;
}

const generatePopupElBox = (obj, code) => {
    let {imgs, name} = obj;
    let newEl = document.createElement(`div`);
    newEl.classList.add(`basket-popup__item`);
    newEl.innerHTML = `<img class="basket-popup__img" src="${imgs[0]}" alt="">
            <div class="basket-popup__text">
                <span class="basket-popup__title">${name}</span>
                <span class="basket-popup__code">${code}</span>
            </div>`;
    return newEl;
}

const populatePopup = () => {
    let boxLs = JSON.parse(localStorage.getItem(`arobombBoxes`));
    let ls = JSON.parse(localStorage.getItem(`arobombCart`));
    // console.log(boxLs)
    // console.log(ls)
    for(const item in boxLs){
        console.log(boxLs[item])
        basketpopup.append(generatePopupElBox(boxLs[item], item));
    }
    for(const item in ls){
        basketpopup.append(generatePopupEl(ls[item], item));
    }
}

basket.addEventListener(`mouseenter`, function(){
    if (document.body.clientWidth > 768 && emptyBasket()) {
        basketpopup.classList.add(`basket-popup--active`);
        populatePopup();
    }
})

basket.addEventListener(`mouseleave`, function(){
    if (document.body.clientWidth > 768) {
        basketpopup.classList.remove(`basket-popup--active`);
        basketpopup.innerHTML = ``;
    }
})
