export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._buttonClosePopup = this._popupSelector.querySelector('.popup__button-close');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      console.log(evt.key);
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListener();
  }


  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }



  setEventListener() {
    document.addEventListener('keydown', this._handleEscClose);
    this._buttonClosePopup.addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    }
    );
  }
}