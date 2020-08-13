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
var FLBehavior_1 = require("../Core/FLBehavior");
var FLLayout = /** @class */ (function (_super) {
    __extends(FLLayout, _super);
    function FLLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        /** @prop {name: layoutType, type: Option, option: 'VERTICAL,HORIZONTAL,GRID_H,GRID_V', tips: '布局类型'} */
        _this.layoutType = 'VERTICAL';
        /** @prop {name: top, type: Number, tips: '顶部边距'} */
        _this.top = 0;
        /** @prop {name: bottom, type: Number, tips: '底部边距'} */
        _this.bottom = 0;
        /** @prop {name: left, type: Number, tips: '左边边距'} */
        _this.left = 0;
        /** @prop {name: right, type: Number, tips: '右边边距'} */
        _this.right = 0;
        /** @prop {name: spacingX, type: Number, tips: '水平间距'} */
        _this.spacingX = 0;
        /** @prop {name: spacingY, type: Number, tips: '竖直间距'} */
        _this.spacingY = 0;
        /** @prop {name: affectedByScale, type: Bool, tips: 'item缩放是否影响布局'} */
        _this.affectedByScale = false;
        return _this;
    }
    FLLayout.prototype.onStarted = function () {
        this._doLayout();
    };
    FLLayout.prototype._doLayout = function () {
        if (this.layoutType === 'HORIZONTAL') {
            var newWidth = this._getHorizontalBaseWidth(this.owner._children[1] ? this.owner._children : this.owner._children[0]._children);
            this.owner.width = newWidth;
        }
        else if (this.layoutType === 'VERTICAL') {
            var newHeight = this._getVerticalBaseHeight(this.owner._children);
            this.owner.height = newHeight;
        }
        else if (this.layoutType === 'NONE') {
        }
        else if (this.layoutType === 'GRID_H') {
            this._doLayoutGridH(this.owner._children);
        }
        else if (this.layoutType === 'GRID_V') {
            this._doLayoutGridV(this.owner._children[1] ? this.owner._children : this.owner._children[0]._children);
        }
    };
    FLLayout.prototype._getHorizontalBaseWidth = function (childrens) {
        if (!childrens[0]) {
            return;
        }
        var newWidth = 0;
        var activeChildCount = 0;
        var child;
        for (var i = 0; i < childrens.length; ++i) {
            child = childrens[i];
            if (child.visible) {
                activeChildCount++;
                child.x = newWidth + this.left + (activeChildCount - 1) * this.spacingX;
                child.y = 0;
                newWidth += child.width * this._getUsedScaleValue(child.scaleX);
            }
        }
        newWidth += (activeChildCount - 1) * this.spacingX + this.left + this.right;
        return newWidth;
    };
    FLLayout.prototype._getVerticalBaseHeight = function (childrens) {
        if (!childrens[0]) {
            return;
        }
        var newHeight = 0;
        var activeChildCount = 0;
        var child;
        for (var i = 0; i < childrens.length; ++i) {
            child = childrens[i];
            if (child.visible) {
                activeChildCount++;
                child.y = newHeight + this.top + (activeChildCount - 1) * this.spacingY;
                newHeight += child.height * this._getUsedScaleValue(child.scaleY);
            }
        }
        newHeight += (activeChildCount - 1) * this.spacingY + this.top + this.bottom;
        return newHeight;
    };
    FLLayout.prototype._doLayoutGridH = function (childrens) {
        var _this = this;
        if (!childrens[0]) {
            return;
        }
        var width = this.owner.width;
        var baseW = width - this.left - this.right;
        // 一行可以放置几项
        var num = Math.floor((baseW + this.spacingX) / (childrens[0].width + this.spacingX));
        // 当前行
        var row = 0, col = 0;
        childrens.map(function (item, i) {
            item.x = _this.left + col * (_this.spacingX + childrens[0].width);
            item.y = _this.top + row * (_this.spacingY + childrens[0].height);
            col++;
            if (col >= num) {
                col = 0;
                row++;
            }
        });
        row = Math.ceil(childrens.length / num);
        this.owner.height = row * (this.spacingY + childrens[0].height) - this.spacingY + this.top + this.bottom;
    };
    FLLayout.prototype._doLayoutGridV = function (childrens) {
        var _this = this;
        if (!childrens[0]) {
            return;
        }
        var height = this.owner.height;
        var baseH = height - this.top - this.bottom;
        // 一列可以放置几项
        var num = Math.floor((baseH + this.spacingY) / (childrens[0].height + this.spacingY));
        // 当前行
        var row = 0, col = 0;
        childrens.map(function (item, i) {
            item.x = _this.left + col * (_this.spacingX + childrens[0].width);
            item.y = _this.top + row * (_this.spacingY + childrens[0].height);
            row++;
            if (row >= num) {
                row = 0;
                col++;
            }
        });
        col = Math.ceil(childrens.length / num);
        this.owner.width = col * (this.spacingX + childrens[0].width) - this.spacingX + this.left + this.right;
    };
    FLLayout.prototype._getUsedScaleValue = function (value) {
        return this.affectedByScale ? Math.abs(value) : 1;
    };
    return FLLayout;
}(FLBehavior_1["default"]));
exports["default"] = FLLayout;
