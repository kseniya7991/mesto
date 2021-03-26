import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(submitFunction, popupSelector){
    super(popupSelector);
      this._popupSelector = popupSelector;
      this._submitFunction = submitFunction;
      this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    // создаём пустой объект
    this._formValues = {};
  
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) this.close();
        if (evt.target.classList.contains('popup-close')) this.close();
      });
    });
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
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
