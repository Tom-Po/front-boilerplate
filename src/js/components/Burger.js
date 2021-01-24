export default class Burger {
  constructor($view) {
    this.view = $view;
    this.isClosed = false;
    this.trigger = $view;
    this.bind();
  }
  bind() {
    let self = this;
    this.trigger.click(() => {
      self.burgerTime();
    });
  }

  burgerTime() {
    if (this.isClosed == true) {
      this.trigger.removeClass("is-open").addClass("is-closed");
      $("body").removeClass("is-menu-open");
      this.isClosed = false;
    } else {
      this.trigger.removeClass("is-closed").addClass("is-open");
      $("body").addClass("is-menu-open");
      this.isClosed = true;
    }
  }
}
