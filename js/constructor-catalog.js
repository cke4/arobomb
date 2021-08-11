"use strict";

const itemCls = `catalog__item`;
const addLinkCls = `catalog__item-link`;
const subMenuCls = `constructor__tab-submenu-item`;


const addLinkText = [`выбрать +`, `добавить +`]

function countItems(type){
    let currentProductCount = 0;
    for (const id in currentBox[type]) {
        currentProductCount += currentBox[type][id].quantity
    }
    return currentProductCount;
}

function addThis(item){
    let id = item.dataset.code
    let img = item.dataset.img
    let retina = item.dataset.retinaimg
    let type = item.dataset.type
    let name = item.dataset.name
    if (currentBox[type][id]) {
        currentBox[type][id].quantity += 1;
    } else {
        currentBox[type][id] = {
            id: id,
            img: img,
            retina: retina,
            name: name,
            quantity: 1,
        }
    }
}

function removeThis(item){
    let id = item.dataset.code
    let type = item.dataset.type
    if (currentBox[type][id].quantity > 1) {
        currentBox[type][id].quantity -= 1
    } else {
        delete currentBox[type][id]
    }
}

function filter(){
    items.forEach(function (item) {
        item.classList.remove(`${itemCls}--active`)
    });
    if (currentStep == 2) {
        items.forEach(function (item) {
            let itemType = item.dataset.type
            if (itemType == `souvenirs`) {
                let timeout = window.setTimeout(function () {
                    item.classList.add(`${itemCls}--active`);
                }, 10)
            }
        })
    } else if(currentStep == 3){
        items.forEach(function (item) {
            let itemType = item.dataset.type
            if (itemType == `aromas`) {
                let timeout = window.setTimeout(function () {
                    item.classList.add(`${itemCls}--active`);
                }, 10)
            }
        })
    }
}


let items = document.querySelectorAll(`.${itemCls}`)
let submenuBtns = document.querySelectorAll(`.${subMenuCls}`)

items.forEach(function(item){
    item.querySelector(`.catalog__item-link--add`).addEventListener(`click`, function(evt){
        evt.preventDefault();
        let addBtn = item.querySelector(`.${addLinkCls}`);
        let type = item.dataset.type
        let id = item.dataset.code;
        // let isSelected = item.classList.contains(`${itemCls}--selected`)
        let currentProductCount = countItems(type);
        let isObjNotFull = currentProductCount < currentBoxType[type]
        if (isObjNotFull){
            addThis(item)
            updateUI()
            addBtn.innerText = addLinkText[1]
            item.classList.add(`${itemCls}--selected`);
        }
    })
    item.querySelector(`.catalog__item-link--remove`).addEventListener(`click`, function(evt){
        evt.preventDefault();
        let type = item.dataset.type;
        let id = item.dataset.code;
        let currentProductCount = countItems(type);
        let addBtn = item.querySelector(`.${addLinkCls}`);
        removeThis(item)
        updateUI()
        if (!currentBox[type][id]) {
            addBtn.innerText = addLinkText[0]
            item.classList.remove(`${itemCls}--selected`);
        }
    })
})

submenuBtns.forEach(function(item){
    item.addEventListener(`click`, function(){
        let subType = item.dataset.subtype
        console.log(subType)
        submenuBtns.forEach(function (sbmbtn) {
            sbmbtn.classList.remove(`${subMenuCls}--active`)
        })
        item.classList.add(`${subMenuCls}--active`)
        items.forEach(function (itemIn) {
            let itemType = itemIn.dataset.subtype
            console.log(itemType)
            itemIn.classList.remove(`${itemCls}--active`)
            if (itemType == subType) {
                console.log(itemIn)
                let timeout = window.setTimeout(function () {
                    itemIn.classList.add(`${itemCls}--active`);
                }, 50)
            }
        })
    }, true)

})

