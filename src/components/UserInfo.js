export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
  }
  
  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {name: this._userName.textContent, about: this._userAbout.textContent};
    return userInfo;
  }
  
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formData) {
    //Так было раньше
    //this._userName.textContent = formData.Name;
    //this._userAbout.textContent = formData.Job;
    this._userName.textContent = formData.name;
    this._userAbout.textContent = formData.about;
    this._userOwnerId = formData._id;
  }

  getOwnerId(){
    return this._userOwnerId;
  }

 }