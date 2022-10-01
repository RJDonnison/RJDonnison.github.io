const gallery = document.getElementById("gallery");

var move = true;
const maxX = gallery.offsetWidth - window.innerWidth,
  maxY = gallery.offsetHeight - window.innerHeight;

//*Pan Screen
window.onmousemove = (e) => {
  if (move) {
    const mouseX = e.clientX,
      mouseY = e.clientY;

    const xDecimal = mouseX / window.innerWidth,
      yDecimal = mouseY / window.innerHeight;

    const panX = maxX * xDecimal * -1,
      panY = maxY * yDecimal * -1;

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

const tiles = document.getElementsByClassName("tile");
const nav = document.getElementById("nav");

var activeTile = null;

//*Open tile
async function OpenTile(tile) {
  if (move) {
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

    document.documentElement.style.setProperty("--active-color", activeColor);
    nav.children[1].href = `projects/${tile.dataset.about}.html`;
    nav.children[2].href = tile.dataset.link;

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
  move = true;
  for (let index = 0; index < tiles.length; index++) {
    const tile = tiles[index];
    tile.dataset.status = "inactive";
  }

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
