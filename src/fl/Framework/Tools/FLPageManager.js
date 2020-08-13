"use strict";
exports.__esModule = true;
var FLPageManager = /** @class */ (function () {
    function FLPageManager() {
    }
    /** 开启页面 */
    FLPageManager.open = function (pageName, closeOther, pop) {
        if (closeOther === void 0) { closeOther = false; }
        if (pop === void 0) { pop = true; }
        var page = FLPageManager.pages[pageName];
        if (!page) {
            Laya.Scene.open(pageName);
        }
        var pageParent = page.parent;
        if (!pageParent) {
            page.open(closeOther);
        }
        else if (pop) { //置顶
            pageParent.setChildIndex(page, pageParent.numChildren - 1);
        }
        return page;
    };
    /** 关闭页面 */
    FLPageManager.close = function (pageName) {
        var page = FLPageManager.pages[pageName];
        page && page.close();
    };
    /**
     * 界面是否打开
     * @param key
     */
    FLPageManager.isPageOpened = function (pageName) {
        var page = FLPageManager.pages[pageName];
        return page.parent ? true : false;
    };
    /**
     * 关闭所有界面
     */
    FLPageManager.closeAllPage = function () {
        Laya.Scene.closeAll();
    };
    // 所有已创建的页面
    FLPageManager.pages = {};
    return FLPageManager;
}());
exports["default"] = FLPageManager;
