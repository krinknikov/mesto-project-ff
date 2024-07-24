export {getUserInfo, getUserCards, updateUserInfo, updateUserAvatar, postAddCard, deleteCard, putCardLike, deleteCardLike};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: '3287f975-8c11-4d03-b1cb-91ae6a2076d2',
    'Content-Type': 'application/json',
  },
};
//проверить
const getRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};



// get-запрос. информация о юзере
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getRes);
};
// get-запрос. вывод карточек
const getUserCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getRes);
};



// patch-запрос. редактирование карточки
const updateUserInfo = (userInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about,
    }),
  }).then(getRes);
};
// patch-запрос. обновления аватарки
const updateUserAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link.link,
    }),
  }).then(getRes);
};



// post-запрос. добавление новой карточки
const postAddCard = (cardElementInfo) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardElementInfo),
  }).then(getRes);
};



// delete-запрос. удаление карточки
const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(getRes);
};
// delete-запрос. удаление лайка
const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(getRes);
};



// put-запрос. добавление лайков
const putCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(getRes);
};