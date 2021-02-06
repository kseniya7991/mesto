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

let overlay = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.user__edit-button');
let popupCloseBtn = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let editName = document.querySelector('.popup__input_text_name');
let editAbout = document.querySelector('.popup__input_text_about');
let userName = document.querySelector('.user__name');
let userAbout =  document.querySelector('.user__about');
let popupCardBtn = document.querySelector('.add-button');
let popupTitle = document.querySelector('.popup__title');
let saveBtn = document.querySelector('.popup__save-button');

const openPopup = (evt) => {
    overlay.classList.add('popup_opened');
}

let openPopupProfile = function(evt) {
    editName.value = userName.textContent;
    editAbout.value = userAbout.textContent;
    editName.setAttribute('name', 'Name');
    editName.setAttribute('placeholder', 'Ваше имя');
    editAbout.setAttribute('name', 'Job');
    editAbout.setAttribute('placeholder', 'Чем вы занимаетесь');
    openPopup();
    popupTitle.textContent = 'Редактировать профиль';
    saveBtn.textContent = 'Сохранить';

}

let openPopupCard = function(evt) {
    editName.value = '';
    editAbout.value = '';
    editName.setAttribute('name', 'Title');
    editName.setAttribute('placeholder', 'Название');
    editAbout.setAttribute('name', 'Link');
    editAbout.setAttribute('placeholder', 'Ссылка на картинку');
    openPopup();
    popupTitle.textContent = 'Новое место';
    saveBtn.textContent = 'Создать';
}

let removePopupOpened = function() {
    overlay.classList.remove('popup_opened');

}

let closePopup = function(evt) {
    if (evt.target === evt.currentTarget) 
        removePopupOpened();
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    if (popupTitle.textContent === 'Редактировать профиль') {
    userName.textContent = editName.value;
    userAbout.textContent = editAbout.value;
    } else {

    };
    removePopupOpened();
}

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


popupOpenBtn.addEventListener('click', openPopupProfile);

overlay.addEventListener('click',closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
popupCloseBtn.addEventListener('click', removePopupOpened);
popupCardBtn.addEventListener('click', openPopupCard);

render();