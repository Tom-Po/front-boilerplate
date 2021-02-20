export default class Loader {
  constructor($view) {
    this.view = $view;
    this.bind();
  }
  bind() {
    setTimeout(() => {
      this.view.hide();
    }, 5300);
  }
}
