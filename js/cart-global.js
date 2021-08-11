"use strict";

function refreshCartBadge(){
    let cartBadge = document.querySelector(`.main-menu__basket-items`)
    let ls = JSON.parse(localStorage.getItem(`arobombCart`));
    let lsBox = JSON.parse(localStorage.getItem(`arobombBoxes`));
    let cartItems = 0;
    for (const property in ls) {
        cartItems += ls[property].quantity
    }


    if (lsBox) {
        cartItems += Object.keys(lsBox).length
    }


    cartBadge.innerText = cartItems;
    if (cartBadge.innerText == 0) {
        cartBadge.classList.remove(`main-menu__basket-items--active`)
    } else (
        cartBadge.classList.add(`main-menu__basket-items--active`)
    )
}

refreshCartBadge();
