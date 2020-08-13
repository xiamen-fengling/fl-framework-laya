"use strict";
exports.__esModule = true;
var FLDevice_1 = require("../Base/FLDevice");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * http
 * 曾彬思
 * 徐斌杰
 * 2018-08-13
 */
var FLNetHTTP = /** @class */ (function () {
    function FLNetHTTP() {
    }
    /**
     * GET请求
     * @param router 路由
     * @param headParams 请求头参数
     * @param callback 回调
     */
    FLNetHTTP.get = function (router, headParams, callback) {
        return FLNetHTTP.sendRequerst('GET', router, {}, headParams, callback);
    };
    /**
     * 基于Promise的同步GET请求
     * @param router 路由
     * @param headParams 请求头参数
     */
    FLNetHTTP.getAsync = function (router, headParams) {
        return new Promise(function (resolve, reject) {
            FLNetHTTP.get(router, headParams, function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    };
    /**
     * POST请求
     * @param router 路由
     * @param params 参数
     * @param headParams 请求头参数
     * @param callback 回调
     */
    FLNetHTTP.post = function (router, params, headParams, callback) {
        return FLNetHTTP.sendRequerst('POST', router, params, headParams, callback);
    };
    /**
     * 基于Promise的同步POST请求
     * @param router 路由
     * @param params 请求体参数
     * @param headParams 请求头参数
     */
    FLNetHTTP.postAsync = function (router, params, headParams) {
        return new Promise(function (resolve, reject) {
            FLNetHTTP.post(router, params, headParams, function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    };
    /**
     * PUT请求
     * @param router 路由
     * @param params 请求体参数
     * @param headParams 请求头参数
     * @param callback 回调
     */
    FLNetHTTP.put = function (router, params, headParams, callback) {
        return FLNetHTTP.sendRequerst('PUT', router, params, headParams, callback);
    };
    /**
     * 基于Promise的同步PUT请求
     * @param router 路由
     * @param params 请求体参数
     * @param headParams 请求头参数
     */
    FLNetHTTP.putAsync = function (router, params, headParams) {
        return new Promise(function (resolve, reject) {
            FLNetHTTP.post(router, params, headParams, function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    };
    /**
     * DELETE请求
     * @param router 路由
     * @param params 请求体参数
     * @param headParams 请求头参数
     * @param callback 回调
     */
    FLNetHTTP["delete"] = function (router, params, headParams, callback) {
        return FLNetHTTP.sendRequerst('DELETE', router, params, headParams, callback);
    };
    /**
     * 基于Promise的同步DELETE请求
     * @param router 路由
     * @param params 请求体参数
     * @param headParams 请求头参数
     */
    FLNetHTTP.deleteAsync = function (router, params, headParams) {
        return new Promise(function (resolve, reject) {
            FLNetHTTP["delete"](router, params, headParams, function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    };
    /**
     * 发送请求
     * @param type 请求类型
     * @param router 路由
     * @param params 请求体参数
     * @param headParams 请求头参数
     * @param callback 回调
     */
    FLNetHTTP.sendRequerst = function (type, router, params, headParams, callback) {
        var xhr = new XMLHttpRequest();
        //readyState属性改变时会调用
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== EHttpReadyState.DONE) {
                return;
            }
            if (xhr.status >= EHttpResponseCode.s200 && xhr.status < EHttpResponseCode.s400) {
                var res = void 0;
                try {
                    res = JSON.parse(xhr.responseText);
                }
                catch (error) {
                    return callback(error, undefined);
                }
                callback(undefined, res || xhr.responseText);
            }
            else {
                callback(xhr.responseText ? JSON.parse(xhr.responseText) : xhr, undefined);
                xhr.status > 499 && FLNetHTTP.sendWarning(router, xhr.responseText);
            }
        };
        xhr.open(type, router, true);
        //设置提交数据的方式，application/json json传输数据用的比较多
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("client-os", FLDevice_1["default"].os);
        window.userData && xhr.setRequestHeader("x-access-token", window.userData.token || '');
        xhr.setRequestHeader("client-ver", window.APP_VERSION);
        xhr.setRequestHeader("appid", window.APP_ID);
        if (headParams) {
            for (var key in headParams) {
                key !== "x-access-token" && xhr.setRequestHeader(key, headParams[key]);
            }
        }
        try {
            if (type === 'GET') {
                xhr.send();
            }
            else {
                xhr.send(JSON.stringify(params));
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    /**
     * 在"新"的浏览器窗口中打开一个URL网络链接
     * @param url 网络链接
     */
    FLNetHTTP.openURLOnNewWindow = function (url) {
        if (window.open) {
            window.open(url);
        }
        else {
            // jsb.reflection.callStaticMethod("CocosJSBUtil", "openURL:", url);
        }
    };
    /**
     * 在"当前"浏览器窗口中打开一个URL网络链接
     * @param url 网络链接
     */
    FLNetHTTP.openURLOnThisWindow = function (url) {
        if (window.location) {
            window.location.href = url;
        }
        else {
            // jsb.reflection.callStaticMethod("CocosJSBUtil", "openURL:", url);
        }
    };
    /**获取当前url为字符串 */
    FLNetHTTP.getURL = function () {
        return window.location.href;
    };
    /**获取url 问号后面的部分 */
    FLNetHTTP.getURLSearchString = function () {
        return window.location.search;
    };
    /**
     * 设置url中参数
     * @param url
     * @param name
     * @param value
     */
    FLNetHTTP.setURLArg = function (url, name, value) {
        var args = FLNetHTTP.getURLArgs(url);
        var keys = Object.keys(args);
        //是否有参数
        if (keys.length != 0) {
            url += '&';
        }
        else {
            url += '?';
        }
        url = url + name + '=' + encodeURIComponent(value);
        return url;
    };
    /**
     * 获取当前页面URL中的参数
     * @param name：URL中携带的数据参数名
     */
    FLNetHTTP.getURLArgForName = function (name) {
        //通过正则表达式
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            if (decodeURIComponent) {
                return decodeURIComponent(r[2]);
            }
            else if (decodeURI) {
                return decodeURI(r[2]);
            }
            else {
                return unescape(r[2]);
            }
        }
        return null;
    };
    ;
    /**
     * 获取当前页面URL中的所有参数
     */
    FLNetHTTP.getURLArgs = function (url) {
        if (!url) {
            url = window.location.search; //获取url中"?"符后的字串
        }
        else {
            var start = url.search("\\?");
            var end = url.length - 1;
            if (start != -1) {
                url = url.substr(start, end);
            }
        }
        var theRequest = new Object();
        if (url.indexOf("?") !== -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                if (decodeURIComponent) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
                else if (decodeURI) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
                else {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
        }
        return theRequest;
    };
    ;
    /** 接口警报 */
    FLNetHTTP.sendWarning = function (url, msg) {
        var FLStore = window.FLStore;
        if (FLStore) {
            var gameBad = FLStore.getTodayValue(window.APP_ID + "_gameBad", 0);
            if (gameBad) {
                return;
            }
            FLStore.setTodayValue(window.APP_ID + "_gameBad", 1);
        }
        try {
            FLNetHTTP.postAsync('https://warning.feigo.fun/api/warning/game-bad', {
                name: window.GAME_NAME,
                appid: window.APP_ID,
                url: url,
                msg: msg
            });
        }
        catch (error) { }
    };
    return FLNetHTTP;
}());
exports["default"] = FLNetHTTP;
/**读取状态 */
var EHttpReadyState;
(function (EHttpReadyState) {
    /**未打开 open()方法还未调用 */
    EHttpReadyState[EHttpReadyState["UNSENT"] = 0] = "UNSENT";
    /**未发送 open()方法被调用 */
    EHttpReadyState[EHttpReadyState["OPENED"] = 1] = "OPENED";
    /**已获取响应头 send()方法已经被调用, 响应头和响应状态已经返回. */
    EHttpReadyState[EHttpReadyState["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
    /**正在下载响应体 响应体下载中,responseText中已经获取了部分数据.*/
    EHttpReadyState[EHttpReadyState["LOADING"] = 3] = "LOADING";
    /**请求完成  整个请求过程已经完毕*/
    EHttpReadyState[EHttpReadyState["DONE"] = 4] = "DONE";
})(EHttpReadyState = exports.EHttpReadyState || (exports.EHttpReadyState = {}));
/**响应 code */
var EHttpResponseCode;
(function (EHttpResponseCode) {
    /**成功 */
    EHttpResponseCode[EHttpResponseCode["s200"] = 200] = "s200";
    EHttpResponseCode[EHttpResponseCode["s400"] = 400] = "s400";
    /**访问被拒绝 */
    EHttpResponseCode[EHttpResponseCode["s401"] = 401] = "s401";
    /**权限问题 */
    EHttpResponseCode[EHttpResponseCode["s403"] = 403] = "s403";
    /**未找到 */
    EHttpResponseCode[EHttpResponseCode["s404"] = 404] = "s404";
    /**服务器错误 */
    EHttpResponseCode[EHttpResponseCode["s500"] = 500] = "s500";
    /**服务器项目挂了 */
    EHttpResponseCode[EHttpResponseCode["s502"] = 502] = "s502";
})(EHttpResponseCode = exports.EHttpResponseCode || (exports.EHttpResponseCode = {}));
