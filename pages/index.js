//Импорт js модулей
import Section from '../components/Section.js';
import { initialCards } from '../components/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
//import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';

//Объявление переменных
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');

const buttonOpenEditProfile = document.querySelector('.user__edit-button');

const profileForm = document.querySelector('.popup__form_profile');
const addCardForm = document.querySelector('.popup__form_add');

/* const editName = document.querySelector('.popup__input_text_name');
const editAbout = document.querySelector('.popup__input_text_about');
const editTitle = document.querySelector('.popup__input_text_title');
const editLink = document.querySelector('.popup__input_link_photo'); */

const userName = document.querySelector('.user__name');
const userAbout =  document.querySelector('.user__about');

const buttonAddCard = document.querySelector('.add-button');

//перенести в константы
const cardListSection = '.photos-grid';

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

//Функция создания экземпляра карточки
const addInstanceCard = (item) => {
  const card = new Card(item, '.template');
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

//Открытие попапа добавления карточки
const openAddCardPopup = (evt) => {
  //Запуск валидатора формы
  const formAddCard = new FormValidator (validationElements, addCardForm);
  formAddCard.resetErrorOpenPopup();
  
  const popupCard = new PopupWithForm (handlerAddCardSubmit, popupAddCard);
  popupCard.open();
  
  toggleButtonInactive(validationElements);
}

//Отключение активной кнопки при открытии попапа добавления карточки
const toggleButtonInactive = (validationElements) => {
const buttonCardElement = document.querySelector(validationElements.submitCardButton);
buttonCardElement.setAttribute('disabled', true);
buttonCardElement.classList.add(validationElements.inactiveButtonClass);
}

//Открытие попапа редактирования профиля
const openProfilePopup = (evt) => {
  const popupProfile = new PopupWithForm(handlerProfileSubmit, popupEditProfile)
  popupProfile.open();

  const formEditProfile = new FormValidator (validationElements, profileForm);
  formEditProfile.resetErrorOpenPopup();

  toggleButtonInactive(validationElements);
}

//Обработка измененных данных профиля
const handlerProfileSubmit = (submitData) => {
  userName.textContent = submitData.Name;
  userAbout.textContent = submitData.Job;
}

//Добавление новой карточки из попапа
const handlerAddCardSubmit = (submitData) => {
  addNewCard(submitData);
}

//Рендеринг новой карточки
const addNewCard = (submitData) => {
  const itemCard = [{name: submitData.Title, src: submitData.Link}];
  console.log(itemCard);
  const newCard = new Section ({
      items: itemCard,
      renderer: (item) => {
        addInstanceCard(item);
      }},
    cardListSection)
    newCard.renderer();
}

//Добавление экземпляра класса валидатора для каждой формы
const addValidator = (validationElements) => {
  const formEditProfile =  new FormValidator (validationElements, profileForm);
  formEditProfile.enableValidation();

  const formAddCard = new FormValidator (validationElements, addCardForm);
  formAddCard.enableValidation();
}

//Слушатели на кнопки
buttonOpenEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openAddCardPopup);

addValidator(validationElements);

//Запуск функции отрисовки дефолтных карточек
cardList.renderer();

//Экспорт для модулей
export {validationElements};