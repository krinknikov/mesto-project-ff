
export {createCard, cardTemplate};

// @todo: Темплейт карточки
 const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
const createCard = ({userId, cardElementInfo, confirmDeleteCard, addLike, openModalImage}) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardCounterLike = cardElement.querySelector('.card__counter-like');
  cardElement.id = cardElementInfo['_id'];
  cardElement.querySelector('.card__title').textContent = cardElementInfo.name;
  cardImage.src = cardElementInfo.link;
  cardImage.alt = cardElementInfo.name;
  cardCounterLike.textContent = cardElementInfo.likes.length;
  const liked = cardElementInfo.likes.some((like) => like._id === userId);
  if (liked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  if (cardElementInfo.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => {
      confirmDeleteCard(cardElementInfo._id);
    });
  } else {
    deleteButton.remove();
  }
  likeButton.addEventListener('click', (evt) => {
    addLike(evt, cardElementInfo._id, cardCounterLike);
  });
  cardImage.addEventListener('click', () => {
    openModalImage(cardElementInfo.name, cardElementInfo.link);
  });
  return cardElement;
};

