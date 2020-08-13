"use strict";
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 日期-时间
 * zengbinsi
 * 2020-03-05
 */
exports.__esModule = true;
var FLDateTime = /** @class */ (function () {
    function FLDateTime() {
    }
    /**
     * 获取时间戳（秒）
     * @param isMillisecond 是否返回毫秒时间戳
     */
    FLDateTime.getTimeStamp = function (isMillisecond) {
        if (isMillisecond) {
            return (new Date()).getTime();
        }
        else {
            return Math.floor((new Date()).getTime() / 1000);
        }
    };
    /**
     * 时间戳转Date对象
     * @param {string | number} timeStamp 时间戳
     * @param {boolean} isMillisecond 是否是毫秒
     * @returns {Date}
     */
    FLDateTime.convertToDate = function (timeStamp, isMillisecond) {
        timeStamp = Math.floor(timeStamp);
        if (!isMillisecond) {
            timeStamp *= 1000;
        }
        return new Date(timeStamp);
    };
    /**
     * 格式化时间 2017-10-20 00:00:00
     * @param date 时间
     */
    FLDateTime.prototype.format = function (date) {
        var r = '';
        r += date.getFullYear() + '-';
        r += (date.getMonth() + 1) + '-';
        r += date.getDate() + ' ';
        r += date.getHours() + ':';
        r += date.getMinutes() + ':';
        r += date.getSeconds();
        return r;
    };
    /**
     * 格式化时间 2017年10月20日 00时00分00秒
     * @param date 时间
     */
    FLDateTime.formatTimeChinese = function (date) {
        var r = '';
        r += date.getFullYear() + '年';
        r += (date.getMonth() + 1) + '月';
        r += date.getDate() + '日 ';
        r += date.getHours() + '时';
        r += date.getMinutes() + '分';
        r += date.getSeconds() + '秒';
        return r;
    };
    /**
     * 格式化时间 2017-10-20
     * @param date 时间
     */
    FLDateTime.formatDay = function (date) {
        var r = '';
        r += date.getFullYear() + '-';
        r += (date.getMonth() + 1) + '-';
        r += date.getDate() + ' ';
        return r;
    };
    /**
     * 格式化时间 2017/10/20
     * @param date 时间
     */
    FLDateTime.formatNewDay = function (date) {
        var r = '';
        r += date.getFullYear() + '/';
        r += (date.getMonth() + 1) + '/';
        r += date.getDate() + ' ';
        return r;
    };
    /**
     * 格式化时间 2017年10月20日
     * @param date 时间
     */
    FLDateTime.formatDayToChinese = function (date) {
        var r = '';
        r += date.getFullYear() + '年';
        r += (date.getMonth() + 1) + '月';
        r += date.getDate() + '日';
        return r;
    };
    /**
     * 格式化时间 1st March,2019
     * @param date 时间
     */
    FLDateTime.formatDayToEnglish = function (date) {
        var month;
        var day;
        switch (date.getMonth()) {
            case 0:
                month = 'January';
                break;
            case 1:
                month = ' February';
                break;
            case 2:
                month = 'March';
                break;
            case 3:
                month = 'April';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'June';
                break;
            case 6:
                month = 'July';
                break;
            case 7:
                month = 'August';
                break;
            case 8:
                month = 'September';
                break;
            case 9:
                month = 'October';
                break;
            case 10:
                month = 'November';
                break;
            case 11:
                month = 'December';
                break;
        }
        if (date.getDate() == 1 || date.getDate() == 11 || date.getDate() == 21 || date.getDate() == 31) {
            day = date.getDate() + "st";
        }
        else if (date.getDate() == 2 || date.getDate() == 22) {
            day = date.getDate() + "nd";
        }
        else if (date.getDate() == 3 || date.getDate() == 23) {
            day = date.getDate() + "rd";
        }
        else {
            day = date.getDate() + "th";
        }
        var r = '';
        r += (day) + ' ';
        r += (month) + ',';
        r += date.getFullYear() + '';
        return r;
    };
    /**
     * 格式化时间字符串 00:00:00
     * @param time 时间戳（秒）
     */
    FLDateTime.formatTimeString = function (time) {
        time = Math.floor(time + 0.95);
        var hour = Math.floor(time / 3600);
        var minute = Math.floor(time % 3600 / 60);
        var second = Math.floor(time % 60);
        var result = '';
        result += hour > 9 ? hour.toString() : '0' + hour.toString();
        result += ':';
        result += minute > 9 ? minute.toString() : '0' + minute.toString();
        result += ':';
        result += second > 9 ? second.toString() : '0' + second.toString();
        return result;
    };
    /**
     * 格式化时间字符串 00:00
     * @param time 时间戳（秒）
     */
    FLDateTime.formatTimeStringMS = function (time) {
        time = Math.floor(time + 0.95);
        var minute = Math.floor(time / 60);
        var second = Math.floor(time % 60);
        var result = '';
        result += minute > 9 ? minute.toString() : '0' + minute.toString();
        result += ':';
        result += second > 9 ? second.toString() : '0' + second.toString();
        return result;
    };
    /**
     * 格式化时间字符串 00时00分00秒
     * @param time 时间戳（秒）
     */
    FLDateTime.formatTimeStringToChinese = function (time) {
        time = Math.floor(time + 0.95);
        var hour = Math.floor(time / 3600);
        var minute = Math.floor(time % 3600 / 60);
        var second = Math.floor(time % 60);
        var result = '';
        result += hour > 9 ? hour.toString() : '0' + hour.toString();
        result += '时';
        result += minute > 9 ? minute.toString() : '0' + minute.toString();
        result += '分';
        result += second > 9 ? second.toString() : '0' + second.toString();
        result += '秒';
        return result;
    };
    /**
     * 秒格式化成时间字符串  7day 12:21:12
     * @param s 时间戳（秒）
     */
    FLDateTime.arriveTimerFormat = function (s) {
        if (s < 0) {
            return;
        }
        var t;
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        var day = Math.floor(hour / 24);
        if (day > 0) {
            hour = hour - 24 * day;
            t = day + "day " + hour + ":";
        }
        else {
            t = hour + ":";
        }
        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec;
        return t;
    };
    /**
     * 获取今年是第几周
     * 以每周的周一为准
     * @param time 获取第几周的时间
     */
    FLDateTime.getWeekOfYear = function (time) {
        var date = time ? new Date(time) : new Date();
        var firstDay = new Date(date.getFullYear(), 0, 1);
        var dayOfWeek = firstDay.getDay();
        var spendDay = 1;
        if (dayOfWeek !== 0) {
            spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(date.getFullYear(), 0, 1 + spendDay);
        var d = Math.ceil((date.valueOf() - firstDay.valueOf()) / 86400000);
        var result = Math.ceil(d / 7) + 1;
        return result;
    };
    ;
    /**
     * 获取两个时间之间相差多少秒
     * @param startDate
     * @param endDate
     */
    FLDateTime.getInervalSecond = function (startDate, endDate) {
        var time = endDate.getTime() - startDate.getTime();
        var s = parseInt((time / 1000).toString());
        return s;
    };
    /**
     * 获取两个时间之间相差多少小时
     * @param startDate
     * @param endDate
     */
    FLDateTime.getInervalHour = function (startDate, endDate) {
        var ms = endDate.getTime() - startDate.getTime();
        if (ms < 0)
            return 0;
        return Math.floor(ms / 1000 / 3600);
    };
    /**
     * 获取两个时间之间相差多少天
     * @param startDate
     * @param endDate
     */
    FLDateTime.getInervalDay = function (startDate, endDate) {
        //时间差的毫秒数
        var time = endDate.getTime() - startDate.getTime();
        //计算出相差天数
        var days = Math.floor(time / (24 * 3600 * 1000));
        return days;
    };
    /**
     * 是否是今天
     * @param time 时间戳
     * @param isMillisecond 是否是毫秒时间戳
     */
    FLDateTime.isToday = function (time, isMillisecond) {
        if (isMillisecond === void 0) { isMillisecond = false; }
        var date = new Date(time * (isMillisecond ? 1 : 1000));
        var today = new Date();
        // 如果是今天注册
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };
    return FLDateTime;
}());
exports["default"] = FLDateTime;
