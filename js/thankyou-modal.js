"use strict";

const tymodalCls = `tymodal`;
const tymodalCloseCls = `modal__close`;

function hideTyModal(){
    tyModal.classList.remove(`modal--active`)
}

function showTyModal(){
    tyModal.classList.add(`modal--active`)
}



let tyBtn = document.querySelector(`.landing-2__flat-form-input--wrap .form__btn`);
let tyModal = document.querySelector(`.${tymodalCls}`);
let tyModalClose = document.querySelector(`.${tymodalCloseCls}`);

tyModalClose.addEventListener(`click`, function (e) {
    e.preventDefault();
    hideTyModal()
})

tyBtn.addEventListener(`click`, function (e) {
    e.preventDefault();
    showTyModal()
})



