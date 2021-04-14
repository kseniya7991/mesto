//Импорт главного CSS
import './pages/index.css'; 

//Импорт js модулей
import Section from './components/Section.js';
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

const avatarUserPhoto = document.querySelector('.user__avatar');
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

Promise.all([
  //Получение данных пользователя
  api.getUser(),
  //Получение карточек с сервера
  api.getCards(),
])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData)
    userInfo.setUserPhoto(userData)
    userInfo.getOwnerId(userData);
    cardList.renderer(cardsData);
  })
  .catch((err) => {
    console.log(err);
  }); 

//Попап открытия полноразмерного фото карточек
const popupCardPhoto = new PopupWithImage (popupPhotoCard);
popupCardPhoto.setEventListeners();

//Функция создания экземпляра карточки
export const addInstanceCard = (item) => {
  const card = new Card(    
    item, 
    '.template',
    //handleCardClick
    () => {popupCardPhoto.open(item)},
    //handleCardLike 
    (idCard) => { 
      api.likeCard(idCard)
      .catch((err) => {console.error(err)})
    },
    //handleDeleteCardLike
    (idCard) => {
      api.deleteLikeCard(idCard)
      .catch((err) => {console.error(err)})
    },
    //hadleDeleteCardButton
    (cardElementHtml, idCard) => {
      popupDelete.openPopupDelete(cardElementHtml, idCard)
    },
    userInfo.getOwnerId()
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

//Отрисовка карточек
const cardList = new Section ({
  renderer: (item) => { 
    addInstanceCard(item);
  }},
  cardListSection
)
  

//Создание экземпляров форм
//Редактирование информации о пользователе
const popupProfile = new PopupWithForm(
  {submitFunction: (formData) => {
    popupProfile.renderLoading(true, 'Сохранение...');
    api.sendUser(formData)
    .then(() => {
    userInfo.setUserInfo(formData)
    popupProfile.close()
    })
    .catch ( err => {
      console.log (`Ой йой, ошибка ${err.status}`)
    })
    .finally(popupProfile.renderLoading(false, 'Сохранение...'))
  }}, popupEditProfile);
popupProfile.setEventListeners();


//Добавление новой карточки
  const popupCard = new PopupWithForm(
    {submitFunction: (formData) => {
      popupCard.renderLoading(true, 'Создание...');
      api.addCard(formData)
        .then(res => {
          const itemData = {name: formData.Title, link: formData.Link, _id: res._id, likes: res.likes, owner: {_id: res.owner._id}};
          addInstanceCard(itemData);
          popupCard.close();
        })
        .catch ( err => {
          console.log (`Ой йой, ошибка ${err.status}`)
        })
        .finally(popupCard.renderLoading(false, 'Создание...'))
    }}, popupAddCard);
  popupCard.setEventListeners();

//Редактирование аватара пользователя
const popupAvatar = new PopupWithForm(
  {submitFunction: (formData) => {
    popupAvatar.renderLoading(true, 'Сохранение...');
    const linkAvatar = formData.AvatarLink;
    api.updateAvatar(linkAvatar)
    .then(() => {
      userInfo.updateUserAvatar(linkAvatar)
      popupAvatar.close();
    })
    .catch((err) => {console.log(err)})
    .finally(popupAvatar.renderLoading(false, 'Сохранение...'))
  }}, popupUpdateAvatar);
popupAvatar.setEventListeners();

//Подтверждение удаления карточки
const popupDelete = new PopupWithForm(
  {submitFunction: (idCard, cardEl) => {
    popupDelete.renderLoading(true, 'Удаление...');
    api.removeCard(idCard)
      .then(() => {
        cardEl.remove()
        popupDelete.close()
      })
      .catch(err => {
        console.log(`Ошибка ${err.status} при удалении`)
        console.error(err);
      })
      .finally(popupDelete.renderLoading(false, 'Удаление...'))
  }}, popupDeleteCard);
popupDelete.setEventListenersDelete();


//Экземпляр UserInfo (создается 1 раз)
//const userInfo = new UserInfo ({nameSelector: '.user__name', aboutSelector:'.user__about'});
const userInfo = new UserInfo ({nameSelector: '.user__name', aboutSelector:'.user__about', avatarUserPhoto});

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

//Запуск валидатора форм
addValidator();

//Экспорт для модулей
export {validationElements};