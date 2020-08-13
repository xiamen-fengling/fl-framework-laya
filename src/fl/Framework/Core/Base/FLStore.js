"use strict";
exports.__esModule = true;
var FLDevice_1 = require("./FLDevice");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 本地化数据存储
 * 曾彬思
 * 2020-03-05
 */
var FLStore = /** @class */ (function () {
    function FLStore() {
    }
    /**
     * 保存数据
     * @param {string} key 索引键
     * @param {*} value 值
     */
    FLStore.set = function (key, value) {
        if (FLStore.storeCacheDatas[key] === value) {
            var typeName = typeof value;
            if (typeName === 'number' || typeName === 'string' || typeName === 'boolean') {
                return;
            }
        }
        FLStore.enabledStoreCache && (FLStore.storeCacheDatas[key] = value);
        var val = {
            type: typeof (value),
            value: value
        };
        val = JSON.stringify(val);
        // 记录key
        if (key !== 'flstoreKeys') {
            var keys = FLStore.flstoreKeys || FLStore.get('flstoreKeys', {});
            FLStore.flstoreKeys = keys;
            if (!keys[key]) {
                keys[key] = 1;
                FLStore.set('flstoreKeys', keys);
            }
        }
        try {
            if (FLStore.enabledStoreCache && FLDevice_1["default"].isWechatGame() && wx && wx.setStorage && key !== 'flstoreKeys') {
                // 这里采用异步操作来加速存储操作(防止阻塞)
                wx.setStorage({ key: key, data: val });
            }
            else {
                Laya.LocalStorage.setItem(key, val);
            }
        }
        catch (error) {
            if (FLDevice_1["default"].isWechatGame() && wx && wx.setStorage) {
                wx.setStorage({ key: key, data: val });
            }
        }
    };
    /**
     * 保存今天的数据
     * @param {string} key 索引键
     * @param {*} defaultValue 当没有取到值的时候返回的默认值
     */
    FLStore.setTodayValue = function (key, value) {
        var date = new Date();
        var day = date.getFullYear() + '_' + date.getMonth() + '_' + date.getDay();
        return FLStore.set(key + '_' + day, value);
    };
    /**
     * 获取数据
     * @param {string} key 索引键
     * @param {*} defaultValue 当没有取到值的时候返回的默认值
     */
    FLStore.get = function (key, defaultValue) {
        var data = FLStore.storeCacheDatas[key];
        if (data !== undefined && data !== null) {
            return data;
        }
        data = Laya.LocalStorage.getItem(key);
        if (!data) {
            FLStore.enabledStoreCache && FLStore.set(key, defaultValue);
            return defaultValue;
        }
        var val = JSON.parse(data);
        if (val.value === undefined || val.value === null) {
            FLStore.enabledStoreCache && FLStore.set(key, defaultValue);
            return defaultValue;
        }
        FLStore.enabledStoreCache && FLStore.set(key, val.value);
        return val.value;
    };
    /**
     * 获取今天的数据
     * @param {string} key 索引键
     * @param {*} defaultValue 当没有取到值的时候返回的默认值
     */
    FLStore.getTodayValue = function (key, defaultValue) {
        var date = new Date();
        var day = date.getFullYear() + '_' + date.getMonth() + '_' + date.getDay();
        return FLStore.get(key + '_' + day, defaultValue);
    };
    /**
     * 获取时间阶段的数据
     * @param {string} key 索引键
     * @param {string} interval 时间区间
     * @param {*} defaultValue 当没有取到值的时候返回的默认值
     */
    FLStore.getTimeIntervalValue = function (key, interval, defaultValue) {
        try {
            var time = Math.floor(Date.now() / 1000);
            var preKey = Math.floor(time / interval);
            return FLStore.get(key + '_' + preKey, defaultValue);
        }
        catch (error) {
            console.log("FLStore.getTimeIntervalValue() : interval 不能为0！");
        }
    };
    /**
     * 设置时间阶段的数据
     * @param {string} key 索引键
     * @param {string} interval 时间区间
     * @param {*} defaultValue 当没有取到值的时候返回的默认值
     */
    FLStore.setTimeIntervalValue = function (key, interval, value) {
        try {
            var time = Math.floor(Date.now() / 1000);
            var preKey = Math.floor(time / interval);
            return FLStore.set(key + '_' + preKey, value);
        }
        catch (error) {
            console.log("FLStore.getTimeIntervalValue() : interval 不能为0！");
        }
    };
    /**
     * 获取bool值
     * @param {string} key
     * @param {bool} defaultValue
     */
    FLStore.getBool = function (key, defaultValue) {
        var value = FLStore.get(key);
        if (value === 'true') {
            return true;
        }
        else if (value === 'false') {
            return false;
        }
        return defaultValue;
    };
    /**
     * 设置bool值
     * @param {string} key
     * @param {bool} value
     */
    FLStore.setBool = function (key, value) {
        if (value === true) {
            FLStore.set(key, 'true');
        }
        else {
            FLStore.set(key, 'false');
        }
    };
    /**
     * 移除数据
     * @param {string} key
     */
    FLStore.remove = function (key) {
        Laya.LocalStorage.removeItem(key);
    };
    /**
     * 清空所有缓存数据
     */
    FLStore.clear = function () {
        var keys = FLStore.get('flstoreKeys', {});
        for (var key in keys) {
            Laya.LocalStorage.removeItem(key);
            keys[key] = undefined;
        }
        FLStore.set('flstoreKeys', {});
    };
    /**
     * 获取本地化存储中所有的key
     */
    FLStore.getAllKeys = function () {
        var result = [];
        var keys = FLStore.get('flstoreKeys', {});
        for (var key in keys) {
            result.push(key);
        }
        return result;
    };
    /** 是否启用本地缓存(加速访问) */
    FLStore.enabledStoreCache = true;
    /** 本地化数据缓存(加速访问) */
    FLStore.storeCacheDatas = {};
    /** 本地化存储keys缓存 */
    FLStore.flstoreKeys = null;
    return FLStore;
}());
exports["default"] = FLStore;
try {
    window.FLStore = FLStore;
}
catch (error) { }
