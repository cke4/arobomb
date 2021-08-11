"use strict";
//
// let fixBtnCls = `landingmb`;
// let l1button1Id = `landing-1-button-1`
// let l1button2Id = `landing-1-button-2`
//
//
// function changeBtn(btnTarget){
//     console.log(btnTarget)
//     fixBtn.href = btnTarget.href
//     fixBtn.dataset.modal = btnTarget.dataset.modal
//     let fixBtnMainText = fixBtn.querySelector(`.landingmb__main-text`)
//     let fixBtnSubText = fixBtn.querySelector(`.landingmb__sub-text`)
//     fixBtnMainText.innerText = btnTarget.dataset.mobtext
//     if (btnTarget.dataset.mobsubtext) {
//         fixBtnSubText.innerText = btnTarget.dataset.mobsubtext
//     } else {
//         fixBtnSubText.innerText = ''
//     }
//
// }
//
//
//
// let controller = new ScrollMagic.Controller();
// let controller2 = new ScrollMagic.Controller();
// let fixBtn = document.querySelector(`.${fixBtnCls}`);
// let l1btn1 = document.querySelector(`#${l1button1Id}`);
// let l1btn2 = document.querySelector(`#${l1button2Id}`);
//
//
// changeBtn(l1btn1)
//
//
// let scene1 = new ScrollMagic.Scene({
//     triggerElement: '.landing-1__title-pitch' // point of execution
// })
//     .addTo(controller)
//     .reverse(true)
//     .offset(500)
//     .on(`start`, function(e){
//         changeBtn(l1btn1)
//     });
//
// let scene2 = new ScrollMagic.Scene({
//     triggerElement: '.landing-1__slider-section' // point of execution
// })
//     .addTo(controller)
//     .reverse(true)
//     .on(`start`, function(e){
//         changeBtn(l1btn2)
//     });

(function scrollTo() {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach(each => (each.onclick = scrollAnchors));
})();
function scrollAnchors(e, respond = null) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function() {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1';
            targetAnchor.focus();
            window.history.pushState('', '', targetID);
            clearInterval(checkIfDone);
        }
    }, 100);
}
