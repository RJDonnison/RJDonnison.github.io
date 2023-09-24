//*Random letters on load
//#region
//Selectable letters
const letters = "abcdefghijklmnopqrstuvwxyz";

let interval = null;

//Get target element
let target = document.querySelector("h1");

//Set target to default value
target.dataset.value = target.innerHTML;

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
let projectsDiv = document.getElementById("projects");
let width = -timeline.offsetWidth;
for (const element of projectsDiv.children) width += element.offsetWidth;

//Timeline horizontal scroll
gsap.to("#projects", {
  x: `-${width}px`,
  scrollTrigger: {
    trigger: timeline,
    start: `start end`,
    end: () => `+=${width}`,
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
    end: () => `+=${width}`,
    scrub: true,
  },
  ease: "none",
});

//Keep footer at bottom of timeline
gsap.to("footer", {
  y: `${width}px`,
  scrollTrigger: {
    trigger: timeline,
    start: `start end`,
    end: () => `+=${width}`,
    scrub: true,
  },
  ease: "none",
});
//#endregion

//*Make post request on save
//#region
document.getElementById("save").addEventListener("click", () => {
  //Separate project titles and descriptions
  let projects = document.querySelectorAll("#projects div");
  let projectsDescriptions = [];
  let projectsTitles = [];

  projects.forEach((element) => {
    projectsTitles.push(element.innerText.split("\n\n")[0]);
    projectsDescriptions.push(element.innerText.split("\n\n")[1]);
  });

  projectsTitles.pop();
  projectsDescriptions.pop();

  //Make post request
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/save", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("enctype", "multipart/form-data");
  xhr.send(
    JSON.stringify({
      header: document.querySelector("#welcome-header h1").innerHTML,
      headerSub: document
        .querySelector("#welcome-header h3:last-of-type")
        .innerHTML.slice(1),
      about: document.querySelector("#about p").innerHTML.slice(1),
      projectsTitles: projectsTitles,
      projectsDescriptions: projectsDescriptions,
      projectsEnd: document.querySelector("#projects h3").innerHTML,
      contact: document.querySelector("footer p").innerHTML.slice(1),
    })
  );
});

//#endregion
