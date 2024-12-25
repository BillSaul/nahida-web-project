import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

/**
 * 创建GUI
 * @param objects 需要被控制的对象
 * @returns 返回一个GUI实例
 */
function createGui(...objects: any[]): GUI {
  const [helper] = objects;

  // 模型列表
  // const models = {
  //   nahida: "/models/纳西妲/纳西妲.pmx",
  //   robin: "/models/知更鸟/知更鸟.pmx",
  //   HoshimiMiyabi: "/models/星见雅/星见雅.pmx",
  // };

  const options = {
    model: "nahida",
    animation: true,
    ik: true,
    physics: true,
    "show IK bones": false,
    "show rigid bodies": false,
  };

  const gui = new GUI();

  // 模型切换选项
  // gui.add(options, "model", Object.keys(models)).onChange((value) => {
  //   console.log("🚀 ~ value:", value);
  // });
  // 动画开关
  gui.add(options, "animation").onChange(() => {
    helper.enable("animation", options["animation"]);
  });
  // 逆向运动学开关
  gui.add(options, "ik").onChange(() => {
    helper.enable("ik", options["ik"]);
  });
  // 物理开关
  gui.add(options, "physics").onChange(() => {
    helper.enable("physics", options["physics"]);
  });
  // 显示逆向运动学骨骼
  gui.add(options, "show IK bones").onChange(() => {
    if (!!helper.ikHelper) helper.ikHelper.visible = options["show IK bones"];
  });
  // 显示刚体
  gui.add(options, "show rigid bodies").onChange(() => {
    if (!!helper.physicsHelper)
      helper.physicsHelper.visible = options["show rigid bodies"];
  });

  return gui;
}

export { createGui };
