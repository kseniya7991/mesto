import PopupWithImage from './PopupWithImage.js';
 class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
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
    this._likeBtn.closest('.photo').remove();
  }

}

export {Card};
  