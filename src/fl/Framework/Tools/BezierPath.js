"use strict";
exports.__esModule = true;
var BezierPath = /** @class */ (function () {
    function BezierPath() {
    }
    /**2D贝塞尔曲线 */
    BezierPath.Create2DBezierPoints = function (anchorpoints, pointsAmount) {
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    };
    BezierPath.MultiPointBezier = function (points, t) {
        var len = points.length;
        var x = 0, y = 0;
        for (var i = 0; i < len; i++) {
            var point = points[i];
            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
        }
        return { x: x, y: y };
    };
    BezierPath.erxiangshi = function (start, end) {
        var cs = 1, bcs = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return (cs / bcs);
    };
    ;
    /**3D贝塞尔曲线 */
    /**
     *
     * @param anchorpoints 贝塞尔控制点数组
     * @param pointsAmount 采样点数量
     */
    BezierPath.Create3DBezierPoints = function (anchorpoints, pointsAmount) {
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = this.CalculateCubicBezierPoint(i / pointsAmount, anchorpoints[0], anchorpoints[1], anchorpoints[2]);
            points.push(point);
        }
        return points;
    };
    /**
     * @param t 路径点
     * @param p0 起始点
     * @param p1 控制点1
     * @param p2 控制点2
     */
    BezierPath.CalculateCubicBezierPoint = function (t, p0, p1, p2) {
        var u = 1 - t;
        var tt = t * t;
        var uu = u * u;
        var p = BezierPath.v3Mul(p0, uu);
        p = BezierPath.v3Add(p, BezierPath.v3Mul(p1, 2 * u * t));
        p = BezierPath.v3Add(p, BezierPath.v3Mul(p2, tt));
        return p;
    };
    BezierPath.v3Mul = function (v, ratio) {
        return new Laya.Vector3(v.x * ratio, v.y * ratio, v.z * ratio);
    };
    BezierPath.v3Add = function (v1, v2) {
        return new Laya.Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    };
    return BezierPath;
}());
exports.BezierPath = BezierPath;
