import { Color, Scene } from "three";

/**
 * 创建场景
 * @returns {Scene} 场景实例
 */
function createScene(): Scene {
  const scene = new Scene();

  scene.background = new Color("black"); // 设置背景颜色
  // scene.background = new Color().setHSL(0.6, 0, 1); // 设置背景颜色

  return scene;
}

export { createScene };
