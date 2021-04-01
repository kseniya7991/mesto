import {keyClose} from './constants.js';
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._toggleEscEventLisneter = function (evt) {
      this._handleEscClose(evt);
    }
    this.toggleEsc = this._toggleEscEventLisneter.bind(this);
  }


  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this.toggleEsc);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened'); 
    document.removeEventListener('keydown', this.toggleEsc);
  };

  _handleEscClose(evt) {
    if (evt.key === keyClose) this.close();
  }

  setEventListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        //Закрытие попапа при клике на область вокруг формы или при клике на крестик
        if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup-close'))) this.close();
      });
    });
  }

}