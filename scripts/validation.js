const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgId = inputEl.id + "-error";
  const errorMsgEl = document.querySelector("#" + errorMsgId);
  errorMsgEl.textContent = errorMsg;
};

const checkInputValidity = (formEl, inputEl) => {
  console.log();
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__save-btn");

  // toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      // toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
