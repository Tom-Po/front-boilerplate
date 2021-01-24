require("../scss/main.scss");

const $ = require("jquery");
window.jQuery = $;
window.$ = $;

require("bootstrap");

const Kernel = require("./utils/Kernel");
window.Kernel = new Kernel();
window.Kernel.registerComponent(
  "CustomCursor",
  require("./components/CustomCursor").default
);
window.Kernel.registerComponent("Home", require("./components/Home").default);
window.Kernel.registerComponent(
  "ProjectList",
  require("./components/ProjectList").default
);
window.Kernel.registerComponent(
  "Header",
  require("./components/Header").default
);
window.Kernel.registerComponent(
  "Burger",
  require("./components/Burger").default
);
window.Kernel.registerComponent(
  "FlipCard",
  require("./components/FlipCard").default
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
