import HomeBox1 from "@/components/home/home-box1";
import HomeBox2 from "@/components/home/home-box2";
import HomeBox3 from "@/components/home/home-box3";
import type { Metadata } from "next";
import "./page.scss";

export const metadata: Metadata = {
  title: "我的知识分享",
};

export default function Home() {
  const beianInfo = process.env.NEXT_PUBLIC_BEIAN_INFO;

  return (
    <div className="home-body">
      {beianInfo && (
        <div className="beian">
          备案信息：
          <a href="https://beian.miit.gov.cn" target="_blank">
            {beianInfo}
          </a>
        </div>
      )}
      <section>
        <HomeBox2 />
      </section>
      <section>
        <HomeBox1 />
      </section>
      <section>
        <HomeBox3 />
      </section>
    </div>
  );
}
