//*Random letters on load
//#region
//Selectable letters
const letters = "abcdefghijklmnopqrstuvwxyz";

let interval = null;

//Get target element
let target = document.querySelector("h1");

//Set -ve interval to randomize first letters of text
let iteration = -2;

clearInterval(interval);

interval = setInterval(() => {
  target.innerText = target.innerText
    .split("")
    .map((letter, index) => {
      //If iteration is greater than letter index stop randomizing that letter
      if (index < iteration) {
        return target.dataset.value[index];
      }

      //Return random letter
      return letters[Math.floor(Math.random() * 26)];
    })
    .join("");

  //If iterations greater than length of default value end loop
  if (iteration >= target.dataset.value.length) {
    clearInterval(interval);
  }

  //Increase iteration. Fraction is number of times letters will randomize
  iteration += 1 / 4;
}, 30);
//#endregion

//*gsap animations
//#region
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//Get timeline
let timeline = document.getElementById("timeline");

//Timeline horizontal scroll
gsap.to(".projects", {
  x: "-100%",
  scrollTrigger: {
    trigger: timeline,
    start: `start end`,
    end: () => `+=${timeline.offsetWidth}`,
    pin: true,
    scrub: true,
  },
  ease: "none",
});

//Timeline scroll progress bar
gsap.to("#timeline progress", {
  value: 100,
  scrollTrigger: {
    trigger: timeline,
    start: `start end`,
    end: () => `+=${timeline.offsetWidth}`,
    scrub: true,
  },
  ease: "none",
});
//#endregion
