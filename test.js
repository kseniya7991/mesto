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


let overlayProfile = document.querySelector('.popup_edit-profile');
let overlayAddCard = document.querySelector('.popup_add-card');
let popupOpenBtn = document.querySelector('.user__edit-button');
let popupCloseBtn = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let editName = document.querySelector('.popup__input_text_name');
let editAbout = document.querySelector('.popup__input_text_about');
let userName = document.querySelector('.user__name');
let userAbout =  document.querySelector('.user__about');
let addCardBtn = document.querySelector('.add-button');


/* let openPopup = function(evt) {
    overlay.classList.add('popup_opened');
} */

const editProfilePopup = (edit) => {
    overlayProfile.classList.add('popup_opened');
    editName.value = userName.textContent;
    editAbout.value = userAbout.textContent;
}

const addCardPopup = (add) => {
    overlayAddCard.classList.add('popup_opened');
}

let removePopupOpenedEdit = function(edit) {
    overlayProfile.classList.remove('popup_opened');
}

let removePopupOpenedAdd = function(add) {
    overlayAddCard.classList.remove('popup_opened');
}

let closeEditPopup = function(edit) {
    if (edit.target === edit.currentTarget) 
        removePopupOpenedEdit();
}

let closeAddPopup = function(add) {
    if (add.target === add.currentTarget) 
        removePopupOpenedAdd();
}


function formSubmitHandler(edit) {
    edit.preventDefault(); 
    userName.textContent = editName.value;
    userAbout.textContent = editAbout.value;
    removePopupOpenedEdit();
}

/* function formSubmitHandler(add) {
    add.preventDefault(); 
    userName.textContent = editName.value;
    userAbout.textContent = editAbout.value;
    removePopupOpened();
} */


{/* <li class="photo">
<img class="photo__img">
<div class="photo__description">
  <h2 class="photo__title"></h2>
  <button class="photo__like" type="button" aria-label="like"></button>
</div>
</li> */}

function render() {
    const html = initialCards.map(getItem)
    containerItems.append(...html);
}

function getItem(item) {
    const newItem = templateElement.content.cloneNode(true);
    const cardTitle = newItem.querySelector('.photo__title');
    cardTitle.textContent = item.name;

    const cardImage = newItem.querySelector('.photo__img');
    cardImage.setAttribute('src', item.src);
    cardImage.setAttribute('alt', item.name);
    cardImage.setAttribute('title', item.name);

    return newItem;
}




/* popupOpenBtn.addEventListener('click', openPopup);
addCardBtn.addEventListener('click', addCardPopup);
overlay.addEventListener('click',closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
popupCloseBtn.addEventListener('click', removePopupOpened); */

popupOpenBtn.addEventListener('click', editProfilePopup);
addCardBtn.addEventListener('click', addCardPopup);
overlayProfile.addEventListener('click', closeEditPopup);
overlayAddCard.addEventListener('click', closeAddPopup);
formElement.addEventListener('submit', formSubmitHandler); 
popupCloseBtn.addEventListener('click', removePopupOpenedEdit);

render();