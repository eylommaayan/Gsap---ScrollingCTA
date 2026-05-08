"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./ScrollingCTA.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MISSIONS_IMAGES = [
  { left: "/index/cta_img_01.jpg", right: "/index/cta_img_02.jpg" },
  { left: "/index/cta_img_03.jpg", right: "/index/cta_img_04.jpg" },
  { left: "/index/cta_img_05.jpg", right: "/index/cta_img_06.jpg" },
];

const ScrollingCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // "top top" אומר: כשהחלק העליון (top) של האלמנט פוגש את החלק העליון (top) של המסך
          start: "top top",
          // משך הגלילה - ככל שהמספר גדול יותר, הגלילה תהיה איטית יותר
          end: "+=2000",
          // scrub: 1 נותן תנועה חלקה שרודפת אחרי הגלגלת
          scrub: 1,
          // pin: true יגרום לסקשן "להינעל" למסך בזמן שהכרטיסים זזים
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      const rows = gsap.utils.toArray(".scrolling-section-row");
      const leftXValues = [-800, -900, -400];
      const rightXValues = [800, 900, 400];
      const leftRotationValues = [-30, -20, -35];
      const rightRotationValues = [30, 20, 35];
      const yValues = [100, -150, -400];

      rows.forEach((row: any, i) => {
        const leftCard = row.querySelector(".scrolling-section-card-left");
        const rightCard = row.querySelector(".scrolling-section-card-right");

        tl.to(
          leftCard,
          {
            x: leftXValues[i],
            y: yValues[i],
            rotation: leftRotationValues[i],
            immediateRender: false,
          },
          0,
        );

        tl.to(
          rightCard,
          {
            x: rightXValues[i],
            y: yValues[i],
            rotation: rightRotationValues[i],
            immediateRender: false,
          },
          0,
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="scrolling-section-container" ref={containerRef}>
      <div className="scrolling-section-content">
        <div className="scrolling-section-logo">
          <img src="/index/logo_cta.png" alt="Logo" />
        </div>
        <div className="scrolling-section-copy">
          <p className="bodyCopy lg">
            Send a message to the observatory. Our field units review incoming
            transmissions.
          </p>
        </div>
        <div className="btn">
          <Link href="/contact" className="btn">
            <span className="btn-line"></span>Send Transmission
          </Link>
        </div>
      </div>

      {MISSIONS_IMAGES.map((row, i) => (
        <div className="scrolling-section-row" key={i}>
          <div className="scrolling-section-card scrolling-section-card-left">
            <div className="scrolling-section-card-frame">
              <div className="scrolling-section-card-img">
                <img src={row.left} alt="" />
              </div>
              <div className="scrolling-section-card-gradient"></div>
            </div>
          </div>

          <div className="scrolling-section-card scrolling-section-card-right">
            <div className="scrolling-section-card-frame">
              <div className="scrolling-section-card-img">
                <img src={row.right} alt="" />
              </div>
              <div className="scrolling-section-card-gradient"></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ScrollingCTA;
