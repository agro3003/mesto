const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddClose = popupAdd.querySelector('.popup__button-close');
const popupAddContainer = popupAdd.querySelector('.popup__container');
const popupAddName = popupAdd.querySelector('.popup__input_type_name');
const popupAddAbout = popupAdd.querySelector('.popup__input_type_about');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditClose = popupEdit.querySelector('.popup__button-close');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const popupEditName = popupEdit.querySelector('.popup__input_type_name');
const popupEditAbout = popupEdit.querySelector('.popup__input_type_about');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element__template').content;
const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = popupImage.querySelector('.popup__button-close');

function createCard(cardlink, cardname) {
  const elementCard = elementTemplate.cloneNode(true);
  elementCard.querySelector('.element__foto').src = cardlink;
  elementCard.querySelector('.element__foto').alt = `фото ${cardname}`;
  elementCard.querySelector('.element__name').textContent = cardname;

  elementCard.querySelector(".element__heart").addEventListener('click', (like) => {
    like.target.classList.toggle('element__heart_active');
  });
  elementCard.querySelector('.element__delete').addEventListener('click', function (del) {
    del.target.closest('.element').remove();
  });
  elementCard.querySelector('.element__foto').addEventListener('click', openImagePopup);

  return elementCard;
}

function showInitialCards() {
  initialCards.forEach((card)=> {
    elements.append(createCard(card.link, card.name));
  });
}
showInitialCards();

function initialCardAddElelmen(evt) {
  evt.preventDefault();
  elements.prepend(createCard(popupAddAbout.value, popupAddName.value));
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
}

function openPropfilePopup() {
  popupEditName.value = profileName.textContent;
  popupEditAbout.value = profileAbout.textContent;
  openPopup(popupEdit);
}

function openImagePopup(evt) {
  popupImage.querySelector('.popup__foto').src = evt.target.closest('.element__foto').src;
  popupImage.querySelector('.popup__foto').alt = evt.target.closest('.element__foto').src;
  popupImage.querySelector('.popup__name').textContent = evt.target.closest('.element__foto').alt.slice(5);
  openPopup(popupImage);
}

function openAddPopup() {
  openPopup(popupAdd);
}

addButton.addEventListener('click', openAddPopup);
editButton.addEventListener('click', openPropfilePopup);

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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