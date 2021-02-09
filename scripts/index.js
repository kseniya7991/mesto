const initialCards = [
  {
    name: 'Карачаево-Черкесск',
    src: './images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    src: './images/elbrus.jpg'
  },
  {
    name: 'Красная Поляна',
    src: './images/krasnaya-polyana.jpg'
  },
  {
    name: 'Домбай',
    src: './images/dombay.jpg'
  },
  {
    name: 'Сулакский Каньон',
    src: './images/sulakskiy-kanyon.jpg'
  },
  {
    name: 'Роза Пик',
    src: './images/krasnaya-polyana.jpg'
  }
];

const templateElement = document.querySelector('.template');
const containerItems = document.querySelector('.photos-grid');

const profilePopup = document.querySelector('.popup_profile');
const buttonOpenAddCard = document.querySelector('.popup_add');

const buttonOpenEditProfile = document.querySelector('.user__edit-button');
const popupCloseBtn = document.querySelector('.popup-close');
const popupAddCloseBtn = document.querySelector('.popup-close_add');

const profileForm = document.querySelector('.popup__container_profile');
const AddCardForm = document.querySelector('.popup__container_add');

const editName = document.querySelector('.popup__input_text_name');
const editAbout = document.querySelector('.popup__input_text_about');
const editTitle = document.querySelector('.popup__input_text_title');
const editLink = document.querySelector('.popup__input_link_photo');

const userName = document.querySelector('.user__name');
const userAbout =  document.querySelector('.user__about');

const popupAddBtn = document.querySelector('.add-button');

const saveBtn = document.querySelector('.popup__save-button_profile');
const createBtn = document.querySelector('.popup__save-button_add');

const overlayCard = document.querySelector('.photo-popup');
const popupCardCloseBtn = document.querySelector('.popup-close_card');
const photoPopupCard = document.querySelector('.photo-popup__photo');
const captionPopupCard = document.querySelector('.photo-popup__caption');


const openAddPopup = (evt) => {
  buttonOpenAddCard.classList.add('popup_opened');
  AddCardForm.reset();
}

const openPopupProfile = (evt) => {
  profilePopup.classList.add('popup_opened');
  editName.value = userName.textContent;
  editAbout.value = userAbout.textContent;
}

const removePopupOpened = () => {
  profilePopup.classList.remove('popup_opened');
  buttonOpenAddCard.classList.remove('popup_opened');
  overlayCard.classList.remove('photo-popup_opened'); 
}

const closePopup = (evt) => {
  if (evt.target === evt.currentTarget) 
      removePopupOpened();
}


const handlerProfileSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = editName.value;
  userAbout.textContent = editAbout.value;
  removePopupOpened();
}

const handlerAddCardSubmit = (evt) => {
  evt.preventDefault();
  addNewCard();
  removePopupOpened();
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
  cardImage.setAttribute('src', item.src);
  cardImage.setAttribute('alt', item.name);
  cardImage.setAttribute('title', item.name);
  const srcPhoto = cardImage.getAttribute('src');
  const altPhoto = cardImage.getAttribute('alt');

  const openPhotoPopup = (evt) => {
      overlayCard.classList.add('photo-popup_opened');
      photoPopupCard.setAttribute('src', srcPhoto);
      photoPopupCard.setAttribute('alt', altPhoto);
      captionPopupCard.textContent = altPhoto;
  }
  cardImage.addEventListener('click', openPhotoPopup);
  
  const likeBtn = newItem.querySelector('.photo__like');
  likeBtn.addEventListener('click', photoLike);

  const deleteBtn = newItem.querySelector('.photo__delete');
  deleteBtn.addEventListener('click', photoDelete);

  return newItem;
}

const photoLike = (event) => {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.photo__like');
  targetItem.classList.toggle('photo__like_active');
}

const photoDelete = (event) => {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.photo');
  targetItem.remove();
}

buttonOpenEditProfile.addEventListener('click', openPopupProfile);
popupAddBtn.addEventListener('click', openAddPopup);

profilePopup.addEventListener('click', closePopup);
buttonOpenAddCard.addEventListener('click', closePopup);
overlayCard.addEventListener('click', closePopup);

profileForm.addEventListener('submit', handlerProfileSubmit); 
AddCardForm.addEventListener('submit', handlerAddCardSubmit);

popupAddCloseBtn.addEventListener('click', removePopupOpened);
popupCloseBtn.addEventListener('click',removePopupOpened);
popupCardCloseBtn.addEventListener('click', closePopup);

render();
