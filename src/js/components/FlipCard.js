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
    console.log(this.findTag("test"));
  }

  findTag(tag_id) {
    let result = $(".tags").filter((i, el) => el.innerText === tag_id);
    return result.length === 1
      ? result[0]
      : () => {
          console.log("No item found");
        };
  }
}
