gsap.registerPlugin(ScrollTrigger);

gsap.to("#scale-animation", {
  duration: 10,
  transform: "scale(.75)",
  ease: Linear.easeNone,
  scrollTrigger: {
    trigger: "#scale-animation",
    markers: true,
  },
});
