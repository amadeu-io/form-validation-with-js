// add error message functions

function removeAllErrors() {
  const allErrors = document.querySelectorAll("span");
  allErrors.forEach((error) => {
    error.classList.remove("show-error");
  });
}

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Please, enter an email adress.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  }

  emailError.classList.add("show-error");
}

function showCountryError() {
  countryError.textContent = "Please, select a country.";
  countryError.classList.add("show-error");
}

function showZipcodeError() {
  if (zipcode.validity.valueMissing) {
    zipcodeError.textContent = "Plase, enter a Zip code";
  } else if (!validateZipcode(zipcode.value)) {
    zipcodeError.textContent = "Expected format: 90684 or 90684-4903";
  }

  zipcodeError.classList.add("show-error");
}

function addPasswordError() {
  passwordError.textContent =
    "Password must be between 8 and 30 characters long and contain one uppercase letter, one symbol, and a number.";
}

function addConfirmPasswordError() {
  confirmPasswordError.textContent = "Passwords do not match.";
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

function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function validateZipcode(zipcode) {
  const regex = /^\d{5}(-\d{4})?$/;
  return regex.test(zipcode);
}

// program starts here

const form = document.querySelector("form");

const email = document.getElementById("email");
const country = document.getElementById("country");
const password = document.getElementById("password");
const zipcode = document.getElementById("zipcode");
const confirmPassword = document.getElementById("confirm-password");

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
  removeAllErrors();

  // show email error
  if (!email.validity.valid) showEmailError();

  // show country error
  if (country.value === "") showCountryError();

  // show zipcode error
  if (!validateZipcode(zipcode.value)) showZipcodeError();

  // show password error
  if (!validatePassword(password.value)) addPasswordError();
  passwordError.classList.toggle(
    "show-error",
    !validatePassword(password.value)
  );

  // show password confirmation error
  if (
    validatePassword(password.value) &&
    !validateConfirmPassword(password.value, confirmPassword.value)
  ) {
    addConfirmPasswordError();
  }
  confirmPasswordError.classList.toggle(
    "show-error",
    !validateConfirmPassword(password.value, confirmPassword.value)
  );
});
