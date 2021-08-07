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

const avatarApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/users/me/avatar',
  headers: {
    authorization: 'bcab2715-cc03-4ad0-bc80-4ad69d1d7f37',
    'Content-Type': 'application/json'
  }
});

const userapi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/users/me/',
  headers: {
    authorization: 'bcab2715-cc03-4ad0-bc80-4ad69d1d7f37',
    'Content-Type': 'application/json'
  }
});

const likeApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/cards/likes/',
  headers: {
    authorization: 'bcab2715-cc03-4ad0-bc80-4ad69d1d7f37',
    'Content-Type': 'application/json'
  }
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/cards/',
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
      popupDelete.close();
    })
}

const submitFormAvatar = (data) => {
  renderSaving(true);
  avatarApi.setAvatarInfo(data)
    .then((res) => {
      document.querySelector(profileAvatar).src = res.avatar;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderSaving(false);
      formAvatar.close();
    });
}

let myId; //не уверен, что нужно переносить в константы

userapi.getInitialInfo()
  .then((res) => {
    newUserInfo.setUserInfo({ info: res });
    myId = res._id;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


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
      newPopupWithForm.close();
    });
}

const submitFormEdit = (data) => {
  renderSaving(true);
  userapi.setUserInfo(data)
    .then((res) => {
      newUserInfo.setUserInfo({ info: res });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderSaving(false);
      popupEditNew.close();
    });
  newUserInfo.getUserInfo;
}

api.getInitialInfo()
  .then((res) => {
    const showInitialCards = new Section({
      items: res,
      renderer: (item) => {
        showInitialCards.addItem(createCard(item));
      }
    }, elements)
    showInitialCards.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


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
  const initialCard = new Card({ data: item }, '.element__template', popupImg.open, popupDelete.open, likeApi, myId);
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







