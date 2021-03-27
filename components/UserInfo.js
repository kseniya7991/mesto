export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._userNameInput = document.querySelector('.popup__input_text_name');
    this._userAboutInput = document.querySelector('.popup__input_text_about');
  }
  
  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {name: this._userName.textContent, about: this._userAbout.textContent};
    this._userNameInput.value = userInfo.name;
    this._userAboutInput.value = userInfo.about;
  }
  
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._userName.textContent = this._userNameInput.value;
    console.log(this._userName);
    this._userAbout.textContent = this._userAboutInput.value;
    console.log(this._userAbout);
  }

 }