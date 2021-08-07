import Popup from './Popup.js'

export default class PopupWithDel extends Popup {
  constructor(popupSelector, delCallback) {
    super(popupSelector);
    this._popupDelButton = this._popup.querySelector('.popup__button');
    this._delCallback = delCallback;
  }
  open = (cardId) => {
    this._cardId = cardId;
    super.open();
  }

  getId = () => {
    return this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupDelButton.addEventListener('click', () => {
      this._delCallback(this.getId());
    });
  }
}