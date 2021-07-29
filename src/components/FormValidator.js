export class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._formList = document.querySelectorAll(this._selectors.formSelector);
  }

  enableValidation = () => {
    this._formList.forEach((form) => {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      this._setEventListeners(form);
    });
  }
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors.errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners = () => {

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton(this._buttonElement)
    } else {
      this._enableSubmitButton(this._buttonElement)
    }
  }

  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

}

