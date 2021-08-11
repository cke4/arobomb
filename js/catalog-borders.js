"use strict";

const svg = `<path d="M265.43 5.935C254.655 -5.74525 233.708 10.8102 186.378 13.0447C154.253 14.5682 153.85 7.35696 99.7724 3.39583C52.0389 -0.159026 17.4976 -2.29194 6.1181 16.0918C1.18362 24.1156 3.4998 31.4284 5.61458 48.5933C12.5631 105.268 -3.14662 107.604 2.08997 162.349C6.52093 208.968 18.8068 215.976 11.1533 244.111C6.92375 259.65 0.0759041 269.198 4.60757 280.675C11.6568 298.348 38.5447 302.918 48.4136 304.543C89.9035 311.551 97.9598 291.035 145.089 290.324C181.141 289.816 190.305 301.598 228.17 295.402C248.713 292.05 261.1 290.019 268.954 279.659C282.852 261.276 263.416 241.368 265.43 188.249C266.437 161.739 271.573 159.81 270.465 133.91C269.257 105.776 263.013 102.83 261.402 77.54C258.582 33.6629 275.702 17.0059 265.43 5.935Z" stroke-width="2" stroke-miterlimit="10">
                <animate id="animate-test"
                         begin="indefinite"
                         dur="2s"
                         repeatCount="indefinite"
                         attributeName="d"
                         fill="freeze"
                         values="M265.43 5.935C254.655 -5.74525 233.708 10.8102 186.378 13.0447C154.253 14.5682 153.85 7.35696 99.7724 3.39583C52.0389 -0.159026 17.4976 -2.29194 6.1181 16.0918C1.18362 24.1156 3.4998 31.4284 5.61458 48.5933C12.5631 105.268 -3.14662 107.604 2.08997 162.349C6.52093 208.968 18.8068 215.976 11.1533 244.111C6.92375 259.65 0.0759041 269.198 4.60757 280.675C11.6568 298.348 38.5447 302.918 48.4136 304.543C89.9035 311.551 97.9598 291.035 145.089 290.324C181.141 289.816 190.305 301.598 228.17 295.402C248.713 292.05 261.1 290.019 268.954 279.659C282.852 261.276 263.416 241.368 265.43 188.249C266.437 161.739 271.573 159.81 270.465 133.91C269.257 105.776 263.013 102.83 261.402 77.54C258.582 33.6629 275.702 17.0059 265.43 5.935Z; M265.43,5.935C251.334,0,233.33,12.765,186,15c-32.125,1.523-36.923-5.372-91-9.333
\tC47.267,2.112,17.379-6.05,6,12.333c-4.935,8.024-3.781,48.835-1.667,66c9.207,75.1,12.667,47,13,84c-0.333,45.333-8,49-10,76.333
\tc-4.229,15.539-7.258,30.531-2.726,42.008C19.333,310.334,49.131,296.042,59,297.667c23.333,3.701,37.205-7.622,84.334-8.333
\tc36.052-0.508,50.801,13.861,88.666,7.666c11.667-2.667,19.667-1,31.334-8.333c13.897-18.384,5.652-47.214,7.666-100.333
\tc1.008-26.51-9.892-27.767-11-53.667c-1.208-28.134,13.278-32.377,11.667-57.667C258.334,32.667,275.702,17.006,265.43,5.935z; M265.43 5.935C254.655 -5.74525 233.708 10.8102 186.378 13.0447C154.253 14.5682 153.85 7.35696 99.7724 3.39583C52.0389 -0.159026 17.4976 -2.29194 6.1181 16.0918C1.18362 24.1156 3.4998 31.4284 5.61458 48.5933C12.5631 105.268 -3.14662 107.604 2.08997 162.349C6.52093 208.968 18.8068 215.976 11.1533 244.111C6.92375 259.65 0.0759041 269.198 4.60757 280.675C11.6568 298.348 38.5447 302.918 48.4136 304.543C89.9035 311.551 97.9598 291.035 145.089 290.324C181.141 289.816 190.305 301.598 228.17 295.402C248.713 292.05 261.1 290.019 268.954 279.659C282.852 261.276 263.416 241.368 265.43 188.249C266.437 161.739 271.573 159.81 270.465 133.91C269.257 105.776 263.013 102.83 261.402 77.54C258.582 33.6629 275.702 17.0059 265.43 5.935Z"/>
            </path>`

let borders = document.querySelectorAll(`.catalog__item-border`);
borders.forEach(function (border) {
    let parent = border.parentElement;
    border.innerHTML = svg;
    let animate = border.querySelector(`animate`)
    parent.addEventListener(`mouseenter`, function(){
        if (border.animationsPaused()) {
            border.unpauseAnimations();
        } else {
            animate.beginElement();
        }
    })

    parent.addEventListener(`mouseleave`, function(){
        border.pauseAnimations();
    })

})
