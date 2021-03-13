//новое
import { initialCards } from '../components/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';


//Объявление переменных
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');

const buttonOpenEditProfile = document.querySelector('.user__edit-button');

const profileForm = document.querySelector('.popup__form_profile');
const addCardForm = document.querySelector('.popup__form_add');

const editName = document.querySelector('.popup__input_text_name');
const editAbout = document.querySelector('.popup__input_text_about');
const editTitle = document.querySelector('.popup__input_text_title');
const editLink = document.querySelector('.popup__input_link_photo');

const userName = document.querySelector('.user__name');
const userAbout =  document.querySelector('.user__about');

const buttonAddCard = document.querySelector('.add-button');

const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: '.popup__save-button_inactive',
  textError: '.popup__input-error',
  activeTextError: 'popup__input-error_active',
  inputErrorActive: 'popup__input_error',
};

//Отрисовка первоначальных 6ти карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();
  document.querySelector('.photos-grid').append(cardElement)
});  

//Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupEscClick); 
}

//Открытие попапа добавления карточки
const openAddCardPopup = (evt) => {
  addCardForm.reset();
  openPopup(popupAddCard);
  resetErrorOpenPopup(popupAddCard, validationElements);
}

//Открытие попапа редактирования профиля
const openProfilePopup = (evt) => {
  editName.value = userName.textContent;
  editAbout.value = userAbout.textContent;
  resetErrorOpenPopup(popupEditProfile, validationElements);
  openPopup(popupEditProfile);
}

//Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', handlePopupEscClick);
}

//Сброс ошибок при открытии попапа
const resetErrorOpenPopup = (popup, validationElements) => {
  const inputErrorList = Array.from(popup.querySelectorAll(validationElements.inputSelector));
  inputErrorList.forEach((inputErrorEl) => {
    inputErrorEl.classList.remove(validationElements.inputErrorActive);
  });
  const textErrorList = Array.from(popup.querySelectorAll(validationElements.textError));
  textErrorList.forEach((textErrorEl) => {
    textErrorEl.textContent = '';
  })
}

//Обработка измененных данных профиля
const handlerProfileSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = editName.value;
  userAbout.textContent = editAbout.value;
  closePopup(popupEditProfile);
}

//Добавление новой карточки из попапа
const handlerAddCardSubmit = (evt) => {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddCard);
}


//Рендеринг новой карточки
const addNewCard = () => {
  const item = {name: editTitle.value, src: editLink.value};
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();
  document.querySelector('.photos-grid').prepend(cardElement);
}

//Закрытие попапа по клику на Esc
const handlePopupEscClick = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') closePopup(popupOpened);
};

//Закрытие попапов по клику на крестик
const handleClosePopupClick = () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) closePopup(popup);
      if (evt.target.classList.contains('popup-close')) closePopup(popup);
    });
  });
}

//Добавление экземпляра класса валидатора для каждой формы
const addValidator = (validationElements) => {
  const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
  formList.forEach( (formElement) => {
    const formEl = new FormValidator (validationElements, formElement);
    formEl.enableValidation();
  });
}

//Слушатели на кнопки
buttonOpenEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openAddCardPopup);
 
profileForm.addEventListener('submit', handlerProfileSubmit); 
addCardForm.addEventListener('submit', handlerAddCardSubmit);

handleClosePopupClick();
addValidator(validationElements);

//Экспорт для модулей
export {openPopup, validationElements};