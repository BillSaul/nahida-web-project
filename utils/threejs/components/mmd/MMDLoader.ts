import { MMDLoader as ThreeMMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";

/**
 * 二次封装的 MMDLoader，支持 Promise 异步加载
 */
class MMDLoader extends ThreeMMDLoader {
  constructor(args?: any) {
    super(args);
  }

  /**
   * 异步加载 MMD 动画
   * @param url 一个包含有.vmd文件的路径或URL的字符串或字符串数组
   * @param obj SkinnedMesh 或 Camera。 剪辑及其轨道将会适应到该对象。
   * @returns 返回一个 Promise 对象
   */
  loadAsyncAnimation(url: string, obj: any) {
    return new Promise((resolve, reject) => {
      this.loadAnimation(
        url,
        obj,
        (vmd) => {
          resolve(vmd);
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * 异步加载 MMD 模型和动画
   * @param modelUrl 一个包含有.pmd或.pmx文件的路径或URL的字符串
   * @param vmdUrl 一个包含有.vmd文件的路径或URL的字符串或字符串数组
   * @returns 返回一个 Promise 对象
   */
  loadAsyncWithAnimation(modelUrl: string, vmdUrl: string) {
    return new Promise((resolve, reject) => {
      this.loadWithAnimation(
        modelUrl,
        vmdUrl,
        (mmd) => {
          resolve(mmd);
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }
}

export { MMDLoader };
