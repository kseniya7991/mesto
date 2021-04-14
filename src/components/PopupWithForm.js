import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ submitFunction }, popupSelector) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._buttonTextActive = this._form.querySelector('.popup__save-button');
    this._buttonTextDefault = this._form.querySelector('.popup__save-button').value;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }

  openPopupDelete(card, idCard) {
    super.open();
    this._card = card;
    this._idCard = idCard;
  }

  setEventListenersDelete() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._idCard, this._card);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._buttonTextActive = loadingText;
    } else {
      this._buttonTextActive = this._buttonTextDefault;
    }
  }
}
