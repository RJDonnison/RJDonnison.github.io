//*Random letters on load
//#region
const letters = "abcdefghijklmnopqrstuvwxyz";

let interval = null;

target = document.querySelector("h1");

let iteration = -2;

clearInterval(interval);

interval = setInterval(() => {
  target.innerText = target.innerText
    .split("")
    .map((letter, index) => {
      if (index < iteration) {
        return target.dataset.value[index];
      }

      return letters[Math.floor(Math.random() * 26)];
    })
    .join("");

  if (iteration >= target.dataset.value.length) {
    clearInterval(interval);
  }

  iteration += 1 / 4;
}, 30);
//#endregion

//*gsap animations
//#region
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let timeline = document.getElementById("timeline");

gsap.to("#timeline progress", {
  value: 100,
  scrollTrigger: {
    trigger: timeline,
    start: "top end",
    end: () => `+=${timeline.offsetWidth}`,
    scrub: true,
  },
  ease: "none",
});

gsap.to(".projects", {
  x: "-100%",
  scrollTrigger: {
    trigger: timeline,
    end: () => `+=${timeline.offsetWidth}`,
    pin: true,
    scrub: true,
  },
  ease: "none",
});
//#endregion
