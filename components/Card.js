import PopupWithImage from './PopupWithImage.js';

const popupPhotoCard = document.querySelector('.popup_photo');

 class Card {
  constructor(handleCardClick, data, cardSelector) {
    this._data = data;
    this._src = data.src;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._photoImg = this._element.querySelector('.photo__img');
    this._photoImg.src = this._src;
    this._photoImg.alt = this._name;
    this._element.querySelector('.photo__title').textContent = this._name;
    return this._element;
  }
     
  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.photo__like');
    this._likeBtn.addEventListener('click', () => {
      this._handleCardLikeClick();
    });

    this._deleteBtn = this._element.querySelector('.photo__delete');
    this._deleteBtn.addEventListener('click', () => {
      this._handleCardDeleteClick()
    });

    this._photoCard = this._element.querySelector('.photo__img');
    this._photoCard.addEventListener('click', () => {
     this._handleCardClick(this._photoCard, popupPhotoCard);
    });
  }

  _handleCardLikeClick = () => {
    this._likeBtn.classList.toggle('photo__like_active');
   }

   _handleCardDeleteClick = () => {
    this._likeBtn.closest('.photo').remove();
  }


  /*handleCardClick = () => {
    const popupCard = new PopupWithImage (this._photoCard, popupPhotoCard);
    popupCard.open();
  }*/
}

export {Card};
  