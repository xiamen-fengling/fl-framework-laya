"use strict";
exports.__esModule = true;
var CameraTransform = /** @class */ (function () {
    function CameraTransform() {
    }
    /**
    * 世界坐标转屏幕坐标
    * @param {Laya.Camera} camera   参照相机
    * @param {Laya.Vector3} point   需要转换的点
    */
    CameraTransform.WorldToScreen2 = function (camera, point) {
        var pointA = this.InverseTransformPoint(camera.transform, point);
        var distance = pointA.z;
        var outPos = new Laya.Vector4();
        camera.viewport.project(point, camera.projectionViewMatrix, outPos);
        var value = new Laya.Vector3(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY, distance);
        return value;
    };
    /**[SixGod]
        * 屏幕坐标转世界坐标
        * @param {Laya.Camera} camera  参照相机
        * @param {Laya.Vector3} point  需要转换的点
        */
    CameraTransform.ScreenToWorld = function (camera, point) {
        var halfFOV = (camera.fieldOfView * 0.5) * Math.PI / 180;
        var height = point.z * Math.tan(halfFOV);
        var width = height * camera.aspectRatio;
        var lowerLeft = this.GetLowerLeft(camera.transform, point.z, width, height);
        var v = this.GetScreenScale(width, height);
        // 放到同一坐标系（相机坐标系）上计算相对位置
        var value = new Laya.Vector3();
        var lowerLeftA = this.InverseTransformPoint(camera.transform, lowerLeft);
        value = new Laya.Vector3(-point.x / v.x, point.y / v.y, 0);
        Laya.Vector3.add(lowerLeftA, value, value);
        // 转回世界坐标系
        value = this.TransformPoint(camera.transform, value);
        return value;
    };
    /**[SixGod]
     * 获取三维场景和屏幕比例
     * @param {number} width     宽
     * @param {number} height    长
     */
    CameraTransform.GetScreenScale = function (width, height) {
        var v = new Laya.Vector3();
        v.x = Laya.stage.width / width / 2;
        v.y = Laya.stage.height / height / 2;
        return v;
    };
    /**[SixGod]
     * 获取相机在 distance距离的截面右下角世界坐标位置
     */
    CameraTransform.GetLowerLeft = function (transform, distance, width, height) {
        // 相机在 distance距离的截面左下角世界坐标位置
        // LowerLeft
        var lowerLeft = new Laya.Vector3();
        // lowerLeft = transform.position - (transform.right * width);
        var right = new Laya.Vector3();
        transform.getRight(right);
        Laya.Vector3.normalize(right, right);
        var xx = new Laya.Vector3(right.x * width, right.y * width, right.z * width);
        Laya.Vector3.add(transform.position, xx, lowerLeft);
        // lowerLeft -= transform.up * height;
        var up = new Laya.Vector3();
        transform.getUp(up);
        Laya.Vector3.normalize(up, up);
        var yy = new Laya.Vector3(up.x * height, up.y * height, up.z * height);
        Laya.Vector3.subtract(lowerLeft, yy, lowerLeft);
        // lowerLeft += transform.forward * distance;
        var forward = new Laya.Vector3();
        transform.getForward(forward);
        Laya.Vector3.normalize(forward, forward);
        var zz = new Laya.Vector3(forward.x * distance, forward.y * distance, forward.z * distance);
        Laya.Vector3.subtract(lowerLeft, zz, lowerLeft);
        return lowerLeft;
    };
    /**[SixGod]
     * 世界坐标转相对坐标
     */
    CameraTransform.InverseTransformPoint = function (origin, point) {
        var xx = new Laya.Vector3();
        origin.getRight(xx);
        var yy = new Laya.Vector3();
        origin.getUp(yy);
        var zz = new Laya.Vector3();
        origin.getForward(zz);
        var zz1 = new Laya.Vector3(-zz.x, -zz.y, -zz.z);
        var x = this.ProjectDistance(point, origin.position, xx);
        var y = this.ProjectDistance(point, origin.position, yy);
        var z = this.ProjectDistance(point, origin.position, zz1);
        var value = new Laya.Vector3(x, y, z);
        return value;
    };
    /**[SixGod]
     * 相对坐标转世界坐标
     */
    CameraTransform.TransformPoint = function (origin, point) {
        var value = new Laya.Vector3();
        var ab = new Laya.Transform();
        Laya.Vector3.transformQuat(point, origin.rotation, value);
        Laya.Vector3.add(value, origin.position, value);
        return value;
    };
    /**[SixGod]
     * 向量投影长度, 向量CA 在向量 CB 上的投影长度
     */
    CameraTransform.ProjectDistance = function (A, C, B) {
        var CA = new Laya.Vector3();
        Laya.Vector3.subtract(A, C, CA);
        var angle = this.Angle2(CA, B) * Math.PI / 180;
        var distance = Laya.Vector3.distance(A, C);
        distance *= Math.cos(angle);
        return distance;
    };
    /**[SixGod]
     * 向量夹角
     */
    CameraTransform.Angle2 = function (ma, mb) {
        var v1 = (ma.x * mb.x) + (ma.y * mb.y) + (ma.z * mb.z);
        var ma_val = Math.sqrt(ma.x * ma.x + ma.y * ma.y + ma.z * ma.z);
        var mb_val = Math.sqrt(mb.x * mb.x + mb.y * mb.y + mb.z * mb.z);
        var cosM = v1 / (ma_val * mb_val);
        if (cosM < -1)
            cosM = -1;
        if (cosM > 1)
            cosM = 1;
        var angleAMB = Math.acos(cosM) * 180 / Math.PI;
        return angleAMB;
    };
    return CameraTransform;
}());
exports["default"] = CameraTransform;
