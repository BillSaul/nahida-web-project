import { PerspectiveCamera } from "three";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 继承自OrbitControls，添加了tick方法
class OrbitControls extends ThreeOrbitControls {
  constructor(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
    super(camera, canvas);
  }

  // tick方法应在每一帧调用
  // 用于更新控制器的状态
  tick() {
    this.update();
  }
}

/**
 * 创建控制器
 * @param camera 相机实例
 * @param canvas 画布示例
 * @returns {OrbitControls} 控制器实例
 */
function createControls(
  camera: PerspectiveCamera,
  canvas: HTMLCanvasElement
): OrbitControls {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true; // 启用阻尼（惯性）

  // 自动旋转
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1;

  return controls;
}

export { createControls };
