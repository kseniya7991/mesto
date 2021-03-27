//Импорт js модулей
import Section from '../components/Section.js';
import { initialCards } from '../components/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js';

//Объявление переменных
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');

const buttonOpenEditProfile = document.querySelector('.user__edit-button');

const profileForm = document.querySelector('.popup__form_profile');
const addCardForm = document.querySelector('.popup__form_add');

//Временно оставленные переменные для просмотра
/*const editName = document.querySelector('.popup__input_text_name');
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
  const card = new Card(handleCardClick, item, '.template');
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
  const popupCard = new PopupWithForm (/*handlerAddCardSubmit*/
    {submitFunction: (formData) => {
      addNewCard(formData);;
    }}
    , popupAddCard);
  popupCard.open();

  //Запуск валидатора формы
  const formAddCard = new FormValidator (validationElements, addCardForm);
  formAddCard.resetErrorOpenPopup();
  toggleButtonInactive(validationElements);
}

//Экземпляр UserInfo создан единожды
const userInfo = new UserInfo ({nameSelector: '.user__name', aboutSelector:'.user__about'});

//Открытие попапа редактирования профиля
const openProfilePopup = (evt) => {
  const popupProfile = new PopupWithForm(
    {submitFunction: (formData) => {
      userInfo.setUserInfo();
    }}, popupEditProfile)
  popupProfile.open();

  const formEditProfile = new FormValidator (validationElements, profileForm);
  formEditProfile.resetErrorOpenPopup();

  userInfo.getUserInfo();

  toggleButtonInactive(validationElements);
}

//Отключение активной кнопки при открытии попапа добавления карточки
const toggleButtonInactive = (validationElements) => {
  const buttonCardElement = document.querySelector(validationElements.submitCardButton);
  buttonCardElement.setAttribute('disabled', true);
  buttonCardElement.classList.add(validationElements.inactiveButtonClass);
  }
  

//Обработка измененных данных профиля
const handlerProfileSubmit = () => {
  //userName.textContent = submitData.Name;
  // userAbout.textContent = submitData.Job;
  userInfo.setUserInfo();
  popupEditProfile.classList.remove('popup_opened');
  //console.log(submitData);
  
}

//открытие попапа при клике на карточку
const handleCardClick = (photoCard, popupPhotoCard) => {
  const popupCard = new PopupWithImage (photoCard, popupPhotoCard);
  popupCard.open();
}

//Добавление новой карточки из попапа
const handlerAddCardSubmit = (submitData) => {
  addNewCard(submitData);
}



//Функция закрытия попапа старая
const closePopup = (popup) => {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', handlePopupEscClick);
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