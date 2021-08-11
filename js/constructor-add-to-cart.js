"use strict";

function addBoxToCart(obj){
    const {aromas, souvenirs, price, discount, name, code, imgs} = obj

    let ls = localStorage.getItem(`arobombBoxes`)
    if (!ls) {
        let newLs = {
            box1: {aromas, souvenirs, price, discount, name, code, imgs}
        }
        localStorage.setItem(`arobombBoxes`, JSON.stringify(newLs))
    } else {
        ls = JSON.parse(ls);
        let currentNumberOfBoxes = Object.keys(ls).length + 1;
        ls[`box${currentNumberOfBoxes}`] = {aromas, souvenirs, price, discount, name, code, imgs}
        localStorage.setItem(`arobombBoxes`, JSON.stringify(ls))
    }
    refreshCartBadge();
}

function removeBoxFromCart(obj){
    let {lscode} = obj;
    let ls = localStorage.getItem(`arobombBoxes`);
    if (ls) {
        ls = JSON.parse(ls);
        delete ls[lscode];
        if (Object.keys(ls).length === 0 && ls.constructor === Object) {
            localStorage.removeItem('arobombBoxes')
        } else {
            localStorage.setItem(`arobombBoxes`, JSON.stringify(ls));
        }
    }
}
