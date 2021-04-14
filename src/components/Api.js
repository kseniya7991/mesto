const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}


export default class Api {
  constructor({token, groupID}) {
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
    .then(handleResponse)
    .catch((err) => {console.log(err)})
  }

  getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards`, {
      method:'GET',
      headers: {
        authorization: this._token,
      }})
    .then(handleResponse)
    .catch((err) => {console.log(err)})
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
    .then(handleResponse)
    .catch((err) => {console.log(err)})
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
    .then(handleResponse)
    .catch((err) => {console.log(err)})
  }

  removeCard(idCard){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/${idCard}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(handleResponse)
    .catch((err) => {console.log(err)})
  }

  likeCard(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(handleResponse)
    .catch((err) => {console.log(err)})
  }

  deleteLikeCard(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(handleResponse)
    .catch((err) => {console.log(err)})
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
    .then(handleResponse)
    .catch((err) => {console.log(err)})
  }

}  