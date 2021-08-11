"use strict";

let toCartBtnCls = `product__to-cart-btn`;
let buyBtnCls = `product__buy-btn`;
let itemCls = `product__info`

function collectDataCatalog(item){
    return {
        code: item.dataset.code,
        type: item.dataset.type,
        images: [item.dataset.img, item.dataset.retinaimg],
        price: item.dataset.price,
        name: item.dataset.name,
    }
}

let toCartBtn = document.querySelector(`.${toCartBtnCls}`);
let buyBtn = document.querySelector(`.${buyBtnCls}`);

toCartBtn.addEventListener(`click`, function(){
    let item = this.closest(`.${itemCls}`)
    addToCart(collectDataCatalog(item))
})

buyBtn.addEventListener(`click`, function(){
    let item = this.closest(`.${itemCls}`)
    addToCart(collectDataCatalog(item))
    window.location.href = './cart/'
})
