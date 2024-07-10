export {openModal, closeModal};
import {modalWindowEdit, modalWindowCard, modalWindowImage} from '../index.js';

function openModal(element) {
  element.classList.add('popup_is-opened');
  element.classList.add('popup_is-animated');
  document.body.style.overflow = 'hidden';
}

function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    closeModal(modalWindowEdit);
    closeModal(modalWindowCard);
    closeModal(modalWindowImage);
  }
});

document.addEventListener('click', (evt) => {
  if (
    evt.target === modalWindowEdit || //or!!!!!!!!!!
    evt.target === modalWindowCard ||
    evt.target === modalWindowImage
  ) {
    closeModal(modalWindowEdit);
    closeModal(modalWindowCard);
    closeModal(modalWindowImage);
  }
});
