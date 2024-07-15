import './pages/index.css'; // импорт стилей main
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, addLike} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';



// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// @todo: DOM узлы2
const popupContent = document.querySelectorAll('.popup__content');
const modalWindowEdit = document.querySelector('.popup_type_edit');
const formElementEdit = modalWindowEdit.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');
const modalWindowCard = document.querySelector('.popup_type_new-card');
const formNewElementAdd = modalWindowCard.querySelector('.popup__form');
const nameInputCard = formNewElementAdd.querySelector('.popup__input_type_card-name');
const linkInputCard = formNewElementAdd.querySelector('.popup__input_type_url');
const modalWindowImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const signPopupCaptionImg = document.querySelector('.popup__caption');
const modalProfileEditButton = document.querySelector('.profile__edit-button');
const openModalAddButton = document.querySelector('.profile__add-button');

// @todo: Вывести карточки на страницу
initialCards.forEach((initialCards) => {
  const cardElement = createCard(initialCards, deleteCard, addLike, openModalImage);
  cardsContainer.append(cardElement);
});

// @todo: модалка
modalProfileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(modalWindowEdit);
});

openModalAddButton.addEventListener('click', () => {
  openModal(modalWindowCard);
});

popupContent.forEach((element) => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      const modal = document.querySelector('.popup_is-opened');
      closeModal(modal);
    }
  });
});

// закрытие на оверлей
document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup')) {
    closeModal(evt.target);
}
});

function editFormProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(modalWindowEdit);
}

function addNewCard(evt) {
  evt.preventDefault();
  const cardElement = createCard(
    {
      name: nameInputCard.value,
      link: linkInputCard.value,
    }, deleteCard, addLike, openModalImage
  );

  cardsContainer.prepend(cardElement);
  formNewElementAdd.reset();
  closeModal(modalWindowCard);
}

function openModalImage(inputName, inputLink) {
  popupImage.src = inputLink;
  popupImage.alt = inputName;
  signPopupCaptionImg.textContent = inputName;
  openModal(modalWindowImage);
}

formElementEdit.addEventListener('submit', editFormProfile);
formNewElementAdd.addEventListener('submit', addNewCard);
