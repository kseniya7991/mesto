//import {validationElements} from './index2.js';
class FormValidator {

  constructor(validationElements, formElement) {
    this._input = validationElements.inputSelector;
    this._submitBtn = validationElements.submitButtonSelector;
  }

    //Установление слушателей на все инпуты форм
  setEventListeners() {
    //const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
    //const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);
   console.log('fff');
   console.log(this._input);
    //this._input.addEventListener('input', () => {
     // this._checkInputValid();
      //this._toggleButtonState;
     // console.log('fff');
  //  })
  }

 /*  this._likeBtn = this._element.querySelector('.photo__like');
    this._likeBtn.addEventListener('click', () => {
      this._handleCardLikeClick();
    }); */


  //Проверка валидности формы
  _checkInputValid () {
    //this._inputElementValid = this._input.validity.valid;
   // this._errorMessage = this._input.validationMessage;
    console.log(validationMessage);
  }


  //Проверка валидности формы
/* const checkInputValid = (formElement, inputElement, validationElements) => {
  const inputElementValid = inputElement.validity.valid;
  const errorMessage = inputElement.validationMessage;
  if(inputElementValid) {
    hideInputError(formElement, inputElement, validationElements);
  } else {
    showInputError(formElement, inputElement, errorMessage, validationElements);
  }
} */
   /*  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        checkInputValid(formElement, inputElement, validationElements);
        toggleButtonState(inputList, buttonElement, validationElements);
      });
    }) */
   
  
  
}

//console.log(validationElements);
export {FormValidator} ;