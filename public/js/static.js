//*Main moveable page
//#region
//*Get gallery
let gallery = document.getElementById("gallery");

//*Move gallery bool
var move = true;

//*Max constraints
const maxX = gallery.offsetWidth - window.innerWidth,
  maxY = gallery.offsetHeight - window.innerHeight;

//*Pan Screen
window.onmousemove = (e) => {
  if (move) {
    //*Mouse positions
    const mouseX = e.clientX,
      mouseY = e.clientY;

    //*Mouse pos as decimal
    const xDecimal = mouseX / window.innerWidth,
      yDecimal = mouseY / window.innerHeight;

    const panX = maxX * xDecimal * -1,
      panY = maxY * yDecimal * -1;

    //*Move gallery
    gallery.animate(
      { transform: `translate(${panX}px, ${panY}px)` },
      {
        duration: 2000,
        fill: "forwards",
        easing: "ease",
      }
    );
  }
};

//*Get elements
const tiles = document.getElementsByClassName("tile");
const nav = document.getElementById("nav");

//*Active till storage
var activeTile = null;

//*Open tile
async function OpenTile(tile) {
  if (move) {
    //*Stop movement
    move = false;
    tile.dataset.status = "active";

    //*Center screen
    const panX = maxX * 0.5 * -1,
      panY = maxY * 0.5 * -1;

    //*Hide other tiles
    for (let index = 0; index < tiles.length; index++) {
      const element = tiles[index];
      if (element != tile) {
        element.dataset.status = "hidden";
      }
    }

    //*Center gallery
    const galleryAnimation = gallery.animate(
      { transform: `translate(${panX}px, ${panY}px)` },
      {
        duration: 800,
        fill: "forwards",
        easing: "ease",
      }
    );

    //*Setup nav
    const activeColor = window
      .getComputedStyle(tile, null)
      .getPropertyValue("background-color");

    document.documentElement.style.setProperty(
      "--active-color",
      activeColor.split("rgb(")[1].split(")")[0]
    );
    nav.children[1].href = tile.dataset.about;
    let string = tile.dataset.about.replace(
      /-([a-z])/g,
      (_, char) => "-" + char.toUpperCase()
    );
    const link = string.charAt(0).toUpperCase() + string.slice(1);
    console.log(link);
    nav.children[2].href = `https://rjdonnison.github.io/${link}`;

    //*Make nav visible after gallery center
    galleryAnimation.onfinish = () => {
      nav.animate(
        { opacity: "1" },
        {
          duration: 1000,
          fill: "forwards",
          easing: "ease",
        }
      );
    };

    //*Save active tile
    activeTile = tile;
  }
}

//*Close active tile
function CloseTile() {
  //*Alow movement
  move = true;
  //*Close and unhide tiles
  for (let index = 0; index < tiles.length; index++) {
    const tile = tiles[index];
    tile.dataset.status = "inactive";
  }

  //*Remove nav
  nav.animate(
    { opacity: "0" },
    {
      duration: 200,
      fill: "forwards",
      easing: "ease",
    }
  );
}

//*Close tile on click
window.addEventListener("click", function (e) {
  if (activeTile != null) {
    if (!activeTile.contains(e.target)) {
      CloseTile();
    }
  }
});

//*Tile event listeners
for (let index = 0; index < tiles.length; index++) {
  const tile = tiles[index];
  tile.addEventListener("click", () => {
    OpenTile(tile);
  });
}
//#endregion

//*Setup about pages
function SetPage() {
  const activeColor = document.body.dataset.color;
  document.documentElement.style.setProperty("--active-color", activeColor);
  const display = getElementById(display);

  const link = getElementById("outer-link");
  nav.children[2].href = link.href;
}
