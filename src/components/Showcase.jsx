import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const videoRef = useRef(null);

  // Fallback handler strictly for autoplay restrictions or tab switching
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") playVideo();
    };

    playVideo();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useGSAP(() => {
const mm = gsap.matchMedia();

    // 1. DESKTOP ANIMATION (> 1024px)
    mm.add("(min-width: 1025px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .to(".mask img", { scale: 1.1 })
        .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
    });

    // 2. MOBILE / TABLET RESET (<= 1024px)
    // Strips away inline transformations when shrinking the viewport
    mm.add("(max-width: 1024px)", () => {
      gsap.set([".mask img", ".content"], {
        clearProps: "all",
      });
    });

    ScrollTrigger.refresh();

    return () => mm.revert();
  }, []);

  return (
    <section id="showcase">
      <div className="media">
        <video
          ref={videoRef}
          src="/videos/game.mp4"
          loop
          muted
          autoPlay
          playsInline
          preload="auto"
        />
        <div className="mask">
          <img src="/mask-logo.svg" alt="" />
        </div>
      </div>
      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rocket chip.</h2>
            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers
              </p>
              <p>
                It drives Apple Intelligence on iPad Pro, so you can write,
                create, and accomplish more with ease. All in a design that's
                unbelievably thin, light, and powerful.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness. And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <p className="text-primary">
                Learn more about Apple Intelligence
              </p>
            </div>
          </div>
          <div className="lg:max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;