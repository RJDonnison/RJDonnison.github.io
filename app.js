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
        duration: 5000,
        fill: "forwards",
        easing: "ease",
      }
    );
  }
};

const tiles = document.getElementsByClassName("tile");

var activeTile = null;

//*Open tile
function OpenTile(tile) {
  if (move) {
    move = false;
    tile.dataset.status = "active";

    //*Center screen
    const panX = maxX * 0.5 * -1,
      panY = maxY * 0.5 * -1;

    gallery.animate(
      { transform: `translate(${panX}px, ${panY}px)` },
      {
        duration: 800,
        fill: "forwards",
        easing: "ease",
      }
    );

    //*Save active tile
    activeTile = tile;

    //*Hide other tiles
    for (let index = 0; index < tiles.length; index++) {
      const element = tiles[index];
      if (element != tile) {
        element.dataset.status = "hidden";
      }
    }
  }
}

//*Close active tile
function CloseTile() {
  move = true;
  for (let index = 0; index < tiles.length; index++) {
    const tile = tiles[index];
    tile.dataset.status = "inactive";
  }
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
