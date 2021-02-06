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

popupOpenBtn.addEventListener('click', openPopup);

overlay.addEventListener('click',closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
popupCloseBtn.addEventListener('click', removePopupOpened);