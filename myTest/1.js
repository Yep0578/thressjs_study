import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// 新建GUI
const gui = new GUI();

// 新建场景
const scene = new THREE.Scene();

// 新建矩形
const geometry = new THREE.BoxGeometry(4, 4, 4);

// 新建矩形材质
const material = new THREE.MeshLambertMaterial({
  color: 0xd6acff,
  transparent: true,
  opacity: 1
});
// 生成一个模型
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 2, 0);
scene.add(mesh);

// 新建平面
const plane = new THREE.PlaneGeometry(100, 100);
// 平面材质
const plane_material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
});
const planeMesh = new THREE.Mesh(plane, plane_material);
planeMesh.position.set(0, 0, 0);
planeMesh.rotateX(Math.PI / 2);
scene.add(planeMesh);

// 生成矩形列阵
// for (let i = 0; i < 20; i++) {
//   for (let j = 0; j < 20; j++) {
//     const mesh = new THREE.Mesh(geometry, material);
//     mesh.position.set(i*10, 0, j*10);
//     scene.add(mesh);
//   }
// }

const width = window.innerWidth;
const height = window.innerHeight;

// 新建相机
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(30, 80, 80);
camera.lookAt(0, 0, 0);

// 添加红色点光源，强度为 1000
const pointLight = new THREE.PointLight(0xff0000, 1000.0);
pointLight.position.set(20, 7, 20);
scene.add(pointLight);

// 从上方照射的白色平行光，强度为 1
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

// 添加白色环境光, 强度为 1
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// 帧数计算
const stats = new Stats();
document.body.appendChild(stats.domElement);


// 添加辅助坐标系
const axesHelper = new THREE.AxesHelper(120);
scene.add(axesHelper)

// 新建渲染器，并执行渲染方法
const renderer = new THREE.WebGLRenderer({
  antialias: true   // 抗锯齿
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);  // 设置像素比，必写
renderer.render(scene, camera);

// 自动旋转动画
const GUIoptions = {
  isRotate: false
};
function render() {
  stats.update();
  if (GUIoptions.isRotate) {
    mesh.rotateY(0.01);
    renderer.render(scene, camera);
    requestAnimationFrame(render)
  }
};

// 添加可视化修改UI
gui.add(pointLight, 'intensity', 1, 10000).name('点光源强度').step(0.05).onChange(function (value) {
  pointLight.intensity = value;
  renderer.render(scene, camera);
});

gui.add(directionalLight, 'intensity', 0, 5).name('平行光强度').step(0.05).onChange(function (value) {
  directionalLight.intensity = value;
  renderer.render(scene, camera);
});

gui.add(GUIoptions, 'isRotate').name('自动旋转').onChange(function (value) {
  render();
});


// 将渲染结果添加到canvas
document.body.appendChild(renderer.domElement);

// 新建一个相机轨道控制器，相机观察点为(0, 0, 0)
const controller = new OrbitControls(camera, renderer.domElement);
controller.target.set(0, 0, 0);
controller.update();
controller.addEventListener('change', function () {
  renderer.render(scene, camera);
})

// 监听窗口大小变化，改变画布大小和摄像机参数
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}