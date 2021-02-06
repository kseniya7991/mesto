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


let openPopup = function(evt) {
    overlay.classList.add('popup_opened');
    editName.value = userName.textContent;
    editAbout.value = userAbout.textContent;

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
    userName.textContent = editName.value;
    userAbout.textContent = editAbout.value;
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


popupOpenBtn.addEventListener('click', openPopup);

overlay.addEventListener('click',closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
popupCloseBtn.addEventListener('click', removePopupOpened);

render();