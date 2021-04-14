class FormValidator {
  constructor(validationElements, formElement) {
    this._form = formElement;
    this._input = validationElements.inputSelector;
    this._submitBtn = validationElements.submitButtonSelector;
    this._textError = validationElements.activeTextError;
    this._inputError = validationElements.inputErrorActive;
    this._inactiveBtn = validationElements.inactiveButtonClass;
    this._textErrorInput = validationElements.textError;
  }

  enableValidation(evt) {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //Установление слушателей на все инпуты форм
  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitBtn);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValid(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  }

  //Проверка валидности формы
  _checkInputValid(inputElement) {
    const inputElementValid = inputElement.validity.valid;
    const errorMessage = inputElement.validationMessage;
    if (inputElementValid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, errorMessage);
    }
  }

  //Скрываем ошибки формы
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._textError);
    inputElement.classList.remove(this._inputError);
  }

  //Отображаем ошибки формы
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._textError);
    inputElement.classList.add(this._inputError);
  }

  //Переключение состояния кнопок "сохранить" и "создать"
  _toggleButtonState(inputElement) {
    const notValidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
    if (notValidInput) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveBtn);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveBtn);
    }
  }

  //Публичный метод сброса ошибок формы при открытии попапа
  resetErrorOpenPopup() {
    const inputErrorList = Array.from(this._form.querySelectorAll(this._input));
    inputErrorList.forEach((inputErrorEl) => {
      inputErrorEl.classList.remove(this._inputError);
    });
    const textErrorList = Array.from(this._form.querySelectorAll(this._textErrorInput));
    textErrorList.forEach((textErrorEl) => {
      textErrorEl.textContent = '';
    });
  }
}

export { FormValidator };
