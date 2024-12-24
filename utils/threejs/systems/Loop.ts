import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";

const clock = new Clock();

/**
 * 循环渲染类
 */
class Loop {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  updatables: any[];

  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  // 开始渲染
  start(stats: any) {
    this.renderer.setAnimationLoop(() => {
      stats.begin();
      this.tick(); // 告诉每个动画对象向前推进一帧
      this.renderer.render(this.scene, this.camera); // 渲染一帧
      stats.end();
    });
  }

  // 停止渲染
  stop() {
    this.renderer.setAnimationLoop(null);
  }

  // 每一帧调用
  tick() {
    // 每一帧只调用一次getDelta函数！
    // 该函数返回上一帧渲染的时间
    const delta = clock.getDelta();

    // 遍历所有的updatables，调用每个对象的tick方法
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
