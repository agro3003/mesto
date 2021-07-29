export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClosePopup = this._popup.querySelector('.popup__button-close');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      console.log(evt.key);
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }


  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }



  setEventListeners() {
    this._buttonClosePopup.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    }
    );
  }
}