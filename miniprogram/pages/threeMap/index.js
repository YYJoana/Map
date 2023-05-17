
import * as THREE from "../../libs/three.weapp"
import { OrbitControls } from '../../jsm/controls/OrbitControls'
import * as myTextureUrl from './util/texture'
import { textureCupboard, textureCupboardFront } from "./util/texture"
const ThreeBSP = require('../../jsm/utils/index')(THREE)
Page({

    /**
     * 页面的初始数据
     */
    data(){
      return {
        canvasId: ''
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.createSelectorQuery()
        .select('#can3D')
        .node()
        .exec((res) => {
          // const canvas = res[0].node
          // 创建一个与 canvas 绑定的 three.js
          // const THREE = createScopedThreejs(canvas)
          const canvas = THREE.global.registerCanvas(res[0].node)
          this.setData({ canvasId: canvas._canvasId })
          // 创建场景
          var scene = new THREE.Scene();
          // 创建相机   远景相机  和 正交相机
          var camera = new THREE.PerspectiveCamera(45, wx.getSystemInfoSync().windowWidth / wx.getSystemInfoSync().windowHeight, 1, 1000);
          // 渲染器
          var renderer = new THREE.WebGLRenderer({
            antialias: true,
            // alpha:true
          });
          renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
          renderer.setSize(wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight);
          renderer.shadowMap.enabled = true;
          // 允许切割
          renderer.localClippingEnabled = true;
          // 背景颜色
          renderer.setClearColor(0xffffff);

          // 颜色数组CEC9C3
          const colors = [0xDAC6AB,0xD4C7C7,0xAEC3D6,0xc9c3bd,0x888888, null, 0xff4400, 0xffffff,undefined,0x555555,0x6C4B44]
          // const colors = [0xCFFFFE ,0xF9F7D9 ,0xFCE2CE ,0xFFC1F3,0x888888]
          const group = new THREE.Group();

          // 创建纹理

          function createTexture(url, side){
            const t =  new THREE.TextureLoader().load(url, function (res) {
              renderer.render(scene, camera);
            }, undefined, function (err) {
            });
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            if(side==='left'){
              t.rotation = Math.PI /2
            }
            return t
          }
          const myTexture = {}
          for (const key in myTextureUrl) {
            myTexture[key] = createTexture(myTextureUrl[key])

          }
          myTexture.textureDoorTspRoute= createTexture(myTextureUrl.textureDoorTsp,'left')
          myTexture.textureCupboardFront= createTexture(myTextureUrl.textureCupboardFront,'left')
          // myTexture.textureCupboard= createTexture(myTextureUrl.textureCupboard,'left')



          const planeMaterial = new THREE.MeshToonMaterial( {
            color: 0xaaaaaa,
            side: THREE.DoubleSide,
            map: myTexture.texture
          } )
          function createCube (size, position, texture, colorIndex){
            const geometry = new THREE.BoxGeometry(...size);
            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              // clipIntersection: true,
              map: texture,

              // transparent: true,
              // clippingPlanes : clip,
              side: THREE.DoubleSide
            }  );
            material.transparent = true
            const cube =  new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cube.position.set(x,y,z*1.5)
            group.add( cube );
          }
          function createCubeNotAdd (size, position, texture, colorIndex){
            const geometry = new THREE.BoxBufferGeometry(...size);
            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              map: texture,
              side: THREE.DoubleSide
            }  );
            // material.transparent = true
            const cube =  new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cube.position.set(x,y,z*1.5)
            return cube
          }

          function createCubeLevel1 (size, position, texture, colorIndex){
            const geometry = new THREE.BoxGeometry(...size);
            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              // clipIntersection: true,
              map: texture,

              // clippingPlanes : clip,
              side: THREE.DoubleSide
            }  );
            const cube =  new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cube.position.set(x,y,z/2+0.01 )
            group.add( cube );
          }
          // 切割面
          // const clipPlane = [
          //   // 延yoz平面切割 -2.2, 5 , height
          //   new THREE.Plane(new THREE.Vector3(-1, 0, 0), -1.9),
          //   new THREE.Plane(new THREE.Vector3(0, 1, 0), -4.9),
          //   new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
          // ];
          const height = 1.3
          const heightLevel1 = 1.29
          createCubeLevel1([0.3, 0.3, 1.2],[0.1, 0.9 , 1.26],myTexture.texture, 4)
          function createCircle(size,position,color){
            const geometry = new THREE.CylinderBufferGeometry(...size);
            const material = new THREE.MeshToonMaterial( {color:colors[color]} );
            const cylinder = new THREE.Mesh( geometry, material );
            cylinder.position.set(...position)
            cylinder.rotation.x = Math.PI / 2
            group.add( cylinder );
          }
          const loader = new THREE.FontLoader();
          // promisify font loading
          function loadFont(url) {
            return new Promise((resolve, reject) => {
              loader.load(url, resolve, undefined, reject);
            });
          }

          async function doit(text,position,side, size=0.2) {
            const font = await loadFont('https://wx.request.huangjinyu.xyz:8100/media/file/gentilis_regular.typeface.json');
            const geometry = new THREE.TextBufferGeometry(text, {
              font: font,
              size,
              height: 0.03,
              curveSegments: 12,
              bevelEnabled: false,
              bevelThickness: 0.15,
              bevelSize: .3,
              bevelSegments: 5,
            });
            const material = new THREE.MeshToonMaterial( {color:'#fff'} );
            const mesh = new THREE.Mesh(geometry, material);
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
            mesh.position.set(...position)
            if(side === 'down'){
              mesh.rotation.x = Math.PI /2
            }else if(side === 'left'){
              mesh.rotation.z = Math.PI /2
              mesh.rotation.y = Math.PI /2
            }else if(side === 'right'){
              mesh.rotation.z = -Math.PI /2
              mesh.rotation.y = -Math.PI/2
            }
            group.add(mesh);
            // addObject(0, -3, parent);
          }
          doit('3-212',[-3.05,3.2,2.2], 'left');
          doit('3-213',[-3.05,1.6,2.2], 'left');
          doit('3-209',[-2.3,2.6,2.0], 'down');
          doit('3-208',[-1.1,2.6,2.0], 'down',0.13);
          doit('3-207',[-0.3,2.6,2.0], 'down',0.13);
          doit('3-206',[0.5,2.6,2.0], 'down',0.13);
          doit('3-205',[1.3,2.6,2.0], 'down',0.13);
          doit('3-204',[2.2,3.6,2.0], 'down');
          doit('3-202',[2.54,2.85,2.0], 'right');
          doit('3-201',[2.54,1.65,2.0], 'right');
          doit('4-201',[2.54,-1.15,2.0], 'right',0.18);
          doit('4-202',[2.54,-2.2,2.0], 'right',0.18);
          doit('wc',[2.54,-3.2,2.0], 'right',0.18);
          doit('4-203',[2.54,-4.9,2.0], 'right',0.18);
          doit('4-204',[2.54,-6.05,2.0], 'right',0.18);
          doit('wc',[2.54,-7.2,2.0], 'right',0.18);
          doit('4-205',[2.54,-7.9,2.0], 'right',0.15);
          doit('4-206',[2.54,-8.7,2.0], 'right',0.15);
          doit('4-210',[-0.60,-3.55,2.2], 'right');
          doit('4-206',[-0.60,-6.1,2.2], 'right');
          doit('4-207',[-1.75,-3.65,2.2], 'left');
          doit('4-208',[-1.75,-5.45,2.2], 'left');
          doit('4-209',[-1.75,-7.28,2.2], 'left');
          // doit('3-213',[1.1,1.6,2.2], 'right');
          // level1
          createCubeLevel1([3.5, 5,heightLevel1],[-2.4, 3.25 , heightLevel1], myTexture.texture, 4)
          createCubeLevel1([3.5, 5,heightLevel1],[2.55, 3.25 , heightLevel1], myTexture.texture, 4)
          createCubeLevel1([1.45, 5,0.5],[0.075, 3.25 , 2.05], myTexture.texture, 4)
          createCubeLevel1([1.5, 3,heightLevel1],[0.075, 4.25 , heightLevel1], myTexture.texture, 4)

          // 窗户
          createCubeLevel1([1.2, 0.1,1.3],[-2.5, 0.7 , 2.00], myTexture.textureWindow, 3)

          //柱子
          createCircle([ 0.2, 0.2, 2.2, 32 ],[-3.5,0.8,1.11],6)
          createCircle([ 0.2, 0.2, 2.2, 32 ],[-1.2,0.8,1.11],6)
          createCircle([ 0.2, 0.2, 2.2, 32 ],[1.3,0.8,1.11],6)
          //围栏 中间
          createCircle([0.1,0.1, 0.5,32],[-0.6,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-0.2,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[0.2,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[0.6,0.85,2.01],4)

          //围栏 左间
          createCircle([0.1,0.1, 0.5,32],[-1.8,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-2.2,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-2.6,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-3,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-4.0,0.85,2.01],4)
          //楼梯过道
          createCube([1.15, 2.5,0.1],[2.05, -0.5 , 0.85], myTexture.texture, 4)
          //围栏 楼梯间
          createCircle([0.1,0.1, 0.5,32],[1.6,0.4,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,0,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,-0.4,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,-0.8,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,-1.2,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,-1.6,1.61],4)

          createCube([5.75, 0.3,0.5],[-1.3, 0.85 , 1.0], myTexture.texture, 4)
          createCube([5.75, 0.3,0.1],[-1.3, 0.85 , 1.5], myTexture.texture, 4)
          createCube([0.2, 2.3,0.1],[1.55, -0.6 , 1.25], myTexture.texture, 4)

          createCube([5.75, 0.3,0.5],[-1.45, -1.70 , 1.0], myTexture.texture, 4)


          // level 下半部
          // level1
          createCubeLevel1([8.65, 7.7,heightLevel1],[0, -5.45 , heightLevel1], myTexture.texture, 4)
          // 门
          createCubeLevel1([1,0.1,1],[-0.5,-1.6,1],myTexture.textureDoor,8)
          createCubeLevel1([1,0.1,1],[-3,-1.6,1.4],myTexture.textureTv,8)
          createCubeLevel1([1,0.1,1],[-2,-1.6,1.4],myTexture.textureTvRight,8)
          // createCubeLevel1([3.5, 5,heightLevel1],[2.55, 3.25 , heightLevel1], texture, 4)


          // 魏
          createCubeOutLine([1.5, 1.5,height],[-3.4, 5 , height], null, 0)
          // 蔡
          createCubeOutLine([1.1, 1.6, height],[-3.6, 3.5 , height], null, 2,'right')
          // 203
          createCubeOutLine([1.1, 1.6, height],[-3.6, 1.9 , height], null, 1,'right')
          // 梁
          createCubeOutLine([1.4, 2, height],[-2.0, 4.75 , height], null, 3,)
          createCubeOutLine([1.4, 1.2, height],[-2.0, 3.15 , height], null, 0,'down')
          createCubeOutLine([0.8, 3.2, height],[-0.9, 4.15 , height], null, 2,'down')
          createCubeOutLine([0.8, 3.2, height],[-0.1, 4.15 , height], null, 1,'down')
          createCubeOutLine([0.8, 3.2, height],[0.7, 4.15 , height], null, 2,'down')
          createCubeOutLine([0.8, 3.2, height],[1.5, 4.15 , height], null, 3,'down')

          createCubeOutLine([1.2, 2.2, height],[2.5, 4.65 , height], null, 1,'down')
          createCubeOutLine([1.2, 2.6, height],[3.7, 4.45 , height], null, 0)
          createCubeOutLine([1.8, 1.2, height],[3.4, 2.55 , height], null, 2,'left')
          createCubeOutLine([1.8, 1.2, height],[3.4, 1.35 , height], null, 0,'left','down')
          // 楼梯
          createCubeLevel1([0.4, 0.8, 0.3],[2.8, 0.35 , 0.3], myTexture.textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[3.2, 0.35 , 0.6], myTexture.textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[3.6, 0.35 , 0.9], myTexture.textureBg, 4)
          createCubeLevel1([0.4, 1.6, 0.3],[4, -0.05 , 1.2], myTexture.textureBg, 4)

          createCubeLevel1([0.4, 0.8, 0.3],[3.6, -0.4 , 1.5], myTexture.textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[3.2, -0.4 , 1.8], myTexture.textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[2.8, -0.4 , 2.1], myTexture.textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[2.8, -0.4 , 2.4], myTexture.textureBg, 4)

          createCubeOutLine([0.1, 1.8, height],[4.25, 0 , height], null,3)
          createCube([0.1, 2.4,1.3],[4.25, -0.425 , 0.45], myTexture.texture, 4)


          createCubeOutLine([1.8, 1.1, height],[3.4, -1.4 , height], null, 2,'left','up')
          createCubeOutLine([1.8, 1.0, height],[3.4, -2.45, height], null, 1,'left')
          // 厕所女
          createCubeOutLine([1.8, 0.8, height],[3.4, -3.35, height], null, 0,'left')
          createCubeOutLine([1.8, 0.8, height],[3.4, -4.15, height], null, 3,'left')
          // 4-203 / 4-204
          createCubeOutLine([1.8, 1.2, height],[3.4, -5.15, height], null, 1,'left')
          createCubeOutLine([1.8, 1.2, height],[3.4, -6.35, height], null, 2,'left')

          createCubeOutLine([1.8, 0.8, height],[3.4, -7.35, height], null, 3,'left')
          createCubeOutLine([1.8, 0.8, height],[3.4, -8.15, height], null, 0,'left')
          createCubeOutLine([1.8, 0.8, height],[3.4, -8.95, height], null, 1,'left')
          function useBSP(bigGeometries, smallGeometries){
            const bigGeometriesBSP = new ThreeBSP(bigGeometries)
            const smallGeometriesBSP = new ThreeBSP(smallGeometries)
            const resultBSP = bigGeometriesBSP.subtract(smallGeometriesBSP)
            const result = resultBSP.toMesh()
            result.geometry.computeFaceNormals()
            result.geometry.computeVertexNormals()
            return result
          }

          // 创建房间框的函数
          function createCubeOutLine(size,position,texture,colorIndex, doorSide, windowSide){
            const [w,h,o] = size
            const [x,y,z] = position
            const up = y + h/2 - 0.05
            const down = y - h/2 + 0.05
            const left = x - w/2 + 0.05
            const right =  x + w/2 - 0.05

            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              map: myTexture.texture,
              side: THREE.DoubleSide
            }  );

            function createWithWindow(show,side){
              let temp
              if(side==='up'){
                temp = up
              }else {
                temp = down
              }
              if(show){
                const bigCubeForWindow = createCubeNotAdd([w, 0.1, o],[x, temp, z], texture, colorIndex)
                const smallCubeForWindow = createCubeNotAdd([w/2, 0.1, o*0.6],[x, temp, z], texture, colorIndex)
                const res = useBSP(bigCubeForWindow, smallCubeForWindow)
                res.material = material
                group.add(res)
                createCube([w/2, 0.1, o*2/3],[x, temp, z], myTexture.textureWindowTsp, colorIndex)
              }else {
                createCube([w, 0.1, o],[x, temp, z], texture, colorIndex)
              }
            }


            if(doorSide === 'left'){
            // 左边开槽
            // 建糟
              //  左
              const bigCube = createCubeNotAdd([0.1, h, o],[left, y, z], texture, colorIndex)
              let smallCube
              if(h>2.5){
                 smallCube =  createCubeNotAdd([0.1, h/3, o],[left, y, z], texture, colorIndex)
                createCube([0.05, h/3, o],[left, y, z], myTexture.textureDoorTspRoute, colorIndex)
              }else {
                smallCube =  createCubeNotAdd([0.1, h/2, o-0.2],[left, y, z-0.1], texture, colorIndex)
                createCube([0.05, h/2, o-0.2],[left, y, z-0.1], myTexture.textureDoorTspRoute, colorIndex)
              }

              const res = useBSP(bigCube, smallCube)
              res.material = material
              group.add(res)

              // 上

              // 上
              if(windowSide === 'up'){
                createWithWindow(true,'up')
              }else {
                createWithWindow(false,'up')
              }
              // 下
              if(windowSide === 'down'){
                createWithWindow(true, 'down')
              }else {
                createWithWindow(false,'down')
              }
              // 右
              createCube([0.1, h, o],[right, y, z], texture, colorIndex)
            } else if (doorSide === 'right'){
              const bigCube = createCubeNotAdd([0.1, h, o],[right, y, z], texture, colorIndex)
              const smallCube =  createCubeNotAdd([0.1, h/3, o],[right, y, z], texture, colorIndex)
              const res = useBSP(bigCube, smallCube)
              res.material = material
              group.add(res)
              createCube([0.05, h/3, o],[right, y, z], myTexture.textureDoorTspRoute, colorIndex)

              // 上
              if(windowSide === 'up'){
                createWithWindow(true,'up')
              }else {
                createWithWindow(false,'up')
              }
              // 下
              if(windowSide === 'down'){
                createWithWindow(true, 'down')
              }else {
                createWithWindow(false, 'down')
              }
              // 左
              createCube([0.1, h, o],[left, y, z], texture, colorIndex)
            } else if (doorSide === 'down'){
              // 下
              const bigCube = createCubeNotAdd([w, 0.1, o],[x, down, z], texture, colorIndex)
              const smallCube =  createCubeNotAdd([w/2, 0.1, o-0.2],[x, down, z-0.1], texture, colorIndex)
              const res = useBSP(bigCube, smallCube)
              res.material = material
              group.add(res)
              createCube([w/2, 0.05, o],[x, down, z], myTexture.textureDoorTsp, colorIndex)

              // 上
              createCube([w, 0.1, o],[x, up, z], texture, colorIndex)
              // 左
              createCube([0.1, h, o],[left, y, z], texture, colorIndex)
              // 右
              createCube([0.1, h, o],[right, y, z], texture, colorIndex)
            }else{
              // 上
              createCube([w, 0.1, o],[x, up, z], texture, colorIndex)
              // 下
              createCube([w, 0.1, o],[x, down, z], texture, colorIndex)
              // 左
              createCube([0.1, h, o],[left, y, z], texture, colorIndex)
              // 右
              createCube([0.1, h, o],[right, y, z], texture, colorIndex)
            }
            //  地板
            createCube([w-0.2,h-0.2, 0.1],[x,y, 0.9], myTexture.textureBg, 8)
          }

          function createCubeTransparent (size, position, texture, colorIndex){
            const geometry = new THREE.BoxGeometry(...size);
            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              map: texture,
              transparent: true,
              depthTest: false,
              side: THREE.DoubleSide
            }  );
            const cube =  new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cube.position.set(x,y,z/2+0.01 )
            group.add( cube );
          }
          function createPlant(position){
            const geometry = new THREE.CylinderGeometry( 0.2, 0.15, 0.3, 32 );
            const material = new THREE.MeshToonMaterial( {color: 0xAAAAAA} );
            const cylinder = new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cylinder.position.set(x,y,1.5)
            cylinder.rotation.x = Math.PI / 2
            group.add( cylinder );
            createCubeTransparent([0.5,0.05,0.8],position,myTexture.texturePlant,8)
            createCubeTransparent([0.05,0.5 ,0.8],position,myTexture.texturePlant,8)

          }
          // 创建椅子
          function createChart(position){
            const geometry = new THREE.CylinderBufferGeometry( 0.1, 0.1, 0.6, 32 );
            const material = new THREE.MeshBasicMaterial( {color: 0x666666} );
            const cylinder = new THREE.Mesh( geometry, material );
            cylinder.position.set(...position)
            cylinder.rotation.x = Math.PI / 2

            group.add( cylinder );
          }
          // 创建柜子
          function createCupboard(size,position){
            var materials = [new THREE.MeshBasicMaterial( { map: myTexture.textureCupboardFront })];
            for (let i = 0; i < 5; i++) {
              materials.push(new THREE.MeshBasicMaterial( { map: myTexture.textureCupboard }))
            }
            var mesh = new THREE.Mesh( new THREE.BoxBufferGeometry( ...size ), materials );
            mesh.position.set(...position)
            group.add(mesh)
          }
          // 创建好看的椅子
          function createChartPlus(position,side){
            const chartGroup = new THREE.Group()
            const res = createCubeNotAdd([0.07,0.07,0.5],[-0.05,-0.05,1],null,9)
            res.rotation.x = -Math.PI / 12
            res.rotation.y = Math.PI / 12
            const res2 = createCubeNotAdd([0.07,0.07,0.5],[-0.05,0.45,1],null,9)
            res2.rotation.x = Math.PI / 12
            res2.rotation.y = Math.PI / 12
            const res3 = createCubeNotAdd([0.07,0.07,0.5],[0.45,0.45,1],null,9)
            res3.rotation.x = Math.PI / 12
            res3.rotation.y = -Math.PI / 12
            const res4 = createCubeNotAdd([0.07,0.07,0.5],[0.45,-0.05,1],null,9)
            res4.rotation.x = -Math.PI / 12
            res4.rotation.y = -Math.PI / 12
            const theOne = createCubeNotAdd([0.07,0.07,0.35],[0.4,0.4,1.3],null,9)
            const theOther = createCubeNotAdd([0.07,0.07,0.35],[0.4,0,1.3],null,9)
            const border = createCubeNotAdd([0.25,0.55,0.05],[0.40,0.2,1.43],null,9)
            border.rotation.y = -Math.PI / 5

            const chartFloor = createCubeNotAdd([0.5,0.5,0.05],[0.2,0.2,1.16],null,9)
            chartGroup.add(res)
            chartGroup.add(res2)
            chartGroup.add(res3)
            chartGroup.add(res4)
            chartGroup.add(chartFloor)
            chartGroup.add(theOne)
            chartGroup.add(theOther)
            chartGroup.add(border)
            chartGroup.position.set(...position)
            if(side === 'right'){
              chartGroup.rotation.z = -Math.PI
            }
            else if(side === 'down'){
              chartGroup.rotation.z = Math.PI /2
            }
            group.add(chartGroup)
          }
          // 以下都是装饰
          // 椅子
          createChartPlus([1,-3.8,0])
          createChartPlus([1,-4.8,0])

          createChartPlus([1,-6.3,0])
          createChartPlus([1,-7.3,0])

          createChartPlus([-3.2,-3.4,0],'right')
          createChartPlus([-3.2,-5.1,0],'right')
          createChartPlus([-3.2,-6.8,0],'right')

          createChartPlus([3.9,5.1,0],'down')
          createChartPlus([2.65,5.1,0],'down')
          createChartPlus([-1.85,5.1,0],'down')
          createChartPlus([3.6,2.5,0])
          createChartPlus([3.6,1.1,0])

          createChartPlus([3.6,-1.6,0])
          createChartPlus([3.6,-2.6,0])
          createChartPlus([3.6,-5.4,0])
          createChartPlus([3.6,-6.6,0])

          createCupboard([0.5,0.5,1], [-0.1,-3, 2.0])
          createCupboard([0.5,0.5,1], [-3.8,-6.5, 2.0])
          createCupboard([0.5,0.5,1], [-2.20,3.3, 2.0])
          // 桌子
          // 4-210
          createCube([0.6,0.8,height*0.4],[0.5,-3.45,height],null,10)
          createCube([0.6,0.8,height*0.4],[0.5,-4.5,height],null,10)
          // 4-211
          createCube([0.6,0.8,height*0.4],[0.5,-6.1,height],null,10)
          createCube([0.6,0.8,height*0.4],[0.5,-7.1,height],null,10)
          // 4-207
          createCube([0.5,0.9,height*0.4],[-2.7,-3.6,height],null,10)
          //4-208
          createCube([0.5,0.9,height*0.4],[-2.7,-5.3,height],null,10)
          //4-209
          createCube([0.5,0.9,height*0.4],[-2.7,-7,height],null,10)

          createCube([0.8,0.5,height*0.4],[-2.0,4.6,height],null,10)
          createCube([0.8,0.5,height*0.4],[2.5,4.6,height],null,10)
          createCube([0.8,0.5,height*0.4],[3.7,4.6,height],null,10)
          // 右侧办公室
          createCube([0.5,0.8,height*0.4],[3.1,2.6,height],null,10)
          createCube([0.5,0.8,height*0.4],[3.1,1.3,height],null,10)
          createCube([0.5,0.75,height*0.4],[3.1,-1.4,height],null,10)
          createCube([0.5,0.75,height*0.4],[3.1,-2.4,height],null,10)
          createCube([0.5,0.8,height*0.4],[3.1,-5.15,height],null,10)
          createCube([0.5,0.8,height*0.4],[3.1,-6.35,height],null,10)
          // 电脑屏
          createCubeLevel1([1,0.1,1],[-3.35,-4.4,4.1],myTexture.textureComputer,8)
          createCubeLevel1([1,0.1,1],[-2.35,-4.4,4.1],myTexture.textureComputerRight,8)
          // 电视屏
          createCubeLevel1([1,0.1,1],[0.15,-5.3,4.1],myTexture.textureTv,8)
          createCubeLevel1([1,0.1,1],[1.15,-5.3,4.1],myTexture.textureTvRight,8)
          // 花盆

          createPlant([1.55,-3.0,4.1])
          // createPlant([1.55,-5.8,4.1])
          createPlant([-2.30,-3.0,4.1])
          createPlant([-3.75,-4.65,4.1])
          createPlant([-2.30,-6.5,4.1])
          createPlant([-3.30,5.1,4.1])
          createPlant([-0.1,5.1,4.1])
          createPlant([1.5,5.1,4.1])
          createPlant([3.7,-4.2,4.1])


          // 老师办公室 右
          createCubeOutLine([2.6, 2.6, height],[0.7, -3.85, height], null, 0,'left','up')
          createCubeOutLine([2.6, 2.6, height],[0.7, -6.45, height], null, 2,'left','down')


          // 老师办公室 左
          createCubeOutLine([2.6, 1.8, height],[-3.0, -3.35, height], null, 3,'right','up')
          createCubeOutLine([2.6, 1.8, height],[-3.0, -5.15, height], null, 0,'right')
          createCubeOutLine([2.6, 1.8, height],[-3.0, -6.95, height], null, 1,'right','down')
          //挡板
          createCube([0.6, 0.1, height],[-0.9, -3.35, height], null, 4)
          createCube([0.6, 0.1, height],[-0.9, -6.85, height], null, 4)
          // 桌子
          const heightTable = 0.9
          createCube([0.4, 0.6, heightTable],[-1, -4.35, heightTable], null, 3)
          createCube([0.4, 0.6, heightTable],[-1, -5.95, heightTable], null, 3)
          // 椅子
          createChart([-1.4, -4.25, height])
          createChart([-1.4, -4.55, height])
          createChart([-1.4, -5.95, height])
          createChart([-1.4, -6.25, height])



          const controls = new OrbitControls(camera, renderer.domElement);
          controls.update();
          controls.maxAzimuthAngle =Math.PI /2;
          controls.minAzimuthAngle =-Math.PI /2;
          // 接受阴影的平面
          const planeGeometry = new THREE.PlaneBufferGeometry( 11, 19.5, 32, 32 );

          const plane = new THREE.Mesh( planeGeometry, planeMaterial );
          plane.receiveShadow = true;
          plane.position.set(0,-2,0)
          group.position.set(0,1.5,0)
          group.add( plane )

          // 平行光
          const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
          directionalLight.position.set(0, 0, 20);
          directionalLight.castShadow = true

          directionalLight.shadow.mapSize.width = 512; // default
          directionalLight.shadow.mapSize.height = 512; // default
          directionalLight.shadow.camera.near = 0.5; // default
          directionalLight.shadow.camera.far = 500; // default


          scene.add( directionalLight );
          scene.add(group);



          camera.position.z = 25
          camera.lookAt( 0, -1, 0)

          group.rotation.x += 0;

          function render() {
            canvas.requestAnimationFrame(render);
            // mesh.rotation.x += 0.005;
            // mesh.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
          }

          render()
    })


  },

    /**
     * 生命周期函数--监听页面显示
     */
    touchStart(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
    },
    touchMove(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
    },
    touchEnd(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
    },
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */

  onUnload: function () {
    //  释放canvas
    THREE.global.unregisterCanvas(this.data.canvasId)
  },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
