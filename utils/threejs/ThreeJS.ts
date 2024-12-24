import {
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { createCamera } from "./components/camera";
import { createAxesHelper, createGridHelper } from "./components/helpers";
import { createLights } from "./components/lights";
import { setupModel } from "./components/mmd/setupModel";
import { createScene } from "./components/scene";
import { createControls } from "./systems/controls";
import { createGui } from "./systems/gui";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";

class ThreeJS {
  #camera: PerspectiveCamera;
  #renderer: WebGLRenderer;
  #scene: Scene;
  #loop: any;
  #controls: any;
  #stats: any;

  constructor(container: HTMLElement) {
    this.#camera = createCamera(); // 创建相机
    this.#scene = createScene(); // 创建场景
    this.#renderer = createRenderer(); // 创建渲染器
    this.#controls = createControls(this.#camera, this.#renderer.domElement); // 创建控制器
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer); // 创建循环器（用于动画循环）
    this.#stats = new Stats(); // 创建性能监控器
    container.appendChild(this.#stats.dom);

    // 创建一个平面，用于接收阴影
    const planeGeometry = new PlaneGeometry(100, 100); // 几何
    const planeMaterial = new MeshStandardMaterial({ color: 0x808080 }); // 材质
    const plane = new Mesh(planeGeometry, planeMaterial); // 网格（一个物体）
    plane.rotation.x = -Math.PI / 2; // 旋转，
    plane.receiveShadow = true; // 接收阴影
    this.#scene.add(plane);

    // 创建灯光
    const {
      hemiLight,
      dirLight,
      hemisphereLightHelper,
      directionalLightHelper,
    } = createLights();

    // 添加灯光到场景中
    this.#scene.add(
      hemiLight,
      dirLight,
      hemisphereLightHelper,
      directionalLightHelper
    );

    // 将渲染器的 DOM 元素添加到传入的容器中
    container.append(this.#renderer.domElement);

    // 将控制器添加到循环器的更新列表中
    this.#loop.updatables.push(this.#controls);

    // 创建一个新的 Resizer
    new Resizer(container, this.#camera, this.#renderer);

    // 添加坐标轴和网格辅助线
    this.#scene.add(createAxesHelper(), createGridHelper());
  }

  /**
   * 初始化函数，加载模型
   */
  async init() {
    const { mmd, helper } = await setupModel(); // 加载模型

    // 创建 GUI
    createGui(helper, [this.#scene, mmd.mesh]); // 创建GUI

    // 添加到循环器的更新列表中
    this.#loop.updatables.push(helper);

    // 将控制器中心设置为模型的位置
    // this.#controls.target.copy(mmd.mesh.position);
    this.#controls.target.set(0, 10, 0);

    this.#scene.add(mmd.mesh); // 将模型添加到场景中
    this.#scene.add(helper.ikHelper); // 将 IK 助手添加到场景中
    this.#scene.add(helper.physicsHelper); // 将物理助手添加到场景中
  }

  /**
   * 渲染场景（只渲染一帧）
   */
  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }

  /**
   * 开始动画循环
   */
  start() {
    this.#loop.start(this.#stats);
  }

  /**
   * 停止动画循环
   */
  stop() {
    this.#loop.stop();
  }
}

export default ThreeJS;
