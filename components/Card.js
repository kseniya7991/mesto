import {openPopup} from '../components/utils.js';

const photoPopupCard = document.querySelector('.popup__photo');
const captionPopupCard = document.querySelector('.popup__caption');
const popupPhotoCard = document.querySelector('.popup_photo');

 class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._src = data.src;
   this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
  	const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.photo__img').src = this._src;
    this._element.querySelector('.photo__img').alt = this._name;
    this._element.querySelector('.photo__title').textContent = this._name;
    return this._element;
  }
     
  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.photo__like');
    this._likeBtn.addEventListener('click', () => {
      this._handleCardLikeClick();
    });

    this._deleteBtn = this._element.querySelector('.photo__delete');
    this,this._deleteBtn.addEventListener('click', () => {
      this._handleCardDeleteClick()
    });

    this._photoCard = this._element.querySelector('.photo__img');
    this._photoCard.addEventListener('click', () => {
      this._handleCardPhotoImg(this._photoCard);
    });
  }

  _handleCardLikeClick = () => {
    this._likeBtn.classList.toggle('photo__like_active');
   }

   _handleCardDeleteClick = () => {
    this._likeBtn.closest('.photo').remove();
  }


  _handleCardPhotoImg = (photoElement) => {
    photoPopupCard.src = photoElement.src;
    photoPopupCard.alt = photoElement.alt;
    captionPopupCard.textContent = photoElement.alt;
    openPopup(popupPhotoCard);
  }
}

export {Card};
  