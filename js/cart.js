"use strict";

let cartTabsCls = 'cart__tab' ;
let cartTabContentCls = 'cart__tab-content';
let proceedBtnCls = `cart__total-price-proceed-btn`;
let emptyCartCls = `cart__cart-empty`;
let totalPrice1ElCls = `cart__total-price-value`;
let totalPrice1Cls = `cart__total-price-number`;
let totalPrice1DiscountedValueCls = `cart__total-price-discount-number`;
let totalPrice1DiscountedCls = `cart__total-price-discount`;
let totalPrice1GainValueCls = `cart__total-price-gain-number`;
let totalPrice1GainCls = `cart__total-price-gain`;
let totalPrice2Cls = `cart-form__price-amount-number`;
let hiddenInputCartCls = `cart-hidden-input--cart`;
let hiddenInputBoxCls = `cart-hidden-input--boxes`;
let hiddenInputPriceCls = `cart-hidden-input--price`;
let paywithcardcls = `cart-form__submit-btn-wrap`;
let cartmodalCls = `cart-modal`

const showTabContent = (tab) => {
    const contentTabs = document.querySelectorAll('.' + cartTabContentCls);
    let contentToShow = [...contentTabs].filter(thistab => thistab.dataset.tabcontent == tab.dataset.tab)[0]
    hideTabContent(tab);
    contentToShow.classList.add(cartTabContentCls + '--active')
    if (tab.dataset.tab == 2) {
        tab.classList.add(cartTabsCls + '--active')
    }
}

const hideTabContent = (clickTab) => {
    const contentTabs = document.querySelectorAll('.' + cartTabContentCls);
    const tabs = document.querySelectorAll('.' + cartTabsCls);
    let contentToHide = [...contentTabs].filter(thistab => thistab.dataset.tabcontent != clickTab.dataset.tab)[0]
    contentToHide.classList.remove(cartTabContentCls + '--active')
    if (clickTab.dataset.tab == 1) {
        const tabToClass = [...tabs].filter(thistab => thistab.dataset.tab == 2)[0]
        tabToClass.classList.remove(cartTabsCls + '--active')
    }
}

let tabSwitches = document.querySelectorAll('.' + cartTabsCls);
let proceedBtn = document.querySelector(`.${proceedBtnCls}`)
let emptyCartWarning = document.querySelector(`.${emptyCartCls}`)
let totalPrice1 = document.querySelector(`.${totalPrice1Cls}`)
let totalPrice2 = document.querySelector(`.${totalPrice2Cls}`)
let totalPrice1El = document.querySelector(`.${totalPrice1ElCls}`)
let totalPrice1DiscountedValue= document.querySelector(`.${totalPrice1DiscountedValueCls}`)
let totalPrice1Discounted= document.querySelector(`.${totalPrice1DiscountedCls}`)
let totalPrice1GainValue = document.querySelector(`.${totalPrice1GainValueCls}`)
let totalPrice1Gain = document.querySelector(`.${totalPrice1GainCls}`)

showTabContent(tabSwitches[0])

tabSwitches.forEach((tabSwitch) => {
    tabSwitch.addEventListener('click', function(){
        showTabContent(this)
    });
})

proceedBtn.addEventListener(`click`, function (evt) {
    showTabContent(tabSwitches[1])
})


/////////////////////////////////
///////// generating products ///
/////////////////////////////////

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function removeSpaces(x) {
    return x.toString().replace(/\s/g, '');
}

function generateCartHiddenText(obj){
    let text = ``;
    for (const item in obj){
        if (obj.hasOwnProperty(item)) {
            text += `${item}: ${obj[item].quantity}; `
        }
    }
    hiddenInputCart.value = text;
}

function generateBoxesHiddenText(obj){
    let text = ``;
    for (const box in obj){
        if (obj.hasOwnProperty(box)) {
            text += `${box}: Souvenirs: `
            const aromas = obj[box].aromas
            const souvenirs = obj[box].souvenirs

            for (const souv in souvenirs) {
                if (souvenirs.hasOwnProperty(souv)) {
                    text += `${souv}: ${souvenirs[souv].quantity}; `
                }
            }

            text += `Aromas: `
            for (const aroma in aromas) {
                if (aromas.hasOwnProperty(aroma)) {
                    text += `${aroma}: ${aromas[aroma].quantity}; `
                }
            }

        }
    }

    hiddenInputBoxes.value = text;
}

function collectData(item){
    return {
        code: item.dataset.code,
        type: item.dataset.type,
        images: [item.dataset.img, item.dataset.retinaImg],
        price: item.dataset.price,
        name: item.dataset.name,
    }
}

function collectBoxData(item){
    return {
        lscode: item.dataset.lscode,
        type: item.dataset.type,
        images: [item.dataset.img, item.dataset.retinaImg],
        price: item.dataset.price,
        name: item.dataset.name,
    }
}


function countPrice(){
    let totalPrice = 0;
    let totalDiscount = 0;
    let items = document.querySelectorAll(`.cart__item`);
    hideDiscountPrice()
    items.forEach(function(el){
        if (el.dataset.type == 'box') {
            let price = parseInt(el.dataset.price);
            let discount = parseInt(el.dataset.discount);
            totalPrice += price;
            totalDiscount += discount;
            showDiscountPrice();
        } else {
            let price = parseInt(el.dataset.price);
            let value = parseInt(el.querySelector('input').value);
            totalPrice += price * value;
        }
    })
    totalPrice2.innerText = numberWithSpaces(totalPrice - totalDiscount);
    totalPrice1.innerText = numberWithSpaces(totalPrice);
    totalPrice1DiscountedValue.innerText = numberWithSpaces(totalPrice - totalDiscount);
    totalPrice1GainValue.innerText = numberWithSpaces(totalDiscount);
    hiddenInputPrice.value = totalPrice - totalDiscount;
}

function showDiscountPrice(){
    totalPrice1El.classList.add(`${totalPrice1ElCls}--discount`)
    totalPrice1Gain.classList.add(`${totalPrice1GainCls}--active`)
    totalPrice1Discounted.classList.add(`${totalPrice1DiscountedCls}--active`)
}

function hideDiscountPrice(){
    totalPrice1El.classList.remove(`${totalPrice1ElCls}--discount`)
    totalPrice1Gain.classList.remove(`${totalPrice1GainCls}--active`)
    totalPrice1Discounted.classList.remove(`${totalPrice1DiscountedCls}--active`)
}

function createBoxEl(obj){
    const {id, img, retina, name, quantity} = obj
    const quantityMarkup = quantity > 1 ? `${quantity} x ` : ``
    return `<li class="cart__item-list-item">
                <figure>
                    <img src="${img}" srcset="${img}, ${retina} 2x" alt="">
                </figure>
                <div class="cart__item-list-text">
                    <span class="cart__item-list-title">${quantityMarkup}${name}</span>
                    <span class="cart__item-list-code">Арт. ${id}</span>
                </div>
            </li>`
}

function createBox(obj, lscode){
    let {aromas, souvenirs, price, discount, name, code, imgs} = obj;
    let newEl = document.createElement(`div`);
    let aromasMarkup = ``;
    let souvenirsMarkup = ``;
    for (const souvenir in souvenirs) {
        if (souvenirs.hasOwnProperty(souvenir)) {
            souvenirsMarkup += createBoxEl(souvenirs[souvenir]);
        }
    }
    for (const aroma in aromas) {
        if (aromas.hasOwnProperty(aroma)) {
            aromasMarkup += createBoxEl(aromas[aroma]);
        }
    }

    newEl.innerHTML = `<div class="cart__item cart__item--box" data-type="box" data-lscode="${lscode}" data-img="${imgs[0]}" data-retinaImg="${imgs[1]}" data-price="${price}" data-discount="${discount}" data-name="${name}">
                        <figure class="cart__item-img-wrap">
                            <img srcset="${imgs[0]}, ${imgs[1]}" 
                                src="${imgs[0]}" 
                                alt="${name}" 
                                class="cart__item-img">
                        </figure>
                        <div class="cart__item-text">
                            <span class="cart__item-name">${name}</span>
                            <span class="cart__item-price-block">
                                <span class="cart__item-price cart__item-price--crossed"><span class="cart__item-price-value">${price}</span> р.</span>
                                <span class="cart__item-price cart__item-price--discount"><span class="cart__item-price-value">${price - discount}</span> р.</span>
                            </span>
                            <span class="cart__item-code">
                                Арт.
                                <span class="cart__item-code-value">${code}</span>
                            </span>
                        </div><button type="button" class="cart__item-close">
                            <svg viewBox="0 0 30 30" width="30" height="30" class="svg-circle-close">
                                <use xlink:href="#circle-close"></use>
                            </svg>
                        </button>
                        <ul class="cart__item-list">
                        ${souvenirsMarkup}
                        ${aromasMarkup}
                        </ul>
                        <div class="cart__item-list-collapse"></div>
                    </div>`

    let close = newEl.querySelector(`.cart__item-close`);
    let item = newEl.querySelector(`.cart__item`);
    let collapse = newEl.querySelector(`.cart__item-list-collapse`);
    let list = newEl.querySelector(`.cart__item-list`);

    collapse.addEventListener(`click`, function (evt) {
        list.classList.toggle(`cart__item-list--active`)
        collapse.classList.toggle(`cart__item-list-collapse--active`)
    })

    close.addEventListener(`click`, function (evt) {
        let _this = this;
        item.remove()
        removeBoxFromCart(collectBoxData(item));
        refreshCartBadge();
        if (isCartEmpty()) {
            disablePayment();
        }
        countPrice();
        let boxLs = JSON.parse(localStorage.getItem(`arobombBoxes`));
        generateBoxesHiddenText(boxLs)
    })

    return newEl.firstChild
}

function createItem(obj, code){
    let {type, images, price, name, quantity} = obj;
    let totalPrice = parseInt(price) * quantity;
    let newEl = document.createElement(`div`);
    newEl.innerHTML = `<div class="cart__item" data-type="${type}" data-code="${code}" data-img="${images[0]}" data-retinaImg="${images[2]}" data-price="${price}" data-name="${name}">
                        <figure class="cart__item-img-wrap">
                            <img srcset="${images[0]}, ${images[1]} 2x" src="${images[0]}" alt="${name}" class="cart__item-img">
                        </figure>
                        <div class="cart__item-text">
                            <span class="cart__item-name">${name}</span>
                            <span class="cart__item-price"><span class="cart__item-price-value">${price}</span> р.</span>
                            <span class="cart__item-code">
                                Арт.
                                <span class="cart__item-code-value">${code}</span>
                            </span>
                        </div>
                        <div class="cart__item-ui">
                            <span class="cart__item-ui-text">кол.во</span>
                            <div class="cart__item-ui-wrap">
                                <button type="button" class="cart__item-btn cart__item-btn--remove">
                                    <svg width="28" height="8" viewBox="0 0 28 8" class="">
                                        <use xlink:href="#btn-arrow"></use>
                                    </svg>
                                </button>
                                <input type="text" class="cart__item-number" value="${quantity}">
                                <button type="button" class="cart__item-btn cart__item-btn--add">
                                    <svg width="28" height="8" viewBox="0 0 28 8" class="">
                                        <use xlink:href="#btn-arrow"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button type="button" class="cart__item-close">
                            <svg viewBox="0 0 30 30" width="30" height="30" class="svg-circle-close">
                                <use xlink:href="#circle-close"></use>
                            </svg>
                        </button>
                    </div>`

    let close = newEl.querySelector(`.cart__item-close`)
    let input = newEl.querySelector(`.cart__item-number`)
    let initValue = parseInt(input.value);
    let add = newEl.querySelector(`.cart__item-btn--add`)
    let remove = newEl.querySelector(`.cart__item-btn--remove`)
    let item = newEl.querySelector(`.cart__item`)

    if (input.value >= 9999) {
        add.classList.add(`cart__item-btn--disabled`);
    } else if (input.value == 1) {
        remove.classList.add(`cart__item-btn--disabled`);
    }

    close.addEventListener(`click`, function (evt) {
        let _this = this;
        item.remove()
        removeFromCart(collectData(item));
        refreshCartBadge();
        if (isCartEmpty()) {
            disablePayment();
        }
        let cartLs = JSON.parse(localStorage.getItem(`arobombCart`));
        generateCartHiddenText(cartLs)
        countPrice();
    })

    input.addEventListener(`change`, function (evt) {
        let value = parseInt(evt.target.value);
        if (value >= 9999) {
            value = 9999;
            add.classList.add(`cart__item-btn--disabled`);
        } else if (value <= 1) {
            value = 1;
            remove.classList.add(`cart__item-btn--disabled`);
            add.classList.remove(`cart__item-btn--disabled`);
        } else {
            add.classList.remove(`cart__item-btn--disabled`)
            remove.classList.remove(`cart__item-btn--disabled`);
        }
        evt.target.value = value
        countPrice();
        initValue = value;
        setCartQty(collectData(item), value)
        let cartLs = JSON.parse(localStorage.getItem(`arobombCart`));
        generateCartHiddenText(cartLs)
    })

    add.addEventListener(`click`, function(evt){
        remove.classList.remove(`cart__item-btn--disabled`);
        let oldValue = parseInt(input.value)
        input.value = parseInt(oldValue + 1)
        if (input.value >= 9999) {
            input.value = 9999;
            add.classList.add(`cart__item-btn--disabled`);
        }
        countPrice();
        updateQty(collectData(item), true)
        let cartLs = JSON.parse(localStorage.getItem(`arobombCart`));
        generateCartHiddenText(cartLs)
    })

    remove.addEventListener(`click`, function(evt){
        add.classList.remove(`cart__item-btn--disabled`);
        let oldValue = parseInt(input.value)
        input.value = parseInt(oldValue - 1)
        if (input.value <= 1) {
            input.value = 1;
            remove.classList.add(`cart__item-btn--disabled`);
        }
        countPrice();
        updateQty(collectData(item), false)
        let cartLs = JSON.parse(localStorage.getItem(`arobombCart`));
        generateCartHiddenText(cartLs)
    })

    return newEl.firstChild
}

let boxLs = JSON.parse(localStorage.getItem(`arobombBoxes`));
let ls = JSON.parse(localStorage.getItem(`arobombCart`));
let cartItems = document.querySelector(`.cart__items`);
let hiddenInputCart = document.querySelector(`.${hiddenInputCartCls}`);
let hiddenInputBoxes = document.querySelector(`.${hiddenInputBoxCls}`);
let hiddenInputPrice = document.querySelector(`.${hiddenInputPriceCls}`);
let payWithCardBtn = document.querySelector(`.${paywithcardcls}`);
let cartModal = document.querySelector(`.${cartmodalCls}`);
let cartModalClose = cartModal.querySelector(`.modal__close`)

if (boxLs){
    generateBoxesHiddenText(boxLs)
    for (const property in boxLs) {
        if (boxLs.hasOwnProperty(property)) {
            cartItems.append(createBox(boxLs[property], property));
        }
    }
    enablePayment();
    countPrice();
}

if (ls) {
    generateCartHiddenText(ls)
    for (const property in ls) {
        if (ls.hasOwnProperty(property)) {
            cartItems.append(createItem(ls[property], property));
        }
    }
    enablePayment();
    countPrice();
}

payWithCardBtn.addEventListener(`click`, function (evt) {
    cartModal.classList.toggle(`modal--active`)
})

cartModalClose.addEventListener(`click`, function (evt) {
    cartModal.classList.remove(`modal--active`)
})

//////////////////////////////////
///// enable/disable payment /////
//////////////////////////////////


function isCartEmpty(){
    return !Boolean(document.querySelector(`.cart__item`));
}

function disablePayment(){
    tabSwitches[1].classList.add(`${cartTabsCls}--disabled`);
    proceedBtn.classList.add(`btn--disabled`);
    emptyCartWarning.classList.add(`${emptyCartCls}--active`);
}

function enablePayment(){
    tabSwitches[1].classList.remove(`${cartTabsCls}--disabled`);
    proceedBtn.classList.remove(`btn--disabled`);
    emptyCartWarning.classList.remove(`${emptyCartCls}--active`);
}


function arrayReplace(array, elemToReplace, substitutionElem) {
    //  write code here.
    for (let i = 0; i < array.length; i++) {

        if (array[i] == elemToReplace) {
            array[i] = substitutionElem;
        }
    }
    return array;
}


/////////////////////////////
///// form validation ///////
/////////////////////////////

const cartFileUploadWrapCls = `cart-form__upload-wrap`;
const cartFileUploadInputCls = `cart-form__upload`;
const cartFormCls = `cart__form`;
const cartFormNameId = `cart-form-name`;
const cartFormTelId = `cart-form-tel`;
const cartFormEmailId = `cart-form-email`;
const cartFormAddressId = `cart-form-address`;
const cartFormCheckboxId = `cart-form-checkbox`;

function validatePhone(phoneEl) {
    let phone = phoneEl.value,
        numbers = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
    if(phone.match(numbers)) {
        return phone
    } else {
        return false
    }
}

function validateEmail(emailEl) {
    let email = emailEl.value,
        numbers = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if(email.match(numbers)) {
        return email
    } else {
        return false
    }
}


let cartForm = document.querySelector(`.${cartFormCls}`);
let cartFormUpload = cartForm.querySelector(`.${cartFileUploadInputCls}`);
let cartFormUploadWrap = cartForm.querySelector(`.${cartFileUploadWrapCls}`);
let validator = [];

let cartFormName = cartForm.querySelector(`#${cartFormNameId}`);
let cartFormTel = cartForm.querySelector(`#${cartFormTelId}`);
let cartFormEmail = cartForm.querySelector(`#${cartFormEmailId}`);
let cartFormAddress = cartForm.querySelector(`#${cartFormAddressId}`);
let cartFormCheckbox = cartForm.querySelector(`#${cartFormCheckboxId}`);

let buttons = cartForm.querySelectorAll(`button`)

let inputs = cartForm.querySelectorAll(`[required]`)

cartFormUpload.addEventListener(`change`, function(){
    cartFormUploadWrap.classList.add(`${cartFileUploadWrapCls}--active`)
})


inputs.forEach(function (input) {
    let value = (input.dataset.validity == "true");
    validator.push(value);
})

cartForm.addEventListener(`change`, function(){
    console.log(validator)
    if (!validator.includes(false)) {
        buttons.forEach(function(btn){
            btn.disabled = false;
        })
    } else {
        buttons.forEach(function(btn){
            btn.disabled = true;
        })
    }
})

cartFormName.addEventListener(`change`, function(){
    let wrapper = this.parentNode;
    if (this.value.length < 2) {
        wrapper.classList.add(`cart-form__input-wrap--error`)
        this.value = ``
        this.placeholder = `заполните это поле`
        validator[0] = false
        this.dataset.validity = "false"
    } else {
        wrapper.classList.remove(`cart-form__input-wrap--error`)
        validator[0] = true
        this.dataset.validity = "true"
    }
})

cartFormTel.addEventListener(`change`, function(){
    let wrapper = this.parentNode;
    if (!validatePhone(this)) {
        wrapper.classList.add(`cart-form__input-wrap--error`)
        this.value = ``
        this.placeholder = `введите правильный телефон`
        validator[1] = false
        this.dataset.validity = "false"
    } else {
        wrapper.classList.remove(`cart-form__input-wrap--error`)
        validator[1] = true
        this.dataset.validity = "true"
    }
})

cartFormEmail.addEventListener(`change`, function(){
    let wrapper = this.parentNode;
    if (!validateEmail(this)) {
        wrapper.classList.add(`cart-form__input-wrap--error`)
        this.value = ``
        this.placeholder = `введите правильный email`
        validator[2] = false
        this.dataset.validity = "false"
    } else {
        wrapper.classList.remove(`cart-form__input-wrap--error`)
        validator[2] = true
        this.dataset.validity = "true"
    }
})

cartFormAddress.addEventListener(`change`, function(){
    let wrapper = this.parentNode;
    if (this.value.length < 10) {
        wrapper.classList.add(`cart-form__input-wrap--error`)
        this.value = ``
        this.placeholder = `введите адрес`
        validator[3] = false
        this.dataset.validity = "false"
    } else {
        wrapper.classList.remove(`cart-form__input-wrap--error`)
        validator[3] = true
        this.dataset.validity = "true"
    }
})

cartFormCheckbox.addEventListener(`change`, function(e){
    if (this.checked === false) {
        validator[4] = false
    } else {
        validator[4] = true
    }
})
