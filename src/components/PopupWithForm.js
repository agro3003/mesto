import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._submitFormCallback = submitFormCallback;
  }
  _getInputValues = () => {
    this._inputSelector = this._popupSelector.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputSelector.forEach((item) => {

      this._inputValues[item.name] = item.value;

    })
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListener();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      console.log(this._inputValues);
      this.close();
      return this._getInputValues();
    });
  }

  close() {
    this._popupSelector.querySelector('.popup__form').reset();
    super.close();

  }



}