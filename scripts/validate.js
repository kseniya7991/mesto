//Скрываем ошибки формы
const hideInputError = (formElement, inputElement, validationElements) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(validationElements.activeTextError);
  inputElement.classList.remove(validationElements.inputErrorActive);
}

//Отображаем ошибки формы
const showInputError = (formElement, inputElement, errorMessage, validationElements) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationElements.activeTextError);
  inputElement.classList.add(validationElements.inputErrorActive);
}


//Проверка валидности формы
const checkInputValid = (formElement, inputElement) => {
  const inputElementValid = inputElement.validity.valid;
  const errorMessage = inputElement.validationMessage;
  if(inputElementValid) {
    hideInputError(formElement, inputElement, validationElements);
  } else {
    showInputError(formElement, inputElement, errorMessage, validationElements);
  }
}

//Установление слушателей на все инпуты форм
const setEventListeners = (formElement, validationElements) => {
  const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
  const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, validationElements);
    });
  })
 
}

//Переключение состояния кнопок "сохранить" и "создать"
const toggleButtonState = (inputList, buttonElement, validationElements) => {
  const notValidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid 
    );
  if(notValidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validationElements.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationElements.inactiveButtonClass);
  }
}


  
//Классы и селекторы элементов форм 
const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: '.popup__save-button_inactive',
  textError: '.popup__input-error',
  activeTextError: 'popup__input-error_active',
  inputErrorActive: 'popup__input_error',
};

//Функция включения валидации
const enableValidation = (validationElements) => {
  const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
  formList.forEach( (formElement) => {
    setEventListeners(formElement, validationElements);
  });
  
}

enableValidation(validationElements);


