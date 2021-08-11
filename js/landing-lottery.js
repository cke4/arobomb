"use strict";

const btnCls = `landing-lottery__btn`;
const textCls = `js-clipboard-text`;
const participateBtnCls = `landing-lottery__participate-btn`;
const btnToastCls = `landing-lottery__btn-toast`

let clipboardBtn = document.querySelector(`.${btnCls}`);
let clipboardTextBlock = document.querySelector(`.${textCls}`);
let instaBtn = document.querySelector(`.${participateBtnCls}`);
let toastBtn = document.querySelector(`.${btnToastCls}`);

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "unknown";
}


clipboardBtn.addEventListener(`click`, function (){
    toastBtn.classList.add(`${btnToastCls}--active`)
    let timeout = window.setTimeout(function(){
        toastBtn.classList.remove(`${btnToastCls}--active`);
    }, 1000)
})

document.addEventListener("DOMContentLoaded", function(event) {
    switch (getMobileOperatingSystem()) {
        case 'iOS':
            instaBtn.setAttribute('href', instaBtn.dataset.ioslink)
            break;
        case 'Android':
            instaBtn.setAttribute('href', instaBtn.dataset.androidlink)
            break;
        default:
            break;
    }
});

new ClipboardJS('.landing-lottery__btn');
