"use strict";
exports.__esModule = true;
var MeshTools = /** @class */ (function () {
    function MeshTools() {
    }
    /**
     * 线段生成mesh模型
     * line 坐标数组格式x1,y1,x2,y2 -- 例:[0,0,1,1........]
     * length 线段宽度
     * height 模型高度
     */
    MeshTools.LineToMesh = function (line, length, height) {
        var vertex = [];
        var point1 = new Laya.Vector2();
        var offsetX = 0;
        var offsetY = 0;
        var i = 0;
        var sinUp = Math.sin(Laya.Utils.toRadian(90));
        var cosUp = Math.cos(Laya.Utils.toRadian(90));
        for (i; i < line.length - 2; i = i + 2) {
            offsetX = line[i + 2] - line[i];
            offsetY = line[i + 3] - line[i + 1];
            point1.x = offsetX * cosUp - offsetY * sinUp;
            point1.y = offsetX * sinUp + offsetY * cosUp;
            Laya.Vector2.normalize(point1, point1);
            vertex.push(line[i] + point1.x * length);
            vertex.push(line[i + 1] + point1.y * length);
            vertex.push(line[i] - point1.x * length);
            vertex.push(line[i + 1] - point1.y * length);
        }
        i = line.length;
        vertex.push(line[i - 2] + point1.x * length);
        vertex.push(line[i - 1] + point1.y * length);
        vertex.push(line[i - 2] - point1.x * length);
        vertex.push(line[i - 1] - point1.y * length);
        var vertices = new Float32Array(vertex.length * 8);
        for (i = 0; i < vertex.length; i = i + 2) {
            vertices[i * 4] = vertex[i] / 100;
            vertices[i * 4 + 1] = 0;
            vertices[i * 4 + 2] = vertex[i + 1] / 100;
            vertices[i * 4 + 3] = 0;
            vertices[i * 4 + 4] = 1;
            vertices[i * 4 + 5] = 0;
            vertices[i * 4 + 6] = vertices[i * 4];
            vertices[i * 4 + 7] = vertices[i * 4 + 2];
        }
        var verticeNum = vertex.length / 2;
        var segments = vertex.length / 2 - 2;
        var indices = new Uint16Array((segments + verticeNum) * 6);
        for (i = 0; i < segments; i = i + 2) {
            indices[i * 3] = i;
            indices[i * 3 + 1] = i + 1;
            indices[i * 3 + 2] = i + 3;
            indices[i * 3 + 3] = i + 2;
            indices[i * 3 + 4] = i + 0;
            indices[i * 3 + 5] = i + 3;
        }
        for (i = verticeNum; i < verticeNum * 2; i++) {
            vertices[i * 8] = vertices[(i - verticeNum) * 8];
            vertices[i * 8 + 1] = height;
            vertices[i * 8 + 2] = vertices[(i - verticeNum) * 8 + 2];
            vertices[i * 8 + 3] = 0;
            vertices[i * 8 + 4] = 1;
            vertices[i * 8 + 5] = 0;
            vertices[i * 8 + 6] = vertices[i * 8];
            vertices[i * 8 + 7] = vertices[i * 8 + 2];
        }
        for (i = segments; i < segments * 2; i++) {
            indices[i * 3] = indices[(i - segments) * 3] + verticeNum;
            indices[i * 3 + 1] = indices[(i - segments) * 3 + 1] + verticeNum;
            indices[i * 3 + 2] = indices[(i - segments) * 3 + 2] + verticeNum;
        }
        var start = segments * 6;
        for (i = 0; i < verticeNum - 2; i++) {
            if (i % 2 == 0) {
                indices[start + i * 6 + 0] = i + 2;
                indices[start + i * 6 + 1] = i;
                indices[start + i * 6 + 2] = i + verticeNum;
                indices[start + i * 6 + 3] = i + verticeNum + 2;
                indices[start + i * 6 + 4] = i + 2;
                indices[start + i * 6 + 5] = i + verticeNum;
            }
            else {
                indices[start + i * 6 + 0] = i + verticeNum;
                indices[start + i * 6 + 1] = i;
                indices[start + i * 6 + 2] = i + 2;
                indices[start + i * 6 + 3] = i + 2;
                indices[start + i * 6 + 4] = i + verticeNum + 2;
                indices[start + i * 6 + 5] = i + verticeNum;
            }
        }
        indices[(segments + verticeNum) * 6 - 12] = verticeNum;
        indices[(segments + verticeNum) * 6 - 11] = 0;
        indices[(segments + verticeNum) * 6 - 10] = 1;
        indices[(segments + verticeNum) * 6 - 9] = 1;
        indices[(segments + verticeNum) * 6 - 8] = verticeNum + 1;
        indices[(segments + verticeNum) * 6 - 7] = verticeNum;
        indices[(segments + verticeNum) * 6 - 6] = verticeNum - 1;
        indices[(segments + verticeNum) * 6 - 5] = verticeNum - 2;
        indices[(segments + verticeNum) * 6 - 4] = verticeNum * 2 - 2;
        indices[(segments + verticeNum) * 6 - 3] = verticeNum * 2 - 1;
        indices[(segments + verticeNum) * 6 - 2] = verticeNum - 1;
        indices[(segments + verticeNum) * 6 - 1] = verticeNum * 2 - 2;
        return new Laya.MeshSprite3D(Laya.PrimitiveMesh._createMesh(Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV"), vertices, indices));
    };
    return MeshTools;
}());
exports.MeshTools = MeshTools;
