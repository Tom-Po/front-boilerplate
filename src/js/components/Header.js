export default class Header {
  constructor($view) {
    this.view = $view;
    this.bind();
  }
  bind() {
    $(window).on("scroll", (e) => {
      if (window.scrollY > 60) {
        $("body").addClass("scrolled");
      } else {
        $("body").removeClass("scrolled");
      }
    });
  }
}
