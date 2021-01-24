export default class FlipCard {
  constructor($view) {
    this.view = $view;
    this.bind();
  }
  bind() {
    let self = this;
    this.view.on("mouseenter", () => {
      self.view.removeClass("default");
      self.view.addClass("flipped");
      self.view.removeClass("unflipped");
    });
    this.view.on("mouseleave", () => {
      self.view.addClass("unflipped");
      self.view.removeClass("flipped");
    });
  }
}
