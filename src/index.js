import './pages/index.css'; // импорт стилей main

import {initialCards} from './components/cards.js';

import {createCard,deleteCard,addlLike } from './components/card.js';

import {openModal, closeModal} from './components/modal.js';

export {cardTemplate, modalWindowEdit, openModalImage, modalWindowCard, modalWindowImage, formNewElementAdd
};


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');

// @todo: DOM узлы2
const profileTitle = document.querySelector('.profile__title');
const profilelDescription = document.querySelector('.profile__description');
const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowCard = document.querySelector('.popup_type_new-card');
const modalWindowImage = document.querySelector('.popup_type_image');
const modalProfileEditButton = document.querySelector('.profile__edit-button');
const openModalAddButton = document.querySelector('.profile__add-button');
const closeModalButtons = document.querySelectorAll('.popup__close');
const formNewElementAdd = modalWindowCard.querySelector('.popup__form');
const formElement = modalWindowEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// @todo: Вывести карточки на страницу
  initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard);
  cardsContainer.append(cardElement);
});

// @todo: модалка
  modalProfileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profilelDescription.textContent;
  openModal(modalWindowEdit);
});

openModalAddButton.addEventListener('click', () => {
  openModal(modalWindowCard);
});

for (let closeModalButton of closeModalButtons) {
  closeModalButton.addEventListener('click', () => {
    closeModal(modalWindowEdit);
    closeModal(modalWindowCard);
    closeModal(modalWindowImage);
  });
}

function editFormProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profilelDescription.textContent = jobInput.value;
  closeModal(modalWindowEdit);
}

function addNewCard(evt) {
  evt.preventDefault();

  const name = formNewElementAdd.querySelector('.popup__input_type_card-name');
  const link = formNewElementAdd.querySelector('.popup__input_type_url');
  const cardElement = createCard(
    {
      name: name.value,
      link: link.value,
    },
    deleteCard,
    addlLike
  );

  cardsContainer.prepend(cardElement);
  formNewElementAdd.reset();
  closeModal(modalWindowCard);
}

function openModalImage(inputName, inputLink) {
  openModal(modalWindowImage);
  const popupImage = document.querySelector('.popup__image');
  const signPopupCaption = document.querySelector('.popup__caption');
  popupImage.src = inputLink;
  popupImage.alt = inputName;
  signPopupCaption.textContent = inputName;
}

formElement.addEventListener('submit', editFormProfile);
formNewElementAdd.addEventListener('submit', addNewCard);
