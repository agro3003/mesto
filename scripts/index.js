let edit_button = document.querySelector('.profile__button-edit');
let profile_name = document.querySelector('.profile__name');
let profile_about = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let popup_close = popup.querySelector('.popup__button-close');
let popup_container = popup.querySelector('.popup__container');
let popup_name = popup.querySelector('.popup__name');
let popup_about = popup.querySelector('.popup__about');


function open_popup() {
  popup.classList.add('popup_opened');
  popup_name.value = profile_name.textContent;
  popup_about.value = profile_about.textContent;
}

edit_button.addEventListener('click', open_popup);

function close_popup() {
  popup.classList.remove('popup_opened');
}

popup_close.addEventListener('click', close_popup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profile_name.textContent = popup_name.value;
  profile_about.textContent = popup_about.value;
  close_popup();
}

popup_container.addEventListener('submit', formSubmitHandler);