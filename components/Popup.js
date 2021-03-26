export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    //this._popupOpened = document.querySelector('.popup_opened');
   
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this.setEventListeners();
   // console.log(this._popupOpened);
  }

  close() {
    console.log(this._popupSelector);
    //console.log(this._popupOpened);
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popupSelector.classList.remove('popup_opened'); 
  
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) this.close();
        if (evt.target.classList.contains('popup-close')) this.close();
      });
    });
  }
    
}