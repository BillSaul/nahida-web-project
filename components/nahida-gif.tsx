import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import "./nahida-gif.scss";

interface GifElement {
  id: string;
  random: string;
}

const NahidaGif = forwardRef(function NahidaGif(props, ref) {
  const [elements, setElements] = useState<GifElement[]>([]);
  const lastRandomRef = useRef<number | null>(null);
  const cachedObjects = useRef<{ [key: string]: string }>({});

  const gifList = useMemo(
    () => ["gif/1.gif", "gif/2.gif", "gif/3.gif", "gif/4.gif", "gif/5.gif"],
    []
  );

  const removeElement = (id: string) => {
    console.log("删除元素", id);
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

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

  // 生成一个不同于上次的随机数
  const generateRandom = () => {
    let newRandom: number;
    do {
      newRandom = Math.floor(Math.random() * 5); // 1-5，纳西妲的GIF
    } while (newRandom === lastRandomRef.current);
    lastRandomRef.current = newRandom;
    return newRandom;
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        addElement() {
          console.log("添加新元素");
          const random = tryCachedObject(gifList[generateRandom()]);
          const id = new Date().toISOString();
          setElements([...elements, { id, random }]);
        },
      };
    },
    [elements, gifList]
  );

  useEffect(() => {
    gifList.forEach((item: string) => {
      tryCachedObject(item);
    });
  }, [gifList]);

  return (
    <div className="gif-body">
      {elements.map((el) => {
        return (
          <Image
            key={el.id}
            className="gif-box"
            src={el.random}
            alt="nahida"
            width={300}
            height={300}
            unoptimized
            onAnimationEnd={() => removeElement(el.id)}
          />
        );
      })}
    </div>
  );
});

export default NahidaGif;
