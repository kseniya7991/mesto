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
      console.error(err)
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
      console.error(err)
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
      console.error(err)
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
      console.error(err)
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
      console.error(err)
    })
    }

  likeCard(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .catch(err => `Ошибка ${err.status}`)
  }

  deleteLikeCard(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .catch(err => {
      console.log(`Ошибка ${err.status}`)
      console.error(err)
    })
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
    .catch ( err => {
      console.error(err);
      console.log (`Ой йой, ошибка ${err.status}`)
    })
  }

}  