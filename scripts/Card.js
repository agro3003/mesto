export class Card {
  constructor (foto, name, selector, openImagePopup) {
    this._foto = foto;
    this._name = name;
    this._selector = selector;
    this._openImagePopup = openImagePopup;
    this._elementCard = document.querySelector(this._selector).content.cloneNode(true);
  }

  _like = () => {
    this._elementCard.querySelector(".element__heart").addEventListener('click', (like) => {
     like.target.classList.toggle('element__heart_active');
    });
  }

  _delete = () => {
    this._elementCard.querySelector('.element__delete').addEventListener('click', function (del) {
      del.target.closest('.element').remove();
    });
  }

  _openImage = () => {
    this._elementCard.querySelector('.element__foto').addEventListener('click', () => this._openImagePopup(this._name, this._foto))
  }

  createCard = () => {
    this._elementCard.querySelector('.element__foto').src = this._foto;
    this._elementCard.querySelector('.element__foto').alt = `фото ${this._cardname}`;
    this._elementCard.querySelector('.element__name').textContent = this._name;
    this._like();
    this._delete();
    this._openImage();
    return this._elementCard;
  }
}