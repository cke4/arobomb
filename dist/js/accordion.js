"use strict";

const accordionCls = `accordion`
const accordionTitleCls = `accordion-title-wrapper`
const accordionContentCls = `accordion-content`
const accordionTabTitle = `accordion-btn-action`

const closedText = `закрыть`;
const openText = `открыть`;

let accordions = document.querySelectorAll(`.` + accordionCls)

let toggleTab = (tab) => {
    let titleText = tab.querySelector(`.` + accordionTabTitle)
    tab.classList.toggle(accordionTitleCls + `--active`)
    let tabActive = tab.classList.contains(accordionTitleCls + `--active`)
    if (tabActive) {
        titleText.innerText = closedText;
    } else {
        titleText.innerText = openText;
    }
}

accordions.forEach((acc) => {
    let accItemsTitle = acc.querySelectorAll(`.` + accordionTitleCls)
    accItemsTitle.forEach((accTitle) => {
        accTitle.addEventListener(`click`, function () {
            toggleTab(this);
        })
    })
})
