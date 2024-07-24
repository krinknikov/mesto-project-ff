export { openModal, closeModal};

// @todo: Открытие попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeByEscape);
}

// @todo: Закрытие попапа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeByEscape);
}

// @todo: Закрытие попапа на оверлей
function closeByEscape(evt) {
  if (evt.code === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}