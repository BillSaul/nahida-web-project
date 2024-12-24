import { MMDAnimationHelper as ThreeMMDAnimationHelper } from "three/examples/jsm/animation/MMDAnimationHelper.js";

declare const Ammo: any;

class MMDAnimationHelper extends ThreeMMDAnimationHelper {
  ikHelper: any;
  physicsHelper: any;

  constructor(args?: any) {
    super(args);
  }

  /**
   * tick方法应在每一帧调用，该方法会调用update方法，告诉每个动画对象向前推进一帧
   * @param delta
   */
  tick(delta: any) {
    this.update(delta);
  }

  /**
   * 初始化函数
   * @param mmd MMD模型
   */
  async init(mmd: any) {
    await Ammo(); // 加载Ammo库
    // 添加MMD模型
    this.add(mmd.mesh, {
      animation: mmd.animation, // 动画
      physics: true, // 物理
    });

    // 创建逆向运动学帮助器
    this.ikHelper = this.objects.get(mmd.mesh)?.ikSolver.createHelper();
    this.ikHelper.visible = false;

    // 创建物理帮助器
    this.physicsHelper = this.objects.get(mmd.mesh)?.physics?.createHelper();
    this.physicsHelper.visible = false;
  }
}

export { MMDAnimationHelper };
