"use strict";

const prodLinkCls = 'gallery__img-wrap--main',
    modalCls = `product-modal`,
    prodModalBtnCls = 'modal__close',
    thumbsCls = 'modal__thumb-img',
    modalImgCls = 'modal__image';

let prodLink = document.querySelector('.' + prodLinkCls),
    modal = document.querySelector('.' + modalCls),
    closeBtn = modal.querySelector('.' + prodModalBtnCls),
    thumbs = modal.querySelectorAll('.' + thumbsCls),
    modalBigImg = modal.querySelector('.' + modalImgCls)

let loadImages = () => {
    let thumbs = modal.querySelectorAll('.' + thumbsCls),
        mainImg = modal.querySelector('.' + modalImgCls);
    thumbs.forEach(function (thumb) {
        thumb.src = thumb.dataset.thumbsrc
    })
    mainImg.src = mainImg.dataset.bigsrc
}

prodLink.addEventListener('click', loadImages);
prodLink.addEventListener('click', function () {
    modal.classList.add('modal--active')
})

closeBtn.addEventListener('click', function () {
    modal.classList.remove('modal--active')
})

thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
        let tempBig = modalBigImg.dataset.bigsrc,
            tempThumb = modalBigImg.dataset.thumbsrc
        modalBigImg.src = this.dataset.bigsrc;
        modalBigImg.dataset.bigsrc = this.dataset.bigsrc;
        this.dataset.bigsrc = tempBig;
        modalBigImg.dataset.thumbsrc = this.dataset.thumbsrc;
        this.dataset.thumbsrc = tempThumb;
        this.src = tempThumb;
    })
})
