//Импорт главного CSS
import './pages/index.css'; 

//Импорт js модулей
import Section from './components/Section.js';
import { initialCards } from './components/initialCards.js';
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js'
import PopupWithImage from './components/PopupWithImage.js';
import Api from './components/Api.js';

//Объявление переменных
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');
const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
const popupDeleteCard = document.querySelector('.popup_delete-card');

const buttonOpenEditProfile = document.querySelector('.user__edit-button');

//const avatarUser = document.querySelector('.user__avatar');
const avatarUser = document.querySelector('.user-photo');

const profileForm = document.querySelector('.popup__form_profile');
const addCardForm = document.querySelector('.popup__form_add');
const userAvatarForm = document.querySelector('.popup__form_update-avatar');

const inputProfileName = document.querySelector('.popup__input_text_name');
const inputProfileAbout = document.querySelector('.popup__input_text_about');


const buttonAddCard = document.querySelector('.add-button');
const cardListSection = '.photos-grid';
const popupPhotoCard = document.querySelector('.popup_photo');

//Элементы для валидации формы
const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: '.popup__save-button_inactive',
  textError: '.popup__input-error',
  activeTextError: 'popup__input-error_active',
  inputErrorActive: 'popup__input_error',
  submitCardButton: '.popup__save-button_add',
  formAddCard: '.popup__form_add',
  formEditProfile: '.popup__form_profile',
  submitUpdateAvatar: '.popup__save-button_update-avatar',
  submitEditProfile: '.popup__save-button_profile'
};

//Получение API
const api = new Api({
  token: '98ab6b78-4926-4ba2-b164-ff0669091526',
  groupID: 'cohort-22'
})

//Получение  данных юзера (себя)
api.getUser()
  .then( user => {
    userInfo.setUserInfo(user)
    userInfo.getOwnerId(user);
  })
  .catch(err => console.log(err))

//Получение массива карточек пользователей
api.getCards()
  .then(cards => {
      cardList.renderer(cards);
  })
  .catch(err => console.log(err))

//console.log(initialServerCards);
const popupCardPhoto = new PopupWithImage (popupPhotoCard);
popupCardPhoto.setEventListeners();

//Функция создания экземпляра карточки
const addInstanceCard = (item) => {
  const card = new Card(    
    item, 
    '.template',
    //handleCardClick
    () => {popupCardPhoto.open(item)},
    //handleCardLike 
    (idCard) => { api.likeCard(idCard)},
    //handleDeleteCardLike
    (idCard) => {api.deleteLikeCard(idCard)},
    userInfo.getOwnerId());
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

//Отрисовка первоначальных 6ти карточек
const cardList = new Section ({
  //items: initialServerCards,
  renderer: (item) => { 
    addInstanceCard(item);
  }},
  cardListSection
  )
  

//Создание экземпляров форм
//Редактирование информации о пользователе
const popupProfile = new PopupWithForm(
  {submitFunction: (formData) => {
    popupProfile.renderLoading(true, 'Сохранить', 'Сохранение...');
    userInfo.setUserInfo(formData);
    api.sendUser(formData)
    .finally(popupProfile.renderLoading(false, 'Сохрaнить', 'Сохранение...'))
  }}, popupEditProfile);
  popupProfile.setEventListeners();

//Добавление новой карточки
  const popupCard = new PopupWithForm(
    {submitFunction: (formData) => {
      //addNewCard(formData) 
      api.addCard(formData)
        .then(res => {
          console.log(formData);
          const itemData = {name: formData.Title, link: formData.Link, _id: res._id, likes: res.likes, owner: {_id: res.owner._id}};
          console.log(itemData);
          addInstanceCard(itemData);
        })
    }}, popupAddCard);
  popupCard.setEventListeners();

  
//Рендеринг новой карточки
/*const addNewCard = ({submitData, idCard}) => {
  //const itemCard = {name: submitData.Title, link: submitData.Link, likes: [], owner: {_id: '593bac0b0630e44665c3a674'}};
  const itemCard = {name: submitData.Title, link: submitData.Link, likes: [], owner: {_id: '593bac0b0630e44665c3a674'}, idCard};
  console.log(itemCard)
  addInstanceCard(itemCard);
}*/

//Редактирование аватара пользователя
const popupAvatar = new PopupWithForm(
  {submitFunction: (formData) => {
    console.log(formData.AvatarLink)
    const linkAvatar = formData.AvatarLink
    api.updateAvatar(linkAvatar)
    .then((res) => updateUserAvatar(res.url))
    //*/
    //updateUserAvatar(linkAvatar)

    //updateUserAvatar(formData);
  }}, popupUpdateAvatar);
popupAvatar.setEventListeners();

//Подтверждение удаления карточки
export const popupDelete = new PopupWithForm(
  {submitFunction: (card, idCard) => {
    api.removeCard(idCard)
      .then(() => {
        console.log(card);
        card.remove()
      })
      .catch(err => console.log(`Ошибка ${err.status} при удалении`))
  }}, popupDeleteCard);


//test

const updateUserAvatar = (link) => {
  avatarUser.src = link;
  console.log(avatarUser.src);
}

//Экземпляр UserInfo (создается 1 раз)
const userInfo = new UserInfo ({nameSelector: '.user__name', aboutSelector:'.user__about'});

//Создание экземпляра валидатора формы редактирования профиля
const formEditProfile = new FormValidator (validationElements, profileForm);

//Создание экземпляра валидатора формы добавления карточки
const formAddCard = new FormValidator (validationElements, addCardForm);

//Создание экземпляра валидатора формы обновления фотографии профиля
const formUpdateAvatar = new FormValidator (validationElements, userAvatarForm);

//Открытие попапа редактирования профиля
const openProfilePopup = () => {
  popupProfile.open();
  //Запуск валидатора формы
  formEditProfile.resetErrorOpenPopup();
  inputProfileName.value = userInfo.getUserInfo().name;
  inputProfileAbout.value = userInfo.getUserInfo().about;
  toggleButtonActive(validationElements.submitEditProfile);
}

//Открытие попапа добавления карточки
const openAddCardPopup = () => {
  popupCard.open();
  //Запуск валидатора формы
  formAddCard.resetErrorOpenPopup();
  toggleButtonInactive(validationElements.submitCardButton);
}

//Открытие попапа изменения фото профиля
const openUpdAvatarPopup = () => {
  popupAvatar.open();
  //Запуск валидатора формы
  formUpdateAvatar.resetErrorOpenPopup();
  toggleButtonInactive(validationElements.submitUpdateAvatar);
}


//Отключение активной кнопки при открытии попапов с ссылками
const toggleButtonInactive = (validationElementsButton) => {
  const buttonElement = document.querySelector(validationElementsButton);
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(validationElements.inactiveButtonClass);
  }

//Активное состояние кнопки "Сохранить" при открытии попара редактирования данных профиля
const toggleButtonActive = (validationElementsButton) => {
  const buttonElement = document.querySelector(validationElementsButton);
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(validationElements.inactiveButtonClass);
}


//Добавление экземпляра класса валидатора для каждой формы
const addValidator = () => {
  formEditProfile.enableValidation();
  formAddCard.enableValidation();
  formUpdateAvatar.enableValidation();
}

//Слушатели на кнопки
buttonOpenEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openAddCardPopup);
avatarUser.addEventListener('click', openUpdAvatarPopup);


addValidator();

//Экспорт для модулей
export {validationElements};