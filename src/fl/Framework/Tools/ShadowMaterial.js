"use strict";
/**
 * copyright (c) 2017-2019 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 自定义阴影
 * yanruopeng
 * 2020-06-16
 */
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
/** 用法
//  Laya.Mesh.load(resUrl,Laya.Handler.create(this,(mesh : Laya.Mesh)=>{
//         let sprite3D = new Laya.MeshSprite3D(mesh);
//          sprite3D.meshRenderer.material = new ShadowMaterial();
//  }
 */
var ShadowMaterial = /** @class */ (function (_super) {
    __extends(ShadowMaterial, _super);
    function ShadowMaterial() {
        var _this = _super.call(this) || this;
        _this.initShader();
        return _this;
    }
    ShadowMaterial.prototype.initShader = function () {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_Normal': Laya.VertexMesh.MESH_NORMAL0,
            'a_Texcoord': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };
        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
            'u_Texture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_DirectionLight.Direction': Laya.Shader3D.PERIOD_SCENE,
            'u_DirectionLight.Color': Laya.Shader3D.PERIOD_SCENE
        };
        var vs = '#include "Lighting.glsl";\n' +
            "attribute vec4 a_Position;\n" +
            "attribute vec2 a_Texcoord;\n" +
            "attribute vec3 a_Normal;\n" +
            "uniform mat4 u_MvpMatrix;\n" +
            "uniform mat4 u_WorldMat;\n" +
            "varying vec2 v_Texcoord;\n" +
            "varying vec3 v_Normal;\n" +
            "void main()\n" +
            "{\n" +
            "gl_Position = u_MvpMatrix * a_Position;\n" +
            "mat3 worldMat=mat3(u_WorldMat);\n" +
            "v_Normal=worldMat*a_Normal;\n" +
            "v_Texcoord=a_Texcoord;\n" +
            "}";
        var vs_shadow = '#include "Lighting.glsl";\n' +
            "attribute vec4 a_Position;\n" +
            "attribute vec2 a_Texcoord;\n" +
            "attribute vec3 a_Normal;\n" +
            "uniform mat4 u_MvpMatrix;\n" +
            "uniform mat4 u_WorldMat;\n" +
            "varying vec2 v_Texcoord;\n" +
            "varying vec3 v_Normal;\n" +
            "void main()\n" +
            "{\n" +
            "vec4 new_Position = vec4(a_Position.x+a_Position.y*0.5, a_Position.y*0.5, a_Position.z, a_Position.w);\n" +
            "gl_Position = u_MvpMatrix * new_Position;\n" +
            "mat3 worldMat=mat3(u_WorldMat);\n" +
            "v_Normal=worldMat*a_Normal;\n" +
            "v_Texcoord=a_Texcoord;\n" +
            "}";
        var ps = "#ifdef FSHIGHPRECISION\n" +
            "precision highp float;\n" +
            "#else\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "#include \"Lighting.glsl\";\n" +
            "varying vec3 v_Normal;\n" +
            "varying vec2 v_Texcoord;\n" +
            "uniform sampler2D u_Texture;\n" +
            "uniform DirectionLight u_DirectionLight;\n" +
            "void main()\n" +
            "{\n" +
            "vec3 normal=normalize(v_Normal);\n" +
            "vec3 diffuse = (dot(u_DirectionLight.Direction, normal)*0.5+0.5)*u_DirectionLight.Color;\n" +
            "gl_FragColor = texture2D(u_Texture, v_Texcoord)+vec4(diffuse,1.0);\n" +
            "}";
        var ps_shadow = "#ifdef FSHIGHPRECISION\n" +
            "precision highp float;\n" +
            "#else\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "varying vec3 v_Normal;\n" +
            "varying vec2 v_Texcoord;\n" +
            "uniform sampler2D u_Texture;\n" +
            "void main()\n" +
            "{\n" +
            "gl_FragColor=vec4(0,0,0,1);\n" +
            "}";
        var customShader = Laya.Shader3D.add(ShadowMaterial.NAME);
        var subShader = new Laya.SubShader(attributeMap, uniformMap); //Laya.SkinnedMeshSprite3D.shaderDefines, ShadowMaterial.shaderDefines);
        subShader.addShaderPass(vs, ps);
        subShader.addShaderPass(vs_shadow, ps_shadow);
        customShader.addSubShader(subShader);
        this.setShaderName(ShadowMaterial.NAME);
    };
    Object.defineProperty(ShadowMaterial.prototype, "diffuseTexture", {
        set: function (texture2D) {
            this._shaderValues.setTexture(ShadowMaterial.DIFFUSETEXTURE, texture2D);
        },
        enumerable: true,
        configurable: true
    });
    ShadowMaterial.DIFFUSETEXTURE = Laya.Shader3D.propertyNameToID("u_Texture");
    ShadowMaterial.NAME = "ShadowShader";
    return ShadowMaterial;
}(Laya.Material));
exports["default"] = ShadowMaterial;
