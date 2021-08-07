import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._inputSelector = this._popup.querySelectorAll('.popup__input');
    this._resetForm = this._popup.querySelector('.popup__form');
    this._buttonSubmit - this._popup.querySelector('.popup__button')
  }
  _getInputValues = () => {
    this._inputValues = {};
    this._inputSelector.forEach((item) => {
      this._inputValues[item.name] = item.value;
    })
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
    });
  }

  close() {
    this._resetForm.reset();
    super.close();
  }
  giveInputValue = ({ info }) => {
    this._inputSelector.forEach((item) => {
      item.value = info[item.name];
    });
  }
}