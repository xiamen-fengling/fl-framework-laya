"use strict";
exports.__esModule = true;
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 3D工具类
 * 严若鹏
 * 2020-06-09
 */
var FLMath_1 = require("../Core/Base/FLMath");
var FL3DTool = /** @class */ (function () {
    function FL3DTool() {
    }
    /**
     * 转换unity的旋转角度到Laya，返回vector3
     * @param x 欧拉角x
     * @param y 欧拉角y
     * @param z 欧拉角z
     */
    FL3DTool.transformUnityRotationToLaya = function (x, y, z) {
        var ab = new Laya.Matrix4x4();
        //将欧拉角转换成旋转矩阵
        Laya.Matrix4x4.createRotationYawPitchRoll(FLMath_1["default"].rad(y), FLMath_1["default"].rad(x), FLMath_1["default"].rad(z), ab);
        // console.log('-------变换之前的旋转矩阵', ab);
        //从左手坐标转换成右手坐标 x,y轴取反
        var unit = new Laya.Matrix4x4(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        //生成新的旋转矩阵
        var newAB = new Laya.Matrix4x4();
        //矩阵变换
        Laya.Matrix4x4.multiply(unit, ab, newAB);
        Laya.Matrix4x4.multiply(newAB, unit, newAB);
        // console.log('-------变换的新的旋转矩阵', newAB);
        var newvv = new Laya.Vector3();
        //变换的新的欧拉角
        newAB.decomposeYawPitchRoll(newvv);
        //y,x,z
        // console.log('-------变换的新的欧拉角（弧度）', newvv);
        //y轴角度修正180
        var result = new Laya.Vector3(FLMath_1["default"].deg(newvv.y), FLMath_1["default"].deg(newvv.x) + 180, FLMath_1["default"].deg(newvv.z));
        console.log('-------变换的新的欧拉角（角度）', result);
        return result;
    };
    /**
     * 欧拉角插值
     * @param orinEulaVector3 起始欧拉 角度
     * @param endEulaVector3 终点欧拉 角度
     * @param lerp 插值
     * @returns 新的欧拉角 角度
     */
    FL3DTool.eulaLerp = function (orinEulaVector3, endEulaVector3, lerp) {
        var ab = new Laya.Quaternion();
        Laya.Quaternion.createFromYawPitchRoll(FLMath_1["default"].rad(orinEulaVector3.y), FLMath_1["default"].rad(orinEulaVector3.x), FLMath_1["default"].rad(orinEulaVector3.z), ab);
        var bc = new Laya.Quaternion();
        Laya.Quaternion.createFromYawPitchRoll(FLMath_1["default"].rad(endEulaVector3.y), FLMath_1["default"].rad(endEulaVector3.x), FLMath_1["default"].rad(endEulaVector3.z), bc);
        var cd = new Laya.Quaternion();
        Laya.Quaternion.slerp(ab, bc, lerp, cd);
        var result = new Laya.Vector3();
        cd.getYawPitchRoll(result);
        return new Laya.Vector3(FLMath_1["default"].deg(result.y), FLMath_1["default"].deg(result.x) + 180, FLMath_1["default"].deg(result.z));
    };
    FL3DTool.ba = function (trans, eye, target, up) {
        var abMatrix4x4 = new Laya.Matrix4x4();
        Laya.Matrix4x4.createLookAt(eye, target, up, abMatrix4x4);
        var bcMatrix4x4 = new Laya.Matrix4x4();
        Laya.Matrix4x4.createTranslate(trans, bcMatrix4x4);
    };
    /**
     * 纹理变色
     * @param target
     * @param targetColor
     */
    FL3DTool.changeMeterialColor = function (target, targetColor) {
        var mat = target.meshRenderer.material.clone();
        mat.albedoColor = targetColor;
        target.meshRenderer.material = mat;
    };
    /**
    * 设置透明通道alpha
    */
    FL3DTool.SetAlpha = function (obj, color) {
        var instanObj = obj;
        if (instanObj.meshRenderer) {
            var planeMat = instanObj.meshRenderer.material;
            planeMat.albedoColor = color;
            if (color.w == 1)
                planeMat.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_OPAQUE;
            else
                planeMat.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
        }
        for (var i = 0; i < obj.numChildren; i++) {
            instanObj = obj.getChildAt(i);
            if (instanObj.meshRenderer) {
                var planeMat = instanObj.meshRenderer.material;
                planeMat.albedoColor = color;
                if (color.w == 1)
                    planeMat.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_OPAQUE;
                else
                    planeMat.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
            }
        }
    };
    /**
     * 两点之间距离
     */
    FL3DTool.getDistanceByXY = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
    /**
     * 点或者向量旋转一定角度
     */
    FL3DTool.getPointByRadian = function (x, y, angle) {
        var newPoint = new Laya.Vector2();
        var radian = Laya.Utils.toRadian(angle);
        newPoint.x = x * Math.cos(radian) - y * Math.sin(radian);
        newPoint.y = x * Math.sin(radian) + y * Math.cos(radian);
        return newPoint;
    };
    return FL3DTool;
}());
exports["default"] = FL3DTool;
