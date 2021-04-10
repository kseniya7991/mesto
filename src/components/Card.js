import PopupWithImage from './PopupWithImage.js';
import {popupDelete} from './utils.js';
 class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._userId = data.owner._id;
    this._idCard = data._id;
    this._likes = data.likes.length;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    this._photoImg.src = this._link;
    this._photoImg.alt = this._name;
    this._element.querySelector('.photo__title').textContent = this._name;

    this._likeCounter = this._element.querySelector('.photo__like-counter');
    this._likeCounter.textContent = this._likes;

    if(this._userId === '593bac0b0630e44665c3a674') {
      this._deleteBtn.classList.remove('photo__delete_inactive');
      this._deleteBtn.removeAttribute('disabled');
    }

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
      this.handleCardClick();
    });
  }

  _handleCardLikeClick () {
    this._likeBtn.classList.toggle('photo__like_active');
   }

   _handleCardDeleteClick () {
    popupDelete.getIdCard(this._idCard);
    popupDelete.open();
    //this._likeBtn.closest('.photo').remove();
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

}

export {Card};
  