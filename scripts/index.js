let overlay = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.user__edit-button');
let popupCloseBtn = document.querySelector('.popup__close');
let popupSaveBtn = document.querySelector('.popup__save-button');

let openPopup = function(evt) {
    overlay.classList.add('popup_opened');
}

let closePopup = function(evt) {
    if (evt.target !== evt.currentTarget) {
    openPopup()
    } else {
    overlay.classList.remove('popup_opened');  
    };
}

let closePopupBtn = function() {
    overlay.classList.remove('popup_opened');
}

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopupBtn);
overlay.addEventListener('click', closePopup);

let userInfo = document.querySelector('.user__profile-info');

function editUser() {
    let editName = document.querySelector('.popup__name');
    let editAbout = document.querySelector('.popup__about');
    document.querySelector('.user__name').innerHTML = `<h1 class="user__name">${editName.value}
    <button class="user__edit-button"></button>
  </h1>`;
    document.querySelector('.user__about').textContent = `${editAbout.value}`;
};

popupSaveBtn.addEventListener('click', editUser);


