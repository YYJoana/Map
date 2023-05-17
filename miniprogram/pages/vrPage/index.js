// pages/vrPage/index.js
import * as THREE from '../../libs/three.weapp.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls'

Page({
  data(){
    return {
      canvasId: ''
    }
  },
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#can3D')
      .node()
      .exec((res) => {
        // 创建canvas对象
        const canvas = THREE.global.registerCanvas(res[0].node)
        // 记录canvas的id，好在page销毁的时候释放canvas
        this.setData({ canvasId: canvas._canvasId })

        const camera = new THREE.PerspectiveCamera(75, canvas.width  / canvas.height , 1, 4000);
        camera.position.z = 500;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xAAAAAA);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
        renderer.setSize(wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false

        camera.position.set(-0.1, 2, -5);
        controls.update();
        wx.showLoading({
          title: '加载中',
        })
        var sides = ['http://www.huangjinyu.xyz/imgTemp/%E5%8F%B3.jpg', 'http://www.huangjinyu.xyz/imgTemp/%E5%B7%A6.jpg','http://www.huangjinyu.xyz/imgTemp/%E4%B8%8A.jpg', 'http://www.huangjinyu.xyz/imgTemp/%E4%B8%8B.jpg','http://www.huangjinyu.xyz/imgTemp/%E5%89%8D.jpg', 'http://www.huangjinyu.xyz/imgTemp/%E5%90%8E.jpg']
        var materials = [];
        for (var i = 0; i < sides.length; i++) {
          var side = sides[i];
          var texture = new THREE.TextureLoader().load(side,function (res){
            renderer.render(scene, camera)
            wx.hideLoading()
          });
          materials.push( new THREE.MeshBasicMaterial( { map: texture } ) );
        }

        var mesh = new THREE.Mesh( new THREE.BoxBufferGeometry( canvas.height, canvas.height, 2 * canvas.height ), materials );
        // mesh.geometry.scale( -1, 1, 1 );
        mesh.geometry.scale( -1, 1, 1 );

        texture.minFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        // var material = new THREE.MeshBasicMaterial( { map: texture } );
        // const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);


        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.width * 2, canvas.height);
        }
        function render() {
          canvas.requestAnimationFrame(render);
          controls.update();
          renderer.render(scene, camera);
        }

        render()

      })
  },
  onUnload: function () {
    //  释放canvas
    THREE.global.unregisterCanvas(this.data.canvasId)
  },
  touchStart(e) {
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e) {
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e) {
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  }
})
