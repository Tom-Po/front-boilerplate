export default class Loader {
  constructor($view) {
    this.view = $view;
    this.bind();
  }
  bind() {
    setTimeout(() => {
      document.body.classList.remove("is-loading");
      this.view.hide();
    }, 5300);
  }
}
