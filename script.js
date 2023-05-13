const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector(".email-error");

function addEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  }
}


form.addEventListener("submit", (event) => {
  event.preventDefault();

  // add error text & toggle show class
  if (!email.validity.valid) addEmailError();
  emailError.classList.toggle("show", !email.validity.valid);

  
});
