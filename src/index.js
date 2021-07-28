import './pages/index.css';
import { initialCards } from './utils/initial-cards.js'
import { FormValidator, enableValidation } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import { editButton, addButton, popupAdd, popupEdit, elements, popupImage } from './utils/constants.js'


const popupImg = new PopupWithImage(popupImage);


const showInitialCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const initialCard = new Card({ data: item }, '.element__template', popupImg.open);
    const createInitialCard = initialCard.createCard();
    showInitialCards.addItem(createInitialCard);
  }
}, elements)
showInitialCards.renderItems();


const submitFormAdd = (data) => {
  const card = new Card({ data }, '.element__template', popupImg.open)
  const createInitialCard = card.createCard();
  showInitialCards.addItem(createInitialCard);
}

const newPopupWithForm = new PopupWithForm(popupAdd, submitFormAdd)
newPopupWithForm.setEventListeners();


const submitFormEdit = (data) => {
  const newUserInfo = new UserInfo(data);
  newUserInfo.setUserInfo();
}

const popupEditNew = new PopupWithForm(popupEdit, submitFormEdit);
popupEditNew.setEventListeners();




addButton.addEventListener('click', () => newPopupWithForm.open());
editButton.addEventListener('click', () => {
  new UserInfo(submitFormEdit).getUserInfo(popupEdit);
  popupEditNew.open();
}
);



const popupAddFormValidation = new FormValidator(enableValidation, popupAdd)
popupAddFormValidation.enableValidation();

const popupEditFormValidation = new FormValidator(enableValidation, popupEdit)
popupEditFormValidation.enableValidation();
