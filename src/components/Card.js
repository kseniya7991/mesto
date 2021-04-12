import PopupWithImage from './PopupWithImage.js';

 class Card {
 constructor(data, cardSelector, handleCardClick, handleLikeCard,handleDeleteCardLike,hadleDeleteCardButton, userOwnerId) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._userId = data.owner._id;
    this._idCard = data._id;
    this._likes = data.likes.length;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this._userOwnerId = userOwnerId;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCardLike = handleDeleteCardLike;
    this._hadleDeleteCardButton = hadleDeleteCardButton;
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

    if(this._userId === this._userOwnerId) {
      this._deleteBtn.classList.remove('photo__delete_inactive');
      this._deleteBtn.removeAttribute('disabled');
    }

    return this._element;
  }
     
  _setEventListeners() {
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
      this._hadleDeleteCardButton(this._element, this._idCard);
    });

    this._photoCard = this._element.querySelector('.photo__img');
    this._photoCard.addEventListener('click', () => {
      this.handleCardClick();
    });
  }

  _handleAddLike () {
    this._likeBtn.classList.toggle('photo__like_active');
    this._likeCounter.textContent = this._likes + 1;
   }

  _handleLikeDelete() {
    this._likeBtn.classList.toggle('photo__like_active');
    this._likeCounter.textContent = this._likes;
  }
   
}

export {Card};