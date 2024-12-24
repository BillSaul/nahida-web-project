import { PCFSoftShadowMap, WebGLRenderer } from "three";

/**
 * 创建WebGL渲染器
 * @returns {WebGLRenderer} 渲染器实例
 */
function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.shadowMap.enabled = true; // 开启阴影
  renderer.shadowMap.type = PCFSoftShadowMap; // 阴影类型

  return renderer;
}

export { createRenderer };
