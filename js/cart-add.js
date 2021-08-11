"use strict";


function addToCart(obj){
    let {code, type, images, price, name} = obj;

    let ls = localStorage.getItem(`arobombCart`)
    if (!ls) {
        let newLs = {
            [code]: {type, images, price, name, quantity: 1},
        }
        localStorage.setItem(`arobombCart`, JSON.stringify(newLs))
    } else {
        ls = JSON.parse(ls);
        if (ls[code]) {
            ls[code].quantity += 1;
            localStorage.setItem(`arobombCart`, JSON.stringify(ls))
        } else {
            ls[code] = {type, images, price, name, quantity: 1};
            localStorage.setItem(`arobombCart`, JSON.stringify(ls))
        }
    }
    refreshCartBadge();
}

function removeFromCart(obj){
    let {code} = obj;
    let ls = localStorage.getItem(`arobombCart`);
    if (ls) {
        ls = JSON.parse(ls);
        delete ls[code];
        if (Object.keys(ls).length === 0 && ls.constructor === Object) {
            localStorage.removeItem('arobombCart')
        } else {
            localStorage.setItem(`arobombCart`, JSON.stringify(ls));
        }
    }
}

function setCartQty(obj, num){
    let {code} = obj;
    let ls = JSON.parse(localStorage.getItem(`arobombCart`));
    ls[code].quantity = +num
    localStorage.setItem(`arobombCart`, JSON.stringify(ls))
}

function updateQty(obj, bool){
    let {code} = obj;
    let ls = JSON.parse(localStorage.getItem(`arobombCart`));
    if (bool) {
        ls[code].quantity += 1
    } else {
        ls[code].quantity -= 1
    }
    localStorage.setItem(`arobombCart`, JSON.stringify(ls))
}
