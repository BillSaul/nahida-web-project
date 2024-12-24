import {
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
} from "three";

/**
 * 创建光源
 * @returns {Object} 包含环境光和主光源的对象
 */
function createLights(): { [key: string]: any } {
  const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 1); // 创建一个半球光
  hemiLight.color.setHSL(0.6, 1, 0.6); // 设置颜色
  hemiLight.groundColor.setHSL(0.095, 1, 0.75); // 设置地面颜色
  hemiLight.position.set(0, 30, 0); // 设置位置

  const dirLight = new DirectionalLight(0xffffff, 2); // 创建一个平行光
  dirLight.color.setHSL(0.1, 1, 0.95); // 设置颜色
  dirLight.position.set(10, 30, 20); // 设置位置
  dirLight.target.position.set(0, 15, 0); // 设置目标位置
  // 阴影相关设置
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -50;
  dirLight.shadow.camera.left = -50;
  dirLight.shadow.camera.right = 50;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.bias = -0.001;

  const hemisphereLightHelper = new HemisphereLightHelper(hemiLight, 5); // 创建半球光帮助器
  const directionalLightHelper = new DirectionalLightHelper(dirLight, 5); // 创建平行光帮助器

  return {
    hemiLight,
    dirLight,
    hemisphereLightHelper,
    directionalLightHelper,
  };
}

export { createLights };
