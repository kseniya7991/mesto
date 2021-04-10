export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer(cards) {
    cards.forEach( item => this._renderer(item))
  }

  addItem(element) {
    this._container.prepend(element);
  }
}