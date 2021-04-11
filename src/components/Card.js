import PopupWithImage from './PopupWithImage.js';
import {popupDelete} from './utils.js';
 class Card {
<<<<<<< HEAD
  constructor(data, cardSelector, handleCardClick, {handleDeleteButtonClick}) {
=======
  constructor(data, cardSelector, handleCardClick, handleLikeCard,handleDeleteCardLike, userOwnerId) {
>>>>>>> 416273d
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._userId = data.owner._id;
    this._idCard = data._id;
    this._likes = data.likes.length;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
<<<<<<< HEAD
    this._handleDeleteButtonClick = handleDeleteButtonClick;
=======
    this._userOwnerId = userOwnerId;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCardLike = handleDeleteCardLike;
>>>>>>> 416273d
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

<<<<<<< HEAD

    if(this._userId === '593bac0b0630e44665c3a674') {
=======
    if(this._userId === this._userOwnerId) {
>>>>>>> 416273d
      this._deleteBtn.classList.remove('photo__delete_inactive');
      this._deleteBtn.removeAttribute('disabled');
    }

    return this._element;
  }
     
  _setEventListeners() {
    //this._likeCounter = this._element.querySelector('.photo__like-counter');
    this._likeBtn = this._element.querySelector('.photo__like');
    

    this._likeBtn.addEventListener('click', () => {
     if(!this._likeBtn.classList.contains('photo__like_active')) {
      this._handleAddLike();
      this._handleLikeCard(this._idCard);
     } else {
      this._handleLikeDelete();
      this._handleDeleteCardLike(this._idCard);
     }
      
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

  _handleAddLike () {
    this._likeBtn.classList.toggle('photo__like_active');
    this._likeCounter.textContent = this._likes + 1;
    console.log(this._likes)
   }

  _handleLikeDelete() {
    this._likeBtn.classList.toggle('photo__like_active');
    this._likeCounter.textContent = this._likes;
  }
   

   _handleCardDeleteClick () {
<<<<<<< HEAD
    //popupDelete.open();
    //this._likeBtn.closest('.photo').remove();
  }

  removeCard() {
    console.log('dddd');
    this._element.remove();
    this._element = null;
  }
=======
    popupDelete.getCard(this._element, this._idCard);
    popupDelete.open();
  }

>>>>>>> 416273d

  getId(){
    console.log(this._idCard)
    //return this._idCard;
  }

}

export {Card};
  