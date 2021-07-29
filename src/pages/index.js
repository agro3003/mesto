import './index.css';
import { initialCards } from '../utils/initial-cards.js'
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { editButton, addButton, popupAdd, popupEdit, elements, popupImage, enableValidation, profileName, profileAbout } from '../utils/constants.js'


const popupImg = new PopupWithImage(popupImage);
popupImg.setEventListeners();

function createCard(item) {
  const initialCard = new Card({ data: item }, '.element__template', popupImg.open);
  return initialCard.createCard();
}

const showInitialCards = new Section({
  items: initialCards,
  renderer: (item) => {
    showInitialCards.addItem(createCard(item));
  }
}, elements)
showInitialCards.renderItems();


const submitFormAdd = (data) => {
  showInitialCards.addFirstItem(createCard(data));
}

const newPopupWithForm = new PopupWithForm(popupAdd, submitFormAdd)
newPopupWithForm.setEventListeners();



const newUserInfo = new UserInfo({ profileName, profileAbout });
const submitFormEdit = (data) => {
  newUserInfo.setUserInfo({ info: data });
  newUserInfo.getUserInfo;
}

const popupEditNew = new PopupWithForm(popupEdit, submitFormEdit);
popupEditNew.setEventListeners();


addButton.addEventListener('click', () => {
  popupAddFormValidation.disableSubmitButton();
  newPopupWithForm.open();
});
editButton.addEventListener('click', () => {
  popupEditNew.open();
  const getInfo = newUserInfo.getUserInfo();
  popupEditNew.giveInputValue({ info: getInfo });

});



const popupAddFormValidation = new FormValidator(enableValidation, document.querySelector(popupAdd))
popupAddFormValidation.enableValidation();

const popupEditFormValidation = new FormValidator(enableValidation, document.querySelector(popupEdit))
popupEditFormValidation.enableValidation();
//import './pages/index.css';