import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
   super(popupSelector);
     this._photoPopupCard = document.querySelector('.popup__photo');
     this._captionPopupCard = document.querySelector('.popup__caption');
  }

  open(cardData) {
    this._photoPopupCard.src = cardData.src;
    this._photoPopupCard.alt = cardData.name;
    this._captionPopupCard.textContent = cardData.name;
    super.open();
  }
  
}