"use strict";

let tabsCls = `tabs`,
    tabBtnCls = `tabs__tab-button`,
    tabBtnMobileCls = `tabs__tab-button-mob`,
    tabTextCls = `tabs__text-wrap`,
    tabTextArea = `tabs__text-area`;

let tabs = document.querySelectorAll(`.` + tabsCls)

let resetTabs = function(tabBtn){
    let parent = tabBtn.parentElement.parentElement;
    let tabs = parent.querySelectorAll(`.` + tabBtnCls);
    let tabsMob  = parent.querySelectorAll(`.` + tabBtnMobileCls);
    tabs.forEach(function (tab) {
        tab.classList.remove(tabBtnCls + `--active`);
        tab.dataset.active = `false`;
    })
    tabsMob.forEach(function (tab) {
        tab.classList.remove(tabBtnMobileCls + `--active`);
        tab.dataset.active = `false`;
    })
};

let resetText = function(tabTxt){
    let parent = tabTxt.parentElement,
        texts = parent.querySelectorAll(`.` + tabTextCls);
    texts.forEach(function (tab) {
        tab.classList.remove(tabTextCls + `--active`);
        tab.dataset.active = `false`;
    })
}

let switchMobBtn = function(tabsEl,tabNum){
    let mobTabBtn = tabsEl.querySelector(`.${tabBtnMobileCls}[data-tab="${tabNum}"]`)
    mobTabBtn.classList.add(`${tabBtnMobileCls}--active`)

}

let switchText = function(tabsEl, tabNumb){
    let texts = tabsEl.querySelectorAll(`.` + tabTextArea + ` .` + tabTextCls),
        text = Array.from(texts).filter(text => text.dataset.textn == tabNumb)[0];
    resetText(text);
    text.classList.add(tabTextCls + `--active`);
};

tabs.forEach(function(tab){
    let buttons = tab.querySelectorAll(`.` + tabBtnCls);
    let texts = tab.querySelectorAll(`.` + tabTextCls);
    let buttonsMob = tab.querySelectorAll(`.` + tabBtnMobileCls);
    buttons.forEach(function(btn){
        btn.addEventListener('click', function(){
            btn.blur();
            if (this.dataset.active == 'false') {
                resetTabs(this)
                this.classList.add(tabBtnCls + `--active`)
                this.dataset.active = `true`;
                switchMobBtn(tab, this.dataset.tab)
                switchText(tab, this.dataset.tab)
            }
        })
    })
    buttonsMob.forEach(function (btnMob) {
        btnMob.addEventListener(`click`, function () {
            if (this.dataset.active == `false`) {
                resetTabs(buttons[0])
                this.classList.add(tabBtnMobileCls + `--active`)
                this.dataset.active = `true`;
                switchMobBtn(tab, this.dataset.tab)
                switchText(tab, this.dataset.tab)
            }
        })
    })
})
