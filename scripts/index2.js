//новое
import { initialCards } from './initialCards.js';
import {Card, handleCardPhotoImg} from './Card.js';
import {FormValidator} from './FormValidator.js';

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();
  document.querySelector('.photos-grid').append(cardElement)
});  
  



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

/* const saveBtn = document.querySelector('.popup__save-button_profile');
const createBtn = document.querySelector('.popup__save-button_add');

const popupCardCloseBtn = document.querySelector('.popup-close_card');
const photoPopupCard = document.querySelector('.popup__photo');
const captionPopupCard = document.querySelector('.popup__caption');
 */


const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupEscClick); 
}

const openAddCardPopup = (evt) => {
  addCardForm.reset();
  openPopup(popupAddCard);
  resetErrorClosingPopup(popupAddCard, validationElements);
}

const openProfilePopup = (evt) => {
  editName.value = userName.textContent;
  editAbout.value = userAbout.textContent;
  //resetErrorClosingPopup(popupEditProfile, validationElements);
  openPopup(popupEditProfile);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', handlePopupEscClick);
}

//Скрытие ошибок при закрытии активного попапа
const resetErrorClosingPopup = (popup, validationElements) => {
  const inputErrorList = Array.from(popup.querySelectorAll(validationElements.inputSelector));
  inputErrorList.forEach((inputErrorEl) => {
    inputErrorEl.classList.remove(validationElements.inputErrorActive);
  });
  const textErrorList = Array.from(popup.querySelectorAll(validationElements.textError));
  textErrorList.forEach((textErrorEl) => {
    textErrorEl.textContent = '';
  })
}

const handlerProfileSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = editName.value;
  userAbout.textContent = editAbout.value;
   closePopup(popupEditProfile);
}

const handlerAddCardSubmit = (evt) => {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddCard);
}


const addNewCard = () => {
  const card = new Card({name: editTitle.value, src: editLink.value});
  const cardElement = card.generateCard();
  document.querySelector('.photos-grid').prepend(cardElement);
}


const handlePopupEscClick = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') closePopup(popupOpened);
};

const handleClosePopupClick = () => {
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) closePopup(popup);
    if (evt.target.classList.contains('popup-close')) closePopup(popup);
    });
});
}

buttonOpenEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openAddCardPopup);
 
profileForm.addEventListener('submit', handlerProfileSubmit); 
addCardForm.addEventListener('submit', handlerAddCardSubmit);

handleClosePopupClick();

const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: '.popup__save-button_inactive',
  textError: '.popup__input-error',
  activeTextError: 'popup__input-error_active',
  inputErrorActive: 'popup__input_error',
};

const enableValidation = (validationElements) => {
  const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
  formList.forEach( (formElement) => {
    console.log(formElement);
    const formProfile = formElement.classList.contains('popup__form_profile');
    const formNewCard = formElement.classList.contains('popup__form_add');
    if(formProfile) {
      new FormValidator (validationElements, formElement);
      console.log(formProfile);
      formProfile.setEventListeners();
    } else if(formNewCard) {
      new FormValidator (validationElements, formElement);
       formNewCard.setEventListeners();
    }
  });

  const card = item.isOwner
  ? new UserCard(item, '.card-template_type_user')
  : new DefaultCard(item, '.card-template_type_default');

}

enableValidation(validationElements);

export {openPopup, validationElements};