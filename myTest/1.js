import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 新建场景
const scene = new THREE.Scene();

// 新建几何体
const geometry = new THREE.BoxGeometry(5, 5, 5);

// 新建材质
const material = new THREE.MeshLambertMaterial({
  color: 0xd6acff,
  transparent: true,
  opacity: 1
});

// 生成一个模型
const mesh = new THREE.Mesh( geometry, material );
mesh.position.set(0, 3, 0);
scene.add( mesh );

const width = window.innerWidth;
const height = window.innerHeight;

// 新建摄像机
const camera = new THREE.PerspectiveCamera(45, width/height, 1, 500);
camera.position.set(40, 40, 40);
camera.lookAt(mesh.position);

// 新建光源
const pointLight = new THREE.PointLight(0xff0000, 10.0);
pointLight.position.set( 40, 40, 40 );
scene.add( pointLight );


// 添加辅助坐标系
const axesHelper = new THREE.AxesHelper(120);
scene.add(axesHelper)

// 新建渲染器，并执行渲染方法
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(scene, camera);

// 将渲染结果添加到canvas
document.body.appendChild(renderer.domElement);

// 新建一个控制器
const controller = new OrbitControls(camera, renderer.domElement);
