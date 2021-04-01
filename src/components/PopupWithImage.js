import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(data, cardSelector) {
    super(cardSelector);
     this._imgSrc = data.src;
     this._imgAlt = data.alt;
     this._photoPopupCard = document.querySelector('.popup__photo');
     this._captionPopupCard = document.querySelector('.popup__caption');
  }

  open() {
    this._photoPopupCard.src = this._imgSrc;
    this._photoPopupCard.alt = this._imgAlt;
    this._captionPopupCard.textContent = this._imgAlt;
    super.open();
    this.setEventListeners();
  }
  
}