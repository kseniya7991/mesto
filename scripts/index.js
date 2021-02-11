const templateElement = document.querySelector('.template');
const containerItems = document.querySelector('.photos-grid');

const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');
const popupPhotoCard = document.querySelector('.popup_photo');

const buttonOpenEditProfile = document.querySelector('.user__edit-button');
const buttonCloseProfilePopup = document.querySelector('.popup-close');
const buttonCloseAddPopup = document.querySelector('.popup-close_add');

const profileForm = document.querySelector('.popup__container_profile');
const addCardForm = document.querySelector('.popup__container_add');

const editName = document.querySelector('.popup__input_text_name');
const editAbout = document.querySelector('.popup__input_text_about');
const editTitle = document.querySelector('.popup__input_text_title');
const editLink = document.querySelector('.popup__input_link_photo');

const userName = document.querySelector('.user__name');
const userAbout =  document.querySelector('.user__about');

const buttonAddCard = document.querySelector('.add-button');

const saveBtn = document.querySelector('.popup__save-button_profile');
const createBtn = document.querySelector('.popup__save-button_add');

/* const overlayCard = document.querySelector('.popup'); */
const popupCardCloseBtn = document.querySelector('.popup-close_card');
const photoPopupCard = document.querySelector('.popup__photo');
const captionPopupCard = document.querySelector('.popup__caption');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const openAddCardPopup = (evt) => {
  addCardForm.reset();
  openPopup(popupAddCard);
}

const openProfilePopup = (evt) => {
  editName.value = userName.textContent;
  editAbout.value = userAbout.textContent;
  openPopup(popupEditProfile);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened'); 
}

const handleClosePopupClick = (evt) => {
  const buttonClose = evt.target.closest('.popup_opened');
  if (evt.target === evt.currentTarget) 
      closePopup(buttonClose);
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

const openPhotoPopup = (evt) => {
      openPopup(popupPhotoCard);
      photoPopupCard.src = srcPhoto;
      photoPopupCard.alt = altPhoto;
      captionPopupCard.textContent = altPhoto;
  }

  cardImage.addEventListener('click', openPhotoPopup); 
  
  const likeBtn = newItem.querySelector('.photo__like');
  likeBtn.addEventListener('click', handleCardLikeClick);

  const deleteBtn = newItem.querySelector('.photo__delete');
  deleteBtn.addEventListener('click', handleCardDeleteClick);

  return newItem;
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

buttonOpenEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openAddCardPopup);
 
popupEditProfile.addEventListener('click', handleClosePopupClick);
popupAddCard.addEventListener('click', handleClosePopupClick);
buttonCloseAddPopup.addEventListener('click', handleClosePopupClick); 
buttonCloseProfilePopup.addEventListener('click', handleClosePopupClick); 
popupPhotoCard.addEventListener('click', handleClosePopupClick);
profileForm.addEventListener('submit', handlerProfileSubmit); 
addCardForm.addEventListener('submit', handlerAddCardSubmit);

popupCardCloseBtn.addEventListener('click', handleClosePopupClick);

render();
