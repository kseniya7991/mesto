//новое
console.log('fff');
import { initialCards } from './initialCards.js';
import Card from './Card.js';


initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();
  document.querySelector('.photos-grid').append(cardElement)
});  
  
