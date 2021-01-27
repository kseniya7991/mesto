let overlay = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.user__edit-button');
let popupCloseBtn = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let editName = document.querySelector('.popup__input_name');
let editAbout = document.querySelector('.popup__input_about');
let userName = document.querySelector('.user__name');
let userAbout =  document.querySelector('.user__about');


let openPopup = function(evt) {
    overlay.classList.add('popup_opened');
}

let closePopup = function(evt) {
    if (evt.target === evt.currentTarget) 
        overlay.classList.remove('popup_opened');
}

let btnClosePopup = function (evt) {
    overlay.classList.remove('popup_opened');
   }


function formSubmitHandler(evt) {
    evt.preventDefault(); 
    userName.textContent = editName.value;
    userAbout.textContent = editAbout.value;
    btnClosePopup();
}


// Такое было в чек-листе. Это не нужно делать в этой работе?//
//При открытом попапе нажатие на клавишу “Enter” 
//или кнопку «Сохранить» изменяет на странице информацию о пользователе.
formElement.addEventListener('keypress', function(evt) {
    if (evt.keyCode == 13) {
    evt.preventDefault();
    userName.textContent = editName.value;
    userAbout.textContent = editAbout.value;
    btnClosePopup();
    }
});

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', btnClosePopup);
overlay.addEventListener('click',closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
