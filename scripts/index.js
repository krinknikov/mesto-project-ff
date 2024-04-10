// @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
    const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
    function cardCreate(input, cardDeleteCallback) {
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImage = cardElement.querySelector('.card__image');
        const cardText = cardElement.querySelector('.card__title');  
        cardImage.src = input.link;
        cardImage.alt = input.name;
        cardText.textContent = input.name; 
        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => {
            cardDeleteCallback(cardElement);
        });

        return cardElement;
    }

// @todo: Функция удаления карточки
    function deleteCard(cardElement) {
        cardElement.remove();
    }

// @todo: Вывести карточки на страницу
    initialCards.forEach(input => {
        const cardElement = cardCreate (input, deleteCard);
        cardList.append(cardElement);
    });
