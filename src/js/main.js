require("../scss/main.scss");

const $ = require("jquery");
window.jQuery = $;
window.$ = $;

require("bootstrap");

const Kernel = require("./utils/Kernel");
window.Kernel = new Kernel();
window.Kernel.registerComponent(
  "Loader",
  require("./components/Loader").default
);

window.Kernel.mountComponents($("body"));

/*
 * Petit hack pour forcer le load des images par webpack
 * A SUPPRIMER EN PRODUCTION (intégration only)
 */
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context("../img/", true, /\.(png|jpe?g|svg|ico)$/)
);
$(window).on("scroll", (e) => {
  if (window.scrollY > 60) {
    $("body").addClass("scrolled");
  } else {
    $("body").removeClass("scrolled");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    if ($("body").hasClass("is-menu-open")) {
      $("body").removeClass("is-menu-open");
      $("#hamburger").removeClass("is-open");
      $("#hamburger").addClass("is-closed");
    }
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
