import { AxesHelper, GridHelper } from "three";

/**
 * 创建坐标轴辅助
 * @returns {AxesHelper} 坐标轴辅助对象
 */
function createAxesHelper(): AxesHelper {
  const helper = new AxesHelper(20);
  helper.position.set(-11, 0, -11);
  return helper;
}

/**
 * 创建网格辅助
 * @returns {GridHelper} 网格辅助对象
 */
function createGridHelper(): GridHelper {
  const helper = new GridHelper(20);
  return helper;
}

export { createAxesHelper, createGridHelper };
