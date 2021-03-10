//import {openPopup} from './index2.js';

//const popupPhotoCard = document.querySelector('.popup_photo');
export default class Card {
  constructor(data) {
    this._src = data.src;
    this._name = data.name;
  }

  _getTemplate() {
  	const cardElement = document
      .querySelector('.template')
      .content
      .querySelector('.photo')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
   // this._setEventListeners();
    this._element.querySelector('.photo__img').src = this._src;
    this._element.querySelector('.photo__img').alt = this._name;
  	this._element.querySelector('.photo__title').textContent = this._name;

  	return this._element;
  }

/*   _setEventListeners() {
    this._element.querySelector('.photo__img').addEventListener('click', openPopup(popupPhotoCard));
  });

    buttonClosePopup.addEventListener('click', handleClosePopup);
    }); }*/
  

}

const renderElements = () => {
  const cardsElements = initialCards.map(getItem)
  containerItems.append(...cardsElements);

  cardList.innerHTML = '';
  items.forEach((item) => {
    const card = isGrid
      ? new DefaultCard(item, '.default-card')
      : new HorizontalCard(item, '.horizontal-card');

    const cardElement = card.generateCard();
    cardList.append(cardElement);
  });
};