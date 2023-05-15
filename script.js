// remove all error messages
function removeAllErrors() {
  const allErrors = document.querySelectorAll("span");
  allErrors.forEach((error) => {
    error.classList.remove("show-error");
  });
}

// show error functions

// show email error
function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Please, enter an email adress.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  }

  emailError.classList.add("show-error");
}

// show country error
function showCountryError() {
  countryError.textContent = "Please, select a country.";
  countryError.classList.add("show-error");
}

// show zipcode error
function showZipcodeError() {
  if (zipcode.validity.valueMissing) {
    zipcodeError.textContent = "Plase, enter a zip code.";
  } else if (!validateZipcode(zipcode.value)) {
    zipcodeError.textContent = "Expected format: 90684 or 90684-4903";
  }

  zipcodeError.classList.add("show-error");
}

// show password error
function showPasswordError() {
  passwordError.textContent = `Password must be between 8 and 30 characters long 
  and contain one uppercase letter, one symbol, and a number.`;

  passwordError.classList.add("show-error");
}

// show confirm password error
function showConfirmPasswordError() {
  confirmPasswordError.textContent = "Passwords do not match.";
  confirmPasswordError.classList.add("show-error");
}

// validate input functions

// returns true or false based on zipcode validity
function validateZipcode(zipcode) {
  const regex = /^\d{5}(-\d{4})?$/;
  return regex.test(zipcode);
}

// returns true or false based on password validity
function validatePassword(password) {
  // define regular expressions for each criteria
  const lengthRegex = /^.{8,30}$/;
  const uppercaseRegex = /[A-Z]/;
  const symbolRegex = /[\W_]/;
  const numberRegex = /[0-9]/;

  // check each criteria using the regular expressions
  const isLengthValid = lengthRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasSymbol = symbolRegex.test(password);
  const hasNumber = numberRegex.test(password);

  // return true if all criteria are met, otherwise false
  return isLengthValid && hasUppercase && hasSymbol && hasNumber;
}

// returns true or false based on confirm password validity
function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
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

// show errors on submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // remove all errors
  removeAllErrors();

  // find if inputs are valid or invalid
  let emailValidity = email.validity.valid;
  let countryValidity = !(country.value === "");
  let zipcodeValidity = validateZipcode(zipcode.value);
  let passwordValidity = validatePassword(password.value);
  // show confirm password error only when password is true and confirm is false
  let whenToShowConfPassErr =
    validatePassword(password.value) &&
    !validateConfirmPassword(password.value, confirmPassword.value);

  // call adeqate error functions if invalid
  if (!emailValidity) showEmailError();
  if (!countryValidity) showCountryError();
  if (!zipcodeValidity) showZipcodeError();
  if (!passwordValidity) showPasswordError();
  if (whenToShowConfPassErr) showConfirmPasswordError();
});

// show errors on blur

email.addEventListener("blur", () => {
  removeAllErrors();
  let emailValidity = email.validity.valid;
  if (!emailValidity) showEmailError();
});

country.addEventListener("blur", () => {
  removeAllErrors();
  let countryValidity = !(country.value === "");
  if (!countryValidity) showCountryError();
});

password.addEventListener("blur", () => {
  removeAllErrors();
  let passwordValidity = validatePassword(password.value);
  if (!passwordValidity) showPasswordError();
});

zipcode.addEventListener("blur", () => {
  removeAllErrors();
  let zipcodeValidity = validateZipcode(zipcode.value);
  if (!zipcodeValidity) showZipcodeError();
});

confirmPassword.addEventListener("blur", () => {
  removeAllErrors();
  let confirmPasswordValidity =
    validatePassword(password.value) &&
    !validateConfirmPassword(password.value, confirmPassword.value);
  if (confirmPasswordValidity) showConfirmPasswordError();
});
