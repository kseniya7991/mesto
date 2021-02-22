const templateElement = document.querySelector('.template');
const containerItems = document.querySelector('.photos-grid');

const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');
const popupPhotoCard = document.querySelector('.popup_photo');

const buttonOpenEditProfile = document.querySelector('.user__edit-button');
const buttonCloseProfilePopup = document.querySelector('.popup-close');
const buttonCloseAddPopup = document.querySelector('.popup-close_add');

const profileForm = document.querySelector('.popup__form_profile');
const addCardForm = document.querySelector('.popup__form_add');

const editName = document.querySelector('.popup__input_text_name');
const editAbout = document.querySelector('.popup__input_text_about');
const editTitle = document.querySelector('.popup__input_text_title');
const editLink = document.querySelector('.popup__input_link_photo');

const userName = document.querySelector('.user__name');
const userAbout =  document.querySelector('.user__about');

const buttonAddCard = document.querySelector('.add-button');

const saveBtn = document.querySelector('.popup__save-button_profile');
const createBtn = document.querySelector('.popup__save-button_add');

const popupCardCloseBtn = document.querySelector('.popup-close_card');
const photoPopupCard = document.querySelector('.popup__photo');
const captionPopupCard = document.querySelector('.popup__caption');



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
  resetErrorClosingPopup(popupEditProfile, validationElements);
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

const render = () => {
  const cardsElements = initialCards.map(getItem)
  containerItems.append(...cardsElements);
}

const addNewCard = () => {
  const cardItem = getItem({name: editTitle.value, src: editLink.value});
  containerItems.prepend(cardItem);
}

const getItem = (item) => {
  const newItem = templateElement.content.cloneNode(true);
  const cardTitle = newItem.querySelector('.photo__title');
  cardTitle.textContent = item.name;

  const cardImage = newItem.querySelector('.photo__img');
  cardImage.src = item.src;
  cardImage.alt = item.name;
  cardImage.title = item.name;
  const srcPhoto = cardImage.src;
  const altPhoto = cardImage.alt;

  const photoCard = newItem.querySelector('.photo__img');
  photoCard.addEventListener('click', handleCardPhotoImg);

  const likeBtn = newItem.querySelector('.photo__like');
  likeBtn.addEventListener('click', handleCardLikeClick);

  const deleteBtn = newItem.querySelector('.photo__delete');
  deleteBtn.addEventListener('click', handleCardDeleteClick);

  return newItem;
}


const handleCardPhotoImg = (event) => {
  const targetEl = event.target;
  photoPopupCard.src = targetEl.src;
  photoPopupCard.alt = targetEl.alt;
  captionPopupCard.textContent = targetEl.alt;
  openPopup(popupPhotoCard);
}

const handleCardLikeClick = (event) => {
  const targetEl = event.target;
  targetEl.classList.toggle('photo__like_active');
}


const handleCardDeleteClick = (event) => {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.photo');
  targetItem.remove();
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
render();
