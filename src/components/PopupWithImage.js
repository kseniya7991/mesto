import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
   super(popupSelector);
     this._photoPopupCard = document.querySelector('.popup__photo');
     this._captionPopupCard = document.querySelector('.popup__caption');
  }

  open({name, src} = cardData) {
    this._photoPopupCard.src = src;
    this._photoPopupCard.alt = name;
    this._captionPopupCard.textContent = name;
    super.open();
  }
  
}