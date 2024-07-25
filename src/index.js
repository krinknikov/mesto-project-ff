import './pages/index.css'; // импорт стилей main

import {createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation, disableSubmitButton} from './components/validation.js';
import {getUserInfo, getUserCards, updateUserInfo, postAddCard, deleteCard, updateUserAvatar, putCardLike, deleteCardLike} from './components/api.js';


let userId;
// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const modalAvatar = document.querySelector('.popup_type_avatar');

// @todo: DOM узлы2
const popupContent = document.querySelectorAll('.popup__content');//убрать, не используется
const modals = document.querySelectorAll('.popup');
const modalWindowEdit = document.querySelector('.popup_type_edit');
const profileForm = modalWindowEdit.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const popupCard = document.querySelector('.popup_type_new-card');
const newPopupForm = popupCard.querySelector('.popup__form');
const nameCardElementInfo = newPopupForm.querySelector('.popup__input_type_card-name');
const linkCardElementInfo = newPopupForm.querySelector('.popup__input_type_url');
const modalWindowImage = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupCaptionImage = document.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const modalFormEditProfile = document.forms['edit-profile'];
const modalFormEditAvatar = document.forms['edit-avatar'];
const popupAlert = document.querySelector('.popup_type_alert');
const submitDeleteCard = popupAlert.querySelector('.popup__button-alert');

// @todo: кнопка сохранения 

const renderLoading = (isLoading, buttonElement) => { 
  if (isLoading) { 
    buttonElement.textContent = 'Сохранение...'; 
  } else { 
    buttonElement.textContent = 'Сохранение'; 
    disableSubmitButton(buttonElement, validationParams);//проверить!!!!
  }
};

// добавление новой карточки
newPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  postAddCard({
    name: nameCardElementInfo.value,
    link: linkCardElementInfo.value,
  })
    .then((cardElementInfo) => {
      const cardElement = createCard({
        userId, cardElementInfo, confirmDeleteCard, addLike, openModalImage,
      });
      cardsContainer.prepend(cardElement);
      newPopupForm.reset();
      closeModal(popupCard);
    })
    .catch((err) => {
      console.log('ошибка добавления карточки:', err);
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    });
});

// @todo: Функция лайка
const addLike = (evt, cardId, counterLikes) => {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteCardLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove('card__like-button_is-active');
        counterLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log('ошибка удаления лайка:', err);
      });
  } else {
    putCardLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add('card__like-button_is-active');
        counterLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log('ошибка добавления лайка:', err);
      });
  }
};

// @todo: Функция удаление карточки
const confirmDeleteCard = (cardId) => {
  openModal(popupAlert);
  popupAlert.dataset.cardId = cardId;
};

const handleConfirmDeleteCard = () => {
  deleteCard(popupAlert.dataset.cardId)
    .then((result) => {
      console.log(result);
      const deleteCard = document.getElementById(popupAlert.dataset.cardId);
      deleteCard.remove();
      closeModal(popupAlert);
    })
    .catch((err) => {
      console.log('ошибка удаления карточки:', err);
    });
};

// @todo: Функция открытие попапа изображения
const openModalImage = (inputName, inputLink) => {
  popupImg.src = inputLink;
  popupImg.alt = inputName;
  popupCaptionImage.textContent = inputName;
  openModal(modalWindowImage);
};

// @todo: Функция редактирование профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  updateUserInfo({
    name: modalFormEditProfile.name.value,
    about: modalFormEditProfile.description.value,
  })
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(modalWindowEdit);
    })
    .catch((err) => {
      console.log('ошибка изменения данных пользователя:', err);
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    });
});

// @todo: Функция обновления аватара
const handlerAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonElement = evt.submitter;
  renderLoading(true, buttonElement);
  updateUserAvatar({
    link: modalFormEditAvatar.link.value,
  })
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      closeModal(modalAvatar);
    })
    .catch((err) => {
      console.log('ошибка добавления аватара:', err);
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    });
};

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(modalWindowEdit);
  clearValidation(profileForm, validationParams);
});

addButton.addEventListener('click', () => {
  newPopupForm.reset();
  openModal(popupCard);
  clearValidation(newPopupForm, validationParams);
});

profileImage.addEventListener('click', () => {
  modalFormEditAvatar.reset();
  clearValidation(modalFormEditAvatar, validationParams);
  openModal(modalAvatar);
});

submitDeleteCard.addEventListener('click', handleConfirmDeleteCard);
modalFormEditAvatar.addEventListener('submit', handlerAvatarFormSubmit);

// @todo: Вывести карточки на страницу userinfo
Promise.all([getUserCards(), getUserInfo()])
  .then(([initialCards, userInfo]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;

    initialCards.forEach((cardElementInfo) => {
      const cardElement = createCard({
        userId, cardElementInfo, confirmDeleteCard, addLike, openModalImage,
      });
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.log('ошибка передачи карточки:', err);
  });

// @todo: Закрытие всех попапов по крестику и оверлею
modals.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup || evt.target.classList.contains('popup__close')) {
      const modals = document.querySelector('.popup_is-opened');
      closeModal(modals);
    }
  });
});

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorVisible: '.popup__error_visible',
  inputErrorVisible: '.popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationParams);
