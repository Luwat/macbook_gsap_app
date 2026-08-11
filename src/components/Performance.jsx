import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { performanceImages, performanceImgPositions } from "../constants";

const Performance = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      ".content p",
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".content p",
          start: "top bottom",
          end: "top center",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut", duration: 2, overwrite: "auto" },
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      performanceImgPositions.forEach((pos) => {
        if (pos.id === "p5") return;
        const endState = {};
        if (pos.left) endState.left = pos.left;
        if (pos.right) endState.right = pos.right;
        if (pos.bottom) endState.bottom = pos.bottom;
        if (pos.transform) endState.transform = pos.transform;
        tl.to(`.${pos.id}`, endState, 0);
      });
    });

    ScrollTrigger.refresh();

    return () => mm.revert();
  }, {scope: sectionRef});

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>
      <div className="wrapper">
        {performanceImages.map(({ id, src }) => (
          <img key={id} id={id} className={id} src={src} alt="" />        ))}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;
