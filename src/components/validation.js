export { enableValidation, clearValidation, disableSubmitButton };

// @todo: отобразитт ошибки
const showInputError = (formElement, inputElement, errorMessage, validationParams) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParams.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParams.errorClass);
};

// спрятать ошибки
const hideInputError = (formElement, inputElement, validationParams) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParams.inputErrorClass);
  errorElement.classList.remove(validationParams.errorClass);
  errorElement.textContent = '';
};

// валидация
const checkInputValidity = (formElement, inputElement, validationParams) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationParams);
  } else {
    hideInputError(formElement, inputElement, validationParams);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonStatus = (inputList, buttonElement, validationParams) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationParams.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validationParams.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', false);
  }
};

const setEventListeners = (formElement, validationParams) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationParams.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationParams.submitButtonSelector
  );
  toggleButtonStatus(inputList, buttonElement, validationParams);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationParams);
      toggleButtonStatus(inputList, buttonElement, validationParams);
    });
  });
};

const enableValidation = (validationParams) => {
  const inputForm = Array.from(
    document.querySelectorAll(validationParams.formSelector)
  );
  inputForm.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationParams);
  });
};

// @todo: Очистка валидации
const clearValidation = (formElement, validationParams) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationParams.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationParams.submitButtonSelector
  );

  inputList.textContent = '';

  toggleButtonStatus(inputList, buttonElement,validationParams.inactiveButtonClass);
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationParams.inputErrorClass,validationParams.errorClass);
    inputElement.setCustomValidity('');
  });
};

const disableSubmitButton = (buttonElement, validationParams) => {
  buttonElement.classList.add(validationParams.inactiveButtonClass); 
  buttonElement.setAttribute('disabled', true);
};