import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageName = this._popup.querySelector('.popup__name');
    this._popupImageFoto = this._popup.querySelector('.popup__foto');
  }
  open = (cardlink, cardname) => {
    this._popupImageFoto.src = cardname;
    this._popupImageFoto.alt = `фото ${cardname}`;
    this._popupImageName.textContent = cardlink;
    super.open();
  }
}