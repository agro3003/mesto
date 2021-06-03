const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__add-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupAdd = document.querySelector('.popup_type_add');
let popupAddClose = popupAdd.querySelector('.popup__button-close');
let popupAddContainer = popupAdd.querySelector('.popup__container');
let popupAddName = popupAdd.querySelector('.popup__input_type_name');
let popupAddAbout = popupAdd.querySelector('.popup__input_type_about');
let popupEdit = document.querySelector('.popup_type_edit');
let popupEditClose = popupEdit.querySelector('.popup__button-close');
let popupEditContainer = popupEdit.querySelector('.popup__container');
let popupEditName = popupEdit.querySelector('.popup__input_type_name');
let popupEditAbout = popupEdit.querySelector('.popup__input_type_about');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element__template').content;

function arr() {
  initialCards.forEach(function (card) {
    const elementCard = elementTemplate.cloneNode(true);
    elementCard.querySelector('.element__foto').src = card.link;
    elementCard.querySelector('.element__foto').alt = `фото ${card.name}`;
    elementCard.querySelector('.element__name').textContent = card.name;
    elementCard.querySelector(".element__heart").addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__heart_active');
    });
    elementCard.querySelector('.element__delete').addEventListener('click', function (del) {
      del.target.closest('.element').remove();
    });
    elements.append(elementCard);
  });

}

arr();

function initialCardAddElelmen(evt) {
  evt.preventDefault();
  const elementCard = elementTemplate.cloneNode(true);
  elementCard.querySelector('.element__foto').src = popupAddAbout.value;
  elementCard.querySelector('.element__foto').alt = `фото ${popupAddName.value}`;
  elementCard.querySelector('.element__name').textContent = popupAddName.value;
  elementCard.querySelector(".element__heart").addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });
  elementCard.querySelector('.element__delete').addEventListener('click', function (del) {
    del.target.closest('.element').remove();
  });
  elements.prepend(elementCard);
  closePopupAdd();
}

popupAddContainer.addEventListener('submit', initialCardAddElelmen);

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  popupEditName.value = profileName.textContent;
  popupEditAbout.value = profileAbout.textContent;
}

editButton.addEventListener('click', openPopupEdit);

function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

popupEditClose.addEventListener('click', closePopupEdit);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileAbout.textContent = popupEditAbout.value;
  closePopupEdit();
}

popupEditContainer.addEventListener('submit', formSubmitHandler);

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}
addButton.addEventListener('click', openPopupAdd);

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

popupAddClose.addEventListener('click', closePopupAdd);

const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = popupImage.querySelector('.popup__button-close');

document.querySelectorAll('.element__foto').forEach((evt) => {
  evt.addEventListener('click', function () {
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__foto').src = evt.src;
    popupImage.querySelector('.popup__foto').alt = evt.alt;
    popupImage.querySelector('.popup__name').textContent = evt.alt.slice(5);
  }
  );
});

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
};

popupImageClose.addEventListener('click', closePopupImage);