export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarUserPhoto}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._avatarUser = avatarUserPhoto;
  }
  
  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {name: this._userName.textContent, about: this._userAbout.textContent};
    return userInfo;
  }
  
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formData) {
    this._userName.textContent = formData.name;
    this._userAbout.textContent = formData.about;
    this._userOwnerId = formData._id;
  }

  setUserPhoto(formData) {
    this._avatarUser.src = formData.avatar;
  }

  getOwnerId(){
    return this._userOwnerId;
  }

  updateUserAvatar(link) {
    this._avatarUser.src = link;
    console.log({avatar: this._avatarUser.src});
  }

 }