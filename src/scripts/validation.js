// CONFIG
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_error",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__error",
};

// SHOW INPUT ERROR
const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (errorMsgEl) {
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(config.inputErrorClass);
  }
};

// HIDE INPUT ERROR
const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (errorMsgEl) {
    errorMsgEl.textContent = "";
    inputEl.classList.remove(config.inputErrorClass);
  }
};

// CHECK INPUT VALIDITY
const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

// HAS INVALID INPUT
const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
};

// TOGGLE BUTTON STATE
const toggleButtonState = (inputList, buttonEl, config) => {
  if (!buttonEl) return;
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

// DISABLE BUTTON
export const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};

// RESET VALIDATION
export const resetValidation = (formEl, config) => {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  inputList.forEach((input) => hideInputError(formEl, input, config));

  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  if (buttonEl) disableButton(buttonEl, config);
};

// SET EVENT LISTENERS
const setEventListeners = (formEl, config) => {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

// ENABLE VALIDATION
export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => setEventListeners(formEl, config));
};
