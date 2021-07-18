import { FormValidator, enableValidation } from './FormValidator.js';
import { Card } from './Card.js';

const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddClose = popupAdd.querySelector('.popup__button-close');
const popupAddSave = popupAdd.querySelector('.popup__button');
const popupAddContainer = popupAdd.querySelector('.popup__container');
const popupAddName = popupAdd.querySelector('.popup__input_type_name');
const popupAddAbout = popupAdd.querySelector('.popup__input_type_about');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditClose = popupEdit.querySelector('.popup__button-close');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const popupEditName = popupEdit.querySelector('.popup__input_type_name');
const popupEditAbout = popupEdit.querySelector('.popup__input_type_about');
const elements = document.querySelector('.elements');
const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = popupImage.querySelector('.popup__button-close');


function showInitialCards(arr) {
  arr.forEach((card) => {
    const ArrInitialCards = new Card(card.link, card.name, '.element__template', openImagePopup);
    elements.append(ArrInitialCards.createCard());
  });
}
showInitialCards(initialCards);

function initialCardAddElelmen(evt) {
  evt.preventDefault();
  const AddInitialCard = new Card(popupAddAbout.value, popupAddName.value, '.element__template', openImagePopup)
  elements.prepend(AddInitialCard.createCard());
  closePopupAdd();
  popupAddAbout.value = '';
  popupAddName.value = '';
}

popupAddContainer.addEventListener('submit', initialCardAddElelmen);

function formSubmitHandlerEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileAbout.textContent = popupEditAbout.value;
  closePopupEdit();
}

popupEditContainer.addEventListener('submit', formSubmitHandlerEditProfile);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function openPropfilePopup() {
  popupEditName.value = profileName.textContent;
  popupEditAbout.value = profileAbout.textContent;
  openPopup(popupEdit);
}

const popupImageName = popupImage.querySelector('.popup__name');
const popupImageFoto = popupImage.querySelector('.popup__foto');

function openImagePopup(cardlink, cardname) {
  popupImageFoto.src = cardname;
  popupImageFoto.alt = `фото ${cardname}`;
  popupImageName.textContent = cardlink;
  openPopup(popupImage);
}

function openAddPopup() {
  popupAddSave.classList.add('popup__button_disabled');
  popupAddSave.setAttribute('disabled', 'disabled');
  openPopup(popupAdd);
}


addButton.addEventListener('click', openAddPopup);
editButton.addEventListener('click', openPropfilePopup);

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function closePopupImage() {
  closePopup(popupImage);
};

function closePopupEdit() {
  closePopup(popupEdit);
};

popupImageClose.addEventListener('click', closePopupImage);
popupAddClose.addEventListener('click', closePopupAdd);
popupEditClose.addEventListener('click', closePopupEdit);

const popups = document.querySelectorAll('.popup');

popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item)
    }
  });
});

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const popupAddFormValidation = new FormValidator (enableValidation, popupAdd)
popupAddFormValidation.enableValidation();

const popupEditFormValidation = new FormValidator (enableValidation, popupEdit)
popupEditFormValidation.enableValidation();
