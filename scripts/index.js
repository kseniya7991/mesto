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

let overlayProfile = document.querySelector('.popup_profile');
let overlayAdd = document.querySelector('.popup_add');

let popupEditBtn = document.querySelector('.user__edit-button');
let popupCloseBtn = document.querySelector('.popup-close');

let formElement = document.querySelector('.popup__container_profile');
let addFormElement = document.querySelector('.popup__container_add');

let editName = document.querySelector('.popup__input_text_name');
let editAbout = document.querySelector('.popup__input_text_about');
let editTitle = document.querySelector('.popup__input_text_title');
let editLink = document.querySelector('.popup__input_link_photo');

let userName = document.querySelector('.user__name');
let userAbout =  document.querySelector('.user__about');

let popupAddBtn = document.querySelector('.add-button');

let saveBtn = document.querySelector('.popup__save-button_profile');
let createBtn = document.querySelector('.popup__save-button_add');

let overlayCard = document.querySelector('.photo-popup');
let popupCardCloseBtn = document.querySelector('.popup-close_card');
let photoPopupCard = document.querySelector('.photo-popup__photo');
let captionPopupCard = document.querySelector('.photo-popup__caption');


const openedProfilePopup = (evt) => {
    overlayProfile.classList.add('popup_opened');
}

const openAddPopup = (evt) => {
    overlayAdd.classList.add('popup_opened');
}


let openPopupProfile = function(evt) {
    editName.value = userName.textContent;
    editAbout.value = userAbout.textContent;
    openedProfilePopup();
}


let removePopupOpened = function() {
    overlayProfile.classList.remove('popup_opened');
    overlayCard.classList.remove('photo-popup_opened');
    overlayAdd.classList.remove('popup_opened');
}

let closePopup = function(evt) {
    if (evt.target === evt.currentTarget) 
        removePopupOpened();
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = editName.value;
    userAbout.textContent = editAbout.value;
    removePopupOpened();
}

function cardSubmitHandler(evt) {
    evt.preventDefault();
    addNewCard();
    removePopupOpened();
}

function render() {
    const html = initialCards.map(getItem)
    containerItems.append(...html);
}

const addNewCard = () => {
    const inputName = editTitle.value;
    const inputLink = editLink.value;
    const cardItem = getItem({name: inputName, src: inputLink});
    containerItems.prepend(cardItem);
}


function getItem(item) {
    const newItem = templateElement.content.cloneNode(true);
    const cardTitle = newItem.querySelector('.photo__title');
    cardTitle.textContent = item.name;
  
    const cardImage = newItem.querySelector('.photo__img');
    cardImage.setAttribute('src', item.src);
    cardImage.setAttribute('alt', item.name);
    cardImage.setAttribute('title', item.name);
    const srcPhoto = cardImage.getAttribute('src');
    const altPhoto = cardImage.getAttribute('alt');

    function openPhotoPopup (evt) {
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

popupEditBtn.addEventListener('click', openPopupProfile);
popupAddBtn.addEventListener('click', openAddPopup);

overlayProfile.addEventListener('click', closePopup);
overlayAdd.addEventListener('click', closePopup);
overlayCard.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler); 
addFormElement.addEventListener('submit', cardSubmitHandler);

popupCloseBtn.addEventListener('click', removePopupOpened);
popupCardCloseBtn.addEventListener('click', closePopup);

render();

