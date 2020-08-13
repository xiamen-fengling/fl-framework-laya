"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var FLBehavior_1 = require("./FLBehavior");
var index_1 = require("../index");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * UI面板基类
 * zengbinsi
 * 2020-03-06
 */
var FLUIPanel = /** @class */ (function (_super) {
    __extends(FLUIPanel, _super);
    function FLUIPanel() {
        // `层级管理
        //         NORMAL：默认面板
        //         WIDGET：挂件
        //         WINDOW：一级弹窗
        //         DIALOG：二级弹窗
        //         TIP：顶层提示
        //         MAX：超顶层UI`
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name: zIndex, tips: '层级管理', default = EZIndex.NORMAL} */
        _this.zIndex = index_1.EZIndex.NORMAL;
        /** @prop {name: parentUIName, type: String tips: '父节点UI名称，默认添加到场景根节点上', default = ''} */
        _this.parentUIName = '';
        return _this;
    }
    return FLUIPanel;
}(FLBehavior_1["default"]));
exports["default"] = FLUIPanel;
