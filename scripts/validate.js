const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
  console.log(errorElement)
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');


  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const popupForm = formElement.querySelector('.popup__form');

    setEventListeners(popupForm);
  });
}

enableValidation();
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.removeAttribute('disabled', 'disabled')
  }
}
