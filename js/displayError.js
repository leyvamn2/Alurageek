// displayError.js
import { typeError, messages } from "./errorMsg.js";

const formfields = [...document.querySelectorAll("[required]")];
const submitButton = document.querySelector(".button__send");

formfields.forEach((field) => {
  field.addEventListener("blur", () => verifyField(field));
  field.addEventListener("invalid", (e) => e.preventDefault());
});

function verifyField(field) {
  let message = "";
  field.setCustomValidity("");

  typeError.forEach((error) => {
    if (field.validity[error]) {
      message = messages[field.name][error];
    }
  });

  const errorMessage = field.parentNode.querySelector(".mensaje-error");
  const inputValid = field.checkValidity();

  if (!inputValid) {
    errorMessage.textContent = message;
    submitButton.setAttribute('disabled', '');
  } else {
    errorMessage.textContent = "";
    submitButton.removeAttribute('disabled');
  }

  checkAllFields();
}

export default function checkAllFields() {
  let allValid = true;

  formfields.forEach((field) => {
    if (!field.checkValidity()) {
      allValid = false;
    }
  });

  if (allValid) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', '');
  }
}
