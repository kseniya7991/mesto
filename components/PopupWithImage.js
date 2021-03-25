import Popup from './Popup.js';

const photoPopupCard = document.querySelector('.popup__photo');
const captionPopupCard = document.querySelector('.popup__caption');

export default class PopupWithImage extends Popup {
  constructor(data, cardSelector) {
    super(cardSelector);
     this._imgSrc = data.src;
     this._imgAlt = data.alt;

  }

  open() {
    photoPopupCard.src = this._imgSrc;
    photoPopupCard.alt = this._imgAlt;
    captionPopupCard.textContent = this._imgAlt;
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this.setEventListeners();
  }
}