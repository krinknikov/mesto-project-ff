export {openModal, closeModal};

function openModal(element) {
  element.classList.add('popup_is-opened');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeByEscape);
}

function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeByEscape);
}
//закрытие на esc
function closeByEscape(evt) {
  if (evt.code === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}

