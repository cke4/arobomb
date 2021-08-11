"use strict";

const mainMenu = document.querySelector('.main-menu')
const submenuCls = 'main-menu__list-item--submenu'
const mobileBtnCls = 'main-menu__nav-icon'
const menuWrapCls = 'main-menu__wrapper'
const giftBtnCls = 'main-menu__get-gift-btn'

let submenus = mainMenu.querySelectorAll('.' + submenuCls)
submenus.forEach(el => {
    el.addEventListener('mouseover', function(){
        this.classList.add(submenuCls + '--active')
    })
    el.addEventListener('mouseleave', function(){
        this.classList.remove(submenuCls + '--active')
    })
})

let navIcon = mainMenu.querySelector('.' + mobileBtnCls)
let menuWrapMob = mainMenu.querySelector('.' + menuWrapCls)
navIcon.addEventListener('click', function(){
    this.classList.toggle('open')
        {
            $(".modalComboMobile").css("display", "none")
            $(".index__video-mobile-btn").css("display", "flex")
            $(".main-menu__wrapper--mob-active").css("display", "flex")
        }

    menuWrapMob.classList.toggle(menuWrapCls + '--mob-active')

}
)


let giftbtn = mainMenu.querySelector('.' + giftBtnCls)
giftbtn.addEventListener('click', function(){
    mainMenu.classList.toggle('fixed-menu-trailing-gradient')
})

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
