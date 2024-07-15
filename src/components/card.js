export {createCard, deleteCard, addLike};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(initialCards, deleteCard, addLike, openModalImage) {
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = initialCards.name;
  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', addLike);
  cardImage.addEventListener('click', () => {
    openModalImage(initialCards.name, initialCards.link);
  });
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const deleteCard = evt.target.closest('.places__item');
  deleteCard.remove();
}

// @todo: Функция лайка
function addLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
