import { MMDAnimationHelper } from "./MMDAnimationHelper";
import { MMDLoader } from "./MMDLoader";

async function setupModel() {
  const loader = new MMDLoader();
  const helper = new MMDAnimationHelper({
    afterglow: 2.0,
  });

  // 加载模型
  const mmd: any = await loader.loadAsyncWithAnimation(
    "/models/纳西妲/纳西妲.pmx",
    "/vmds/wavefile_v2.vmd"
  );

  // 开启阴影
  mmd.mesh.castShadow = true;
  mmd.mesh.receiveShadow = false;

  await helper.init(mmd); // 初始化动画助手

  return { mmd, helper };
}

export { setupModel };
