class FormValidator {

  constructor(validationElements, formElement) {
    this._form = formElement;
    this._input = validationElements.inputSelector;
    this._submitBtn = validationElements.submitButtonSelector;
    this._textError = validationElements.activeTextError;
    this._inputError = validationElements.inputErrorActive;
    this._inactiveBtn = validationElements.inactiveButtonClass;
  }

  enableValidation() {
    this._setEventListeners();
  }

  //Установление слушателей на все инпуты форм
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._input));
    const buttonElement = this._form.querySelector(this._submitBtn);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValid(inputElement);
        this._toggleButtonState(inputElement, inputList,buttonElement);
      })
    })
  }

  //Проверка валидности формы
  _checkInputValid (inputElement) {
    const inputElementValid = inputElement.validity.valid;
    const errorMessage = inputElement.validationMessage;
    if(inputElementValid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, errorMessage);
    }
  }

  //Скрываем ошибки формы
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._textError);
    inputElement.classList.remove(this._inputError);
  }

  //Отображаем ошибки формы
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._textError);
    inputElement.classList.add(this._inputError);
  }

  //Переключение состояния кнопок "сохранить" и "создать"
  _toggleButtonState(inputElement, inputList, buttonElement) {
    const notValidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    if(notValidInput) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveBtn);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveBtn);
    }
  }
}

export {FormValidator} ;