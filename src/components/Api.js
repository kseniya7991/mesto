export default class Api {
  constructor({token, groupID}) {
    //this._address = address;
    this._token = token;
    this._groupID = groupID;
  }

  getUser() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me`, {
      headers: {
        authorization: this._token,
        method:'GET'
      }
    })

    .then(res => { 
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${response.status}`) 
    })
    .catch ( err => {
      console.log (`Ой йой, ошибка ${err.status}`)
    })
    
  }

  getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards`, {
      method:'GET',
      headers: {
        authorization: this._token,
      }})
    .then( res => { return res.json()})
    .catch ( err => {
      console.log (`Ой йой, ошибка ${err.status}`)
    })
  }

  sendUser({name, about} = userData) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    
    .catch ( err => {
      console.log (`Ой йой, ошибка ${err.status}`)
    })
  }

  addCard({Title, Link} = cardData) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Title,
        link: Link
      })
    })
    .then(res => res.ok
      ? res.json()
      : Promise.reject(`Ошибка ${res.status}`))
    .catch ( err => {
      console.log (`Ой йой, ошибка ${err.status}`)
    })
  }

  removeCard(idCard){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/${idCard}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok
      ? Promise.resolve('success')
      : Promise.reject(`Ошибка ${res.status}`))
    .catch ( err => {
      console.log (`Ой йой, ошибка ${err.status}`)
    })
    }

  likeCard(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then( res => console.log ('лайк поставили'))
    .catch(err => `Ошибка ${err.status}`)
  }

  deleteLikeCard(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then( res => console.log ('лайк удалили'))
    .catch(err => `Ошибка ${err.status}`)
  }

  updateAvatar(avatarLink) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then((res) => res.json())
    .then(res => console.log(res))
    .catch ( err => {
      console.log (`Ой йой, ошибка ${err.status}`)
    })
  }

  /*renderLoading(isLoading) {
    const saveButton = document.querySelector('.popup__save-button');

    if(isLoading) {
      saveButton.textContent = 'Cохранение...'
      //saveButton.classList.add('content_hidden')
    } else {
      saveButton.classList.remove('spinner_visible')
      //saveButton.classList.remove('content_hidden')
    }
  }*/



}



  

  /*addMessage() {
    return fetch(`${address}/messages`,{
    method: 'POST',
    headers: {
      authorization: this._token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      user: data.user,
      messsage: data.message
    })
  })
  .then(res => res.ok 
    ? res.json() 
    : Promise.reject(`Ошибка`)
    )
  }

  remove(id) {
    return fetch(`${this._address}/messages/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok
      ? Promise.resolve('success')
      : Promise.reject(`Ошибка ${response.status}`))
  }
*/
  




/*

//
//В индексе:

import Api  from '';
import { data } from "browserslist";
import { reject } from "core-js/fn/promise";

const api = new Api({
  address: httpsdsffsfsd,
  token: 'test'
})


api.getMessages()
  .then( messages => {
    messageList.renderItems(messages)
  })
  .catch(err => console.log('Ошибка при создании'))


  /*const form ....
  addItem: (data) => {
    api.message(data)
    .then(res => {
      messageList.addItem(createMessage({...data, _id: result.id}))
    })
    .catch(err => console.log('Ошибка))
  }
  */

  /* удаляем при создании класса мессадж, наверное карта в нашем случае

  createMessage = (data) => {
    const message = new Messagr ( { data,
      handleDeleteButtonClick: () => {
        api.removeMessage(message.getId())
          .then(() => message.removeMessage())
          .catch(err => console.log('Ошибка'))
      }
    })
  }

  /*При создании карточки передавать id, по которому проверять*/
