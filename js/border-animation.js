"use strict";

const animateHost = document.getElementById(`animate-test-host`)
const animation = animateHost.getElementById(`animate-test`)

const circle = document.getElementById(`test-circle`)
const animationCircle = circle.getElementById(`test-circle-to`)

animateHost.addEventListener(`mouseenter`, function () {
    console.log(animateHost.animationsPaused())
    if (animateHost.animationsPaused()) {
        animateHost.unpauseAnimations();
    } else {
        animation.beginElement();
    }

})
animateHost.addEventListener(`mouseleave`, function () {
    animateHost.pauseAnimations();
    console.log(animateHost.animationsPaused())
})




circle.addEventListener(`mouseenter`, function () {
    console.log(circle.animationsPaused())
   if (circle.animationsPaused()) {
       circle.unpauseAnimations();
    } else {
        animationCircle.beginElement();
    }
})

circle.addEventListener(`mouseleave`, function () {
    circle.pauseAnimations();
    console.log(circle.animationsPaused())
})
