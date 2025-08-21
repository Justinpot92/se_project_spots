// ----- IMPORTS -----
import "./index.css";
import {
  enableValidation,
  config,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

// ----- INITIAL CARDS -----
const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Throens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// ----- PROFILE ELEMENTS -----
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__save-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// ----- NEW POST ELEMENTS -----
const newPostBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostSaveBtn = newPostModal.querySelector(".modal__save-btn");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#image-link-input");
const captionInput = newPostModal.querySelector("#caption-input");

// ----- PREVIEW MODAL -----
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

// ----- CARDS -----
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// ----- GET CARD ELEMENT -----
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  // Like button
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  cardLikeBtnEl.addEventListener("click", () =>
    cardLikeBtnEl.classList.toggle("card__like-button_active")
  );

  // Delete button
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => cardElement.remove());

  // Preview modal on image click
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// ----- OPEN / CLOSE MODALS -----
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

// Close preview modal button
previewModalCloseBtn.addEventListener("click", () => closeModal(previewModal));

// Close modals by clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) closeModal(modal);
  });
});

// ----- EDIT PROFILE -----
editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, config);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  disableButton(editProfileSaveBtn, config);
  closeModal(editProfileModal);
});

// ----- NEW POST -----
newPostBtn.addEventListener("click", () => {
  newPostFormEl.reset();
  resetValidation(newPostFormEl, config);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));

newPostFormEl.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardElement = getCardElement({
    name: captionInput.value,
    link: linkInput.value,
  });
  cardsList.prepend(cardElement);
  disableButton(newPostSaveBtn, config);
  closeModal(newPostModal);
});

// ----- RENDER INITIAL CARDS -----
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

// ----- ENABLE VALIDATION -----
enableValidation(config);
