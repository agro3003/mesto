import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { avatarButton, popupAvatar, popupDel, editButton, addButton, popupAdd, popupEdit, elements, popupImage, enableValidation, profileName, profileAbout, profileAvatar } from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithDel from '../components/PopupWhithDel.js';

function renderSaving(isLoading) {
  const openedPopup = document.querySelector('.popup_opened');
  if (isLoading) {
    openedPopup.querySelector('.popup__button').textContent = 'Сохранение...';
  } else {
    openedPopup.querySelector('.popup__button').textContent = 'Сохранить';
  }
}


function renderDeleted(isLoading) {
  const openedPopup = document.querySelector('.popup_opened');
  if (isLoading) {
    openedPopup.querySelector('.popup__button').textContent = 'Удаление...';
  } else {
    openedPopup.querySelector('.popup__button').textContent = 'Да';
  }
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  headers: {
    authorization: 'bcab2715-cc03-4ad0-bc80-4ad69d1d7f37',
    'Content-Type': 'application/json'
  }
});


const delCallback = (data) => {
  renderDeleted(true);
  api.deleteCard(data).then((res) => {
    if (res.ok) {
      document.getElementById(`${data}`).remove();
      return res.json();
    }
    return Promise.reject(res.status);
  })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderDeleted(false);
      popupDelete.close(); // так же если перести, тогда работает некоректно
    })
}

const submitFormAvatar = (data) => {
  renderSaving(true);
  api.setAvatarInfo(data) 
    .then((res) => {
      document.querySelector(profileAvatar).src = res.avatar;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderSaving(false);
      formAvatar.close(); // так же если перести, тогда работает некоректно
    });
}


const submitFormAdd = (data) => {
  renderSaving(true)
  api.setCardInfo(data)
    .then((res) => {
      const showInitialCard = new Section({
        items: [res],
        renderer: (item) => { showInitialCard.addFirstItem(createCard(item)) }
      }, elements);
      showInitialCard.renderItems();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderSaving(false);
      newPopupWithForm.close(); // здесь перенести не могу из за возникающих ошибок
    });
}

const submitFormEdit = (data) => {
  renderSaving(true);
  api.setUserInfo(data) 
    .then((res) => {
      newUserInfo.setUserInfo({ info: res });
      popupEditNew.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderSaving(false);

    });
}
let myId; 

Promise.all([
  api.getInitialCards(),
  api.getInitialInfo()
  ]) .then(([initialCards, userInfo]) =>{
    {
      myId = userInfo._id;
      newUserInfo.setUserInfo({ info: userInfo });
      console.log(initialCards)
      const showInitialCards = new Section({
        items: initialCards,
        renderer: (item) => {
          showInitialCards.addItem(createCard(item));
        }
      }, elements)
      showInitialCards.renderItems();
    }
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })


const formAvatar = new PopupWithForm(popupAvatar, submitFormAvatar)
formAvatar.setEventListeners();

const popupDelete = new PopupWithDel(popupDel, delCallback);
popupDelete.setEventListeners();

const popupImg = new PopupWithImage(popupImage);
popupImg.setEventListeners();

const newPopupWithForm = new PopupWithForm(popupAdd, submitFormAdd)
newPopupWithForm.setEventListeners();

const newUserInfo = new UserInfo({ profileName, profileAbout, profileAvatar });

const popupEditNew = new PopupWithForm(popupEdit, submitFormEdit);
popupEditNew.setEventListeners();

const popupAddFormValidation = new FormValidator(enableValidation, document.querySelector(popupAdd))
popupAddFormValidation.enableValidation();

const popupEditFormValidation = new FormValidator(enableValidation, document.querySelector(popupEdit))
popupEditFormValidation.enableValidation();

const popupAvatarFormValidation = new FormValidator(enableValidation, document.querySelector(popupAvatar))
popupAvatarFormValidation.enableValidation();

function createCard(item) {
  const initialCard = new Card({ data: item }, '.element__template', popupImg.open, popupDelete.open, api, myId);
  return initialCard.createCard();
}


avatarButton.addEventListener(('click'), () => {
  formAvatar.open();
});

addButton.addEventListener('click', () => {
  popupAddFormValidation.disableSubmitButton();
  newPopupWithForm.open();
});

editButton.addEventListener('click', () => {
  popupEditNew.open();
  const getInfo = newUserInfo.getUserInfo();
  popupEditNew.giveInputValue({ info: getInfo });
});







