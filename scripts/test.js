let overlay = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.user__edit-button');
let popupCloseBtn = document.querySelector('.popup__close');
//let popupSaveBtn = document.querySelector('.popup__save-button');

let togglePopup = function(evt) {
    console.log('open');
    evt.preventDefault();
    overlay.classList.toggle('popup_opened');
}

function closePopup(evt) {
    if (evt.target === evt.currentTarget) {
        togglePopup(evt)
    }
}

popupOpenBtn.addEventListener('click',togglePopup);
popupCloseBtn.addEventListener('click',togglePopup);
overlay.addEventListener('click',closePopup);


let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
    evt.preventDefault(); 
    let editName = document.querySelector('.popup__name');
    let editAbout = document.querySelector('.popup__about');
    document.querySelector('.user__name').innerHTML = `<h1 class="user__name">${editName.value}
    <button class="user__edit-button"></button>
  </h1>`;
    document.querySelector('.user__about').textContent = `${editAbout.value}`;
    overlay.classList.toggle('popup_opened')
    popupOpenBtn.addEventListener('click',togglePopup);
    popupCloseBtn.addEventListener('click',togglePopup);
    overlay.addEventListener('click',closePopup);
}

formElement.addEventListener('submit', formSubmitHandler); 


formElement.addEventListener('keypress', function(evt) {
    if (evt.keyCode == 13) {
    evt.preventDefault();
    let editName = document.querySelector('.popup__name');
    let editAbout = document.querySelector('.popup__about');
    document.querySelector('.user__name').innerHTML = `<h1 class="user__name">${editName.value}
    <button class="user__edit-button"></button>
  </h1>`;
    document.querySelector('.user__about').textContent = `${editAbout.value}`;
    overlay.classList.toggle('popup_opened');
    }
});
