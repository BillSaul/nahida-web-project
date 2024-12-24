import { PerspectiveCamera } from "three";

/**
 * 创建相机
 * @returns {PerspectiveCamera} 相机实例
 */
function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(35, 1, 0.1, 200);

  // 设置相机的位置
  camera.position.set(0, 20, 50);

  return camera;
}

export { createCamera };
