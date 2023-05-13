const form = document.querySelector("form");
const email = document.getElementById("email");

const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const zipCodeInput = document.getElementById("zip-code");
const passwordInput = document.getElementById("password");
const passwordValidationInput = document.getElementById("password-validation");

const emailError = document.querySelector(".email-error");
const countryError = document.querySelector(".country-error");
const zipCodeError = document.querySelector(".zip-code-error");
const passwordError = document.querySelector(".password-error");
const passwordValidationError = document.querySelector(
  ".password-validation-error"
);

const countrySelect = document.querySelector("select");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // show email error
  if (!email.validity.valid) addEmailError();
  emailError.classList.toggle("show", !email.validity.valid);

  // show country error
  if (countryInput.value === "") addCountryError();
  countryError.classList.toggle("show", countryInput.value === "");
});

// make country dropdown text black on focus

countrySelect.addEventListener("focus", () => {
  countrySelect.classList.remove("gray-out");
});
