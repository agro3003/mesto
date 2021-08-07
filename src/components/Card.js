export class Card {
  constructor({ data }, selector, handleCardClick, handleCardDel, api, myId) {
    this._foto = data.link;
    this._handleCardDel = handleCardDel;
    this._name = data.name;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._cardId = data._id;
    this._id = data.owner._id;
    this._listLike = data.likes;
    this._myId = myId;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  createCard = () => {
    this._element = this._getTemplate();
    this._element.id = this._cardId;
    this._element.querySelector('.element__foto').src = this._foto;
    this._element.querySelector('.element__foto').alt = `фото ${this._cardname}`;
    this._element.querySelector('.element__name').textContent = this._name;

    if (this._id === this._myId) {
      this._element.querySelector('.element__delete').classList.add('element__delete_unhidden');
    }
    this.checkLike(this._listLike);
    this._setEventListeners();
    return this._element;
  };

  checkLike = (list) => {
    if (list.find(item => item._id === this._myId)) {
      this._element.querySelector('.element__heart').classList.add('element__heart_active');
      this._element.querySelector('.element__heart-counter').textContent = list.length;
    } 
    else {
      this._element.querySelector('.element__heart').classList.remove('element__heart_active');
      this._element.querySelector('.element__heart-counter').textContent = list.length;
    }
  }



  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => { 
      if (this._listLike.every(item => {return item._id !== this._myId}))  {
        this._api.likeAdd(this._cardId).then((res) => {
          this.checkLike(res.likes)
          this._listLike = res.likes;
          return this._listLike;
        })
      } 
      else {
        this._api.likeDel(this._cardId).then((res) => {
        this.checkLike(res.likes)
        this._listLike = res.likes;
        return this._listLike;
        })

      }
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => this._handleCardDel(this._cardId));

    this._element.querySelector('.element__foto').addEventListener('click', () => this._handleCardClick(this._name, this._foto));
  }
}