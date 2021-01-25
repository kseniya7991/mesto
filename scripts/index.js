let overlay = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.user__edit-button');
let popupCloseBtn = document.querySelector('.popup__close');
let popupSaveBtn = document.querySelector('.popup__save-button');


let openPopup = function(evt) {
    evt.preventDefault();
    overlay.classList.add('popup_opened');
    //console.log('функция сработала');
}
popupOpenBtn.addEventListener('click', openPopup);


let closePopup = function(evt) {
    if (evt.target === evt.currentTarget) overlay.classList.remove('popup_opened');
}

let closePopupBtn = function(evt) {
  evt.preventDefault();
  overlay.classList.remove('popup_opened');
}


popupCloseBtn.addEventListener('click', closePopupBtn);
overlay.addEventListener('click', closePopup);
popupSaveBtn.addEventListener('click', closePopupBtn);


let userInfo = document.querySelector('.user__profile-info');

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
//let nameInput = formElement.querySelector('.popup__name');
//let jobInput = formElement.querySelector('.popup__about');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет


function formSubmitHandler(evt) {
    evt.preventDefault(); 
    let editName = document.querySelector('.popup__name');
    let editAbout = document.querySelector('.popup__about');
    document.querySelector('.user__name').innerHTML = `<h1 class="user__name">${editName.value}
    <button class="user__edit-button"></button>
  </h1>`;
    document.querySelector('.user__about').textContent = `${editAbout.value}`;
    overlay.classList.remove('popup_opened');
    popupOpenBtn.addEventListener('click', openPopup);
}
formElement.addEventListener('submit', formSubmitHandler); 

//function editUser() {
   //let editName = document.querySelector('.popup__name');
  // let editAbout = document.querySelector('.popup__about');
  // document.querySelector('.user__name').innerHTML = `<h1 class="user__name">${editName.value}
  // <button class="user__edit-button"></button>
 //</h1>`;
 //  document.querySelector('.user__about').textContent = `${editAbout.value}`;
//  popupOpenBtn.addEventListener('click', openPopup);
//};

//popupSaveBtn.addEventListener('click', editUser);


//closePopup();
//closePopupBtn();
//editUser();


