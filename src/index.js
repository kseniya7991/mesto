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

const buttonOpenEditProfile = document.querySelector('.user__edit-button');

const profileForm = document.querySelector('.popup__form_profile');
const addCardForm = document.querySelector('.popup__form_add');

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
  formEditProfile: '.popup__form_profile'
};

//Получение API
const api = new Api({
  //address: httpsdsffsfsd,
  token: '98ab6b78-4926-4ba2-b164-ff0669091526',
  groupID: 'cohort-22'
})

api.getUser()
  .then( user => {
    console.log(user)
  })
  .catch(err => console.log('Ошибка при создании'))



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
  items: initialCards,
  renderer: (item) => { 
    addInstanceCard(item);
  }},
  cardListSection
  )

//Создание экземпляров двух форм: добавления карточки и редактирования профиля
const popupProfile = new PopupWithForm(
  {submitFunction: (formData) => {
    userInfo.setUserInfo(formData);
  }}, popupEditProfile);
  popupProfile.setEventListeners();

  const popupCard = new PopupWithForm(
    {submitFunction: (formData) => {
      addNewCard(formData);
    }}, popupAddCard);
  popupCard.setEventListeners();

//Экземпляр UserInfo (создается 1 раз)
const userInfo = new UserInfo ({nameSelector: '.user__name', aboutSelector:'.user__about'});

//Создание экземпляра валидатора формы редактирования профиля
const formEditProfile = new FormValidator (validationElements, profileForm);

//Создание экземпляра валидатора формы добавления карточки
const formAddCard = new FormValidator (validationElements, addCardForm);

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
  toggleButtonInactive(validationElements);
}

//Отключение активной кнопки при открытии попапа добавления карточки
const toggleButtonInactive = (validationElements) => {
  const buttonCardElement = document.querySelector(validationElements.submitCardButton);
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
}

//Слушатели на кнопки
buttonOpenEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openAddCardPopup);


addValidator();

//Запуск функции отрисовки дефолтных карточек
cardList.renderer();

//Экспорт для модулей
export {validationElements};