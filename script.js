// add error message functions

function addEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Please, enter an email adress.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  }
}

function addCountryError() {
  countryError.textContent = "Please, enter a country";
}

function addPasswordError() {
  passwordError.textContent =
    "Password must be between 8 and 30 characters long and contain one uppercase letter, one symbol, and a number";
}

// returns true or false if password is valid or not

function validatePassword(password) {
  // Define regular expressions for each criteria
  const lengthRegex = /^.{8,30}$/;
  const uppercaseRegex = /[A-Z]/;
  const symbolRegex = /[\W_]/;
  const numberRegex = /[0-9]/;

  // Check each criteria using the regular expressions
  const isLengthValid = lengthRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasSymbol = symbolRegex.test(password);
  const hasNumber = numberRegex.test(password);

  // Return true if all criteria are met, otherwise false
  return isLengthValid && hasUppercase && hasSymbol && hasNumber;
}

// program starts here

const form = document.querySelector("form");
const email = document.getElementById("email");

const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const zipcodeInput = document.getElementById("zipcode");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const emailError = document.querySelector(".email-error");
const countryError = document.querySelector(".country-error");
const passwordError = document.querySelector(".password-error");
const zipcodeError = document.querySelector(".zipcode-error");
const confirmPasswordError = document.querySelector(".confirm-password-error");

const countrySelect = document.querySelector("select");

// make country dropdown text black on focus

countrySelect.addEventListener("focus", () => {
  countrySelect.classList.remove("gray-out");
});

// show the adequate errors on submit

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // show email error
  if (!email.validity.valid) addEmailError();
  emailError.classList.toggle("show", !email.validity.valid);

  // show country error
  if (countryInput.value === "") addCountryError();
  countryError.classList.toggle("show", countryInput.value === "");

  // show password error
  if (!validatePassword(password.value)) addPasswordError();
  passwordError.classList.toggle("show", !validatePassword(password.value));
});
