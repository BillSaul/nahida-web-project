"use client";

import Three from "@/utils/threejs/ThreeJS";
import { useEffect, useRef } from "react";
import "./home-box2.scss";

export default function HomeBox2() {
  const sceneContainer = useRef<any>(null);

  const initThree = async () => {
    const three = new Three(sceneContainer.current);

    await three.init();

    // 渲染场景
    // three.start();

    const observer = new IntersectionObserver(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("threejs 容器现在可见");
            three.start();
            sceneContainer.current.style.visibility = "visible";
          } else {
            console.log("threejs 容器现在不可见");
            three.stop();
            sceneContainer.current.style.visibility = "hidden";
          }
        });
      },
      {
        threshold: 0.5, // 设置阈值，50% 的元素进入视口时触发
      }
    );
    observer.observe(sceneContainer.current);
  };

  useEffect(() => {
    initThree();
  }, []);

  return (
    <div className="home-box2">
      <div ref={sceneContainer} className="scene-container"></div>
    </div>
  );
}
