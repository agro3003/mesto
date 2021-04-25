let editButton = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__button-close');
let popupContainer = popup.querySelector('.popup__container');
let popupName = popup.querySelector('.popup__name');
let popupAbout = popup.querySelector('.popup__about');


function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup();
}

popupContainer.addEventListener('submit', formSubmitHandler);