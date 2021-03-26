export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._userName = document.querySelector(nameSelector).textContent;
    this._userAbout = document.querySelector(aboutSelector).textContent;
    this._userNameInput = document.querySelector('.popup__input_text_name');
    this._userAboutInput = document.querySelector('.popup__input_text_about');
  }
  
  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {name: this._userName, about: this._userAbout};
    this._userNameInput.value = userInfo.name;
    this._userAboutInput.value = userInfo.about;
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {

  }

 }