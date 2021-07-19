export class Card {
  constructor (foto, name, selector, openImagePopup) {
    this._foto = foto;
    this._name = name;
    this._selector = selector;
    this._openImagePopup = openImagePopup;
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
    this._element.querySelector('.element__foto').src = this._foto;
    this._element.querySelector('.element__foto').alt = `фото ${this._cardname}`;
    this._element.querySelector('.element__name').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  
  _setEventListeners() {
    this._element.querySelector(".element__heart").addEventListener('click', (evt) => {
     evt.target.classList.toggle('element__heart_active');
    });

    this._element.querySelector('.element__delete').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
    });

    this._element.querySelector('.element__foto').addEventListener('click', () => this._openImagePopup(this._name, this._foto));
  }
}