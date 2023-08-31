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
//Get timeline
let timeline = document.getElementById("timeline");

//Set width of projects by adding element sizes
let projects = document.getElementById("projects");
let width = -window.screen.width;
for (const element of projects.children) width += element.offsetWidth;

//Timeline horizontal scroll
gsap.to("#projects", {
  x: `-${width}px`,
  scrollTrigger: {
    trigger: timeline,
    start: `start end`,
    end: () => `+=${timeline.offsetWidth}`,
    pin: true,
    pinSpacing: false,
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

//Keep footer at bottom of timeline
gsap.to("footer", {
  y: timeline.offsetWidth,
  scrollTrigger: {
    trigger: timeline,
    start: `start end`,
    end: () => `+=${timeline.offsetWidth}`,
    pinSpacing: false,
    scrub: true,
  },
  ease: "none",
});
//#endregion
