"use client";

import NahidaGif from "@/components/nahida-gif";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import "./home-box1.scss";

export default function HomeBox1() {
  const [nanaCount, setNanaCount] = useState(0);
  const nahidaGifRef = useRef<any>(null);
  const cachedObjects = useRef<{ [key: string]: string }>({});

  const audioList = useMemo(
    () => [
      "audio/变聪明啦.mp3",
      "audio/被打晕了.mp3",
      "audio/别打啦.mp3",
      "audio/诶.mp3",
      "audio/好痛啊.mp3",
      "audio/呵呵.mp3",
      "audio/嘿.mp3",
      "audio/记住你了.mp3",
      "audio/呐呐.mp3",
    ],
    []
  );

  const tryCachedObject = (origUrl: string) => {
    // 检查对象是否已经被缓存
    if (cachedObjects.current[origUrl]) {
      return cachedObjects.current[origUrl];
    } else {
      // 开始缓存
      fetch(origUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          cachedObjects.current[origUrl] = blobUrl;
        })
        .catch((error) => {
          console.error(`Error caching object from ${origUrl}: ${error}`);
        });
      return origUrl;
    }
  };

  const handleClick = () => {
    if (nahidaGifRef.current) {
      setNanaCount(nanaCount + 1);
      localStorage.setItem("nanaCount", (nanaCount + 1).toString());
      const audio = new Audio(
        tryCachedObject(audioList[Math.floor(Math.random() * 9)])
      );
      audio.play();
      nahidaGifRef.current.addElement();
    }
  };

  useEffect(() => {
    audioList.forEach((item: string) => {
      tryCachedObject(item);
    });
    console.log("load nanaCount from localStorage");
    const count = localStorage.getItem("nanaCount");
    if (count) {
      setNanaCount(parseInt(count));
    }
  }, [audioList]);

  return (
    <div className="home-box1">
      <button className="nana-button" onClick={handleClick}>
        呐呐~
      </button>
      <NahidaGif ref={nahidaGifRef} />
      <div className="home-box1-body">
        <div className="body-text1">
          <div>好好休息吧，</div>
          <div>比如痛痛快快去上个厕所什么的</div>
          <Image
            className="body-text1-img"
            src="/nahida.png"
            alt="纳西妲"
            width={100}
            height={100}
          />
        </div>
        <div className="body-text2">
          <div className="body-text2-title">纳西妲已经汲取知识了</div>
          <div className="body-text2-count">{nanaCount}</div>
          <div className="body-text2-unit">次</div>
        </div>
      </div>
    </div>
  );
}
