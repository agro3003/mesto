import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popupImageName = this._popupSelector.querySelector('.popup__name');
    this._popupImageFoto = this._popupSelector.querySelector('.popup__foto');
  }
  open = (cardlink, cardname) => {
    this._popupImageFoto.src = cardname;
    this._popupImageFoto.alt = `фото ${cardname}`;
    this._popupImageName.textContent = cardlink;
    this._popupSelector.classList.add('popup_opened');
    super.setEventListener();
  }
}