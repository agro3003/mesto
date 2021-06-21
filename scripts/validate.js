const showInputError = (selectors, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

const hideInputError = (selectors, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (selectors, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(selectors, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
}

const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);


  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(selectors, formElement, inputElement);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
}

const enableValidation = (selectors) => {
  const formList = document.querySelectorAll(selectors.formSelector);
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    
    setEventListeners(form, selectors);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, selectors)
  } else {
    enableSubmitButton(buttonElement, selectors)
  }
}
function disableSubmitButton(buttonElement, selectors) {
  buttonElement.classList.add(selectors.inactiveButtonClass);
 buttonElement.disabled = true;
}
function enableSubmitButton(buttonElement, selectors) {
  buttonElement.classList.remove(selectors.inactiveButtonClass);
  buttonElement.disabled = false;
}

