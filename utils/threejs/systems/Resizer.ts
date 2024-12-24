import { PerspectiveCamera, WebGLRenderer } from "three";

/**
 * 设置渲染器和相机的大小方法
 * @param {HTMLElement} container
 * @param {PerspectiveCamera} camera
 * @param {WebGLRenderer} renderer
 */
const setSize = (
  container: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) => {
  // 设置相机横纵比
  camera.aspect = container.clientWidth / container.clientHeight;

  // 更新相机的投影矩阵
  camera.updateProjectionMatrix();

  // 设置渲染器的大小
  renderer.setSize(container.clientWidth, container.clientHeight);

  // 设置像素比
  renderer.setPixelRatio(window.devicePixelRatio);
};

/**
 * 调整渲染器和相机的大小类
 */
class Resizer {
  constructor(
    container: HTMLElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    setSize(container, camera, renderer);

    // 监听容器的大小变化，调整渲染器和相机的大小
    const resizeObserver = new ResizeObserver(() => {
      setSize(container, camera, renderer);
      this.onResize();
    });
    resizeObserver.observe(container);
  }

  onResize() {}
}

export { Resizer };
