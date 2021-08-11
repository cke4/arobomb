"use strict";

let addToCartLinkCls = `catalog__item-link`;
let itemCls = `catalog__item`;

function collectDataCatalog(item){
    return {
        code: item.dataset.code,
        type: item.dataset.type,
        images: [item.dataset.img, item.dataset.retinaimg],
        price: item.dataset.price,
        name: item.dataset.name,
    }
}

function animateAdding(item){
    let toast = item.querySelector(`.catalog__item-toast`);
    let img = item.querySelector(`.catalog__item-img`);
    toast.classList.add(`catalog__item-toast--active`);
    img.classList.add(`catalog__item-img--hidden`);
    let timeout = window.setTimeout(function(){
        toast.classList.remove(`catalog__item-toast--active`);
        img.classList.remove(`catalog__item-img--hidden`);
    }, 2000)

}

let addToCartLinks = document.querySelectorAll(`.${addToCartLinkCls}`)

addToCartLinks.forEach(function(el){
    el.addEventListener(`click`, function(evt){
        evt.preventDefault();
        let item = el.closest(`.${itemCls}`);
        animateAdding(item);
        addToCart(collectDataCatalog(item));
    })
})
