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
const popupUpdateAvatar = document.querySelector('.popup_update-avatar')

const buttonOpenEditProfile = document.querySelector('.user__edit-button');

const avatarUser = document.querySelector('.user__avatar');

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
  submitUpdateAvatar: '.popup__save-button_update-avatar'
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
    () => {
      popupCardPhoto.open(item);
    });
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
    userInfo.setUserInfo(formData);
  }}, popupEditProfile);
  popupProfile.setEventListeners();

//Добавление новой карточки
  const popupCard = new PopupWithForm(
    {submitFunction: (formData) => {
      addNewCard(formData);
    }}, popupAddCard);
  popupCard.setEventListeners();

//Редактирование аватара пользователя
const popupAvatar = new PopupWithForm(
  {submitFunction: (formData) => {
    updateUserAvatar(formData);
  }}, popupUpdateAvatar);
popupAvatar.setEventListeners();

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
  toggleButtonInactive(validationElements);
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

//Отключение активной кнопки при открытии попапа добавления карточки
const toggleButtonInactive = (validationElementsButton) => {
  //const buttonCardElement = document.querySelector(validationElements.submitCardButton);
  const buttonCardElement = document.querySelector(validationElementsButton);
  buttonCardElement.setAttribute('disabled', true);
  buttonCardElement.classList.add(validationElements.inactiveButtonClass);
  }
  
//Рендеринг новой карточки
const addNewCard = (submitData) => {
  const itemCard = {name: submitData.Title, src: submitData.Link};
  addInstanceCard(itemCard);
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

//Запуск функции отрисовки дефолтных карточек
//cardList.renderer();

//Экспорт для модулей
export {validationElements};