import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(submitFunction, cardSelector){
    super(cardSelector);
      this._cardSelector = cardSelector;
      this._submitFunction = submitFunction;
      this._form = this._cardSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._editName = document.querySelector('.popup__input_text_name').value;
    this._editAbout = document.querySelector('.popup__input_text_about').value;
    this._editTitle = document.querySelector('.popup__input_text_title').value;
    this._editLink = document.querySelector('.popup__input_link_photo').value;
  }

  setEventListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) this.close();
        if (evt.target.classList.contains('popup-close')) this.close();
      });
    });
    this._cardSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(evt);
      this.close();
    })
  }

  close() {
    this._popupSelector.classList.remove('popup_opened'); 
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._form.reset();
  }
}
