var controller = new ScrollMagic.Controller();

// Scale Scene
var scale_scene = new ScrollMagic.Scene({
  triggerElement: "#scale-trigger",
  duration: 400,
})
  .setTween("#scale-animation", 20, {
    transform: "scale(.75)",
    ease: Linear.easeNone,
  })
  .addTo(controller);
