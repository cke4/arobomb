"use strict";

const cbmodalCls = `cbmodal`;
const cbBtnCls = `js-order-call-btn`;

const cbModalFormCls = `cbmodal-form__wrapper`;
const cbModalThanksCls = `cbmodal-thanks__wrapper`;
const cbModalPhone = `cbmodal-form__tel`;

const cbmodalCloseCls = `modal__close`;
const cbModalSubmitCls = `cbmodal-form__submit-btn`;

function validatePhone(phoneEl) {
    let phone = phoneEl.value,
        numbers = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
    if(phone.match(numbers)) {
        return phone
    } else {
        return false
    }
}


let cbBtn = document.querySelector(`.` + cbBtnCls);
let cbModal = document.querySelector(`.` + cbmodalCls);

let cbSubmit = cbModal.querySelector(`.` + cbModalSubmitCls);
let cbPhone = cbModal.querySelector(`#` + cbModalPhone);
let cbClose = cbModal.querySelector(`.` + cbmodalCloseCls);
let cbcbModalForm = cbModal.querySelector(`.` + cbModalFormCls);
let cbModalThanks = cbModal.querySelector(`.` + cbModalThanksCls);

cbBtn.addEventListener(`click`, function(e){
    e.preventDefault();
    cbModal.classList.add(`modal--active`)
})

cbSubmit.addEventListener(`click`, function (e) {
    if (!validatePhone(cbPhone)) {
        e.preventDefault();
        cbPhone.classList.add(`cbmodal-form__input--error`)
        cbPhone.value = ``
        cbPhone.placeholder = `введите номер телефона`
        console.log("error")
    }
    // cbcbModalForm.classList.remove(`modal-wrapper--active`)
    // cbModalThanks.classList.add(`modal-wrapper--active`)
})

cbClose.addEventListener(`click`, function(e){
    e.preventDefault();
    cbModal.classList.remove(`modal--active`)
    cbcbModalForm.classList.add(`modal-wrapper--active`)
    cbModalThanks.classList.remove(`modal-wrapper--active`)
})
