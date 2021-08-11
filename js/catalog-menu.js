"use strict";

const catMenuCls = `submenu`;
const catMenuWrapCls = `submenu__wrapper`;
const catSectionCls = `submenu__section`;
const subcatLinkCls = `submenu__subsection-item`;
const catalogItemCls = `catalog__item`;
const catalogCls = `html`
const constructorLink = `./constructor`

let viewport = document.body.clientWidth;

const scrollCatalog = () => {
    catalog[0].scrollTop = 0
    console.log(catalog)
    //catalog[0].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

const hideSections = (sections) => {
    sections.forEach((sect) => {
        sect.classList.remove(catSectionCls + `--active`)
    })
    links.forEach((link) => {
        link.classList.remove(`${subcatLinkCls}--active`)
    })
}

const hideSubcatLinks = (link) => {
    let parent = link.parentElement;
    let siblings = parent.querySelectorAll(`.` + subcatLinkCls)
    siblings.forEach((sibling) => {
        sibling.classList.remove(subcatLinkCls + `--active`)
    })
}

const sortProducts = (link, items) => {
    let subtype = link.dataset.subtype
    console.log(`Sorting products...`)
    items.forEach(function (item) {
        item.classList.remove(`${catalogItemCls}--active`)
    });
    items.forEach(function (item) {
        let itemSubtype = item.dataset.subtype
        if (itemSubtype == subtype) {
            let timeout = window.setTimeout(function () {
                item.classList.add(`${catalogItemCls}--active`);
            }, 50)
        }
    })
    scrollCatalog()
}

const sortProductsSection = (section, items) => {
    let type = section.dataset.type
    // console.log(`Sorting products section...`)
    items.forEach(function (item) {
        item.classList.remove(`${catalogItemCls}--active`)
    });
    items.forEach(function (item) {
        let itemType = item.dataset.type
        // console.log(type + " " + itemType)
        if (itemType == type) {
            let timeout = window.setTimeout(function () {
                item.classList.add(`${catalogItemCls}--active`);
            }, 50)
        }
    })
    scrollCatalog()
}

const minimize = (submenu) => {
    submenu.classList.add(catMenuCls + `--minimized`);
}

let submenu = document.querySelector(`.${catMenuCls}`);
let submenuWrap = submenu.querySelector(`.${catMenuWrapCls}`);
let sections = submenu.querySelectorAll(`.${catSectionCls}`);
let links = submenu.querySelectorAll(`.${subcatLinkCls}`);
let items = document.querySelectorAll(`.${catalogItemCls}`);
let catalog = document.querySelectorAll(`${catalogCls}`);

// initial sorting
items.forEach(function(item){
    let type = item.dataset.type
    if (type != "souvenirs"){
        item.classList.remove(`${catalogItemCls}--active`)
    }
})

sections.forEach((section) => {
    // if (!section.classList.contains(`submenu__section--constructor`)) {
        section.addEventListener(`click`, function () {
            //document.querySelector(`.catalog`).style.marginLeft = `-5px`
            section.blur();
            hideSections(sections)
            section.classList.add(catSectionCls + `--active`)
            sortProductsSection(section, items)
            // let activeLink = section.querySelector(`.${subcatLinkCls}--active`)
            // if (activeLink) {
            //     sortProducts(activeLink, items);
            // }
        })
        section.addEventListener(`keydown`, function (evt) {
            if (evt.key === `Enter`) {
                hideSections(sections)
                section.classList.add(catSectionCls + `--active`)
                sortProductsSection(section, items);
                // let activeLink = section.querySelector(`${subcatLinkCls}--active`)
                // if (activeLink) {
                //     sortProducts(activeLink, items);
                // }
            }
        })
    // } else {
        // section.addEventListener(`click`, function(){
        //     window.location.href = constructorLink
        // })
    // }
})

links.forEach((link) => {
    link.addEventListener(`click`, function (evt) {
        evt.stopPropagation();
        hideSubcatLinks(this)
        this.classList.add(subcatLinkCls + `--active`)
        sortProducts(link, items);
    })
})

document.addEventListener(`scroll`, function () {
    let offset = window.pageYOffset
    if (viewport > 1280) {
        if (offset > 250) {
            submenu.classList.add(catMenuCls + `--minified`)
        } else {
            submenu.classList.remove(catMenuCls + `--minified`)
        }
    }
})

submenuWrap.addEventListener(`mouseenter`, function () {
    let parent = this.parentElement;
    let minified = parent.classList.contains(catMenuCls + `--minified`)
    if (minified) {
        parent.classList.remove(catMenuCls + `--minified`)
    }
})
