// cleanInputs.js
import checkAllFields from "./displayError.js";

const inputs = [...document.querySelectorAll('input')];

export default function cleanInputs() {
  inputs.forEach(input => input.value = '');
  checkAllFields();
}
