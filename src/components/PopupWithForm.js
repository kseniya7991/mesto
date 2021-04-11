import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor({submitFunction}, popupSelector){
    super(popupSelector);
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
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
      this.close();
    })
  }

  getCard(сard, idCard){
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(сard, idCard);
      this.close();
    })
   
  }

  /*removeCard(card) {
    card.remove();
    card = null;
  }*/

  close() {
    super.close();
    this._form.reset();
  }
  
  renderLoading(isLoading, defaultText, loadingText){
    const saveButton = this._popupSelector.querySelector('.popup__save-button');
    //const saveButtonText = saveButton.textContent;
    //console.log(saveButton.textContent)
    if(isLoading){
      saveButton.textContent = loadingText;
      console.log(saveButton.textContent)
    } else {
      
      saveButton.textContent = defaultText;
      console.log(saveButton.textContent)
    }
  }

}
