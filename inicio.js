const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (e) => {
e.preventDefault();

checkInputs();
});

function checkInputs() {
const usernameValue = username.value;
const emailValue = email.value;
const passwordValue = password.value;
const passwordConfirmationValue = passwordConfirmation.value;

if (usernameValue === "") {
    setErrorFor(username, "El nombre del usuario es obligatorio.");
} else {
    setSuccessFor(username);
}

if (emailValue === "") {
    setErrorFor(email, "El email es obligatorio.");
} else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, escribe un email válido.");
} else {
    setSuccessFor(email);
}

if (passwordValue === "") {
    setErrorFor(password, "La contraseña es obligatoria.");
} else if (passwordValue.length < 7) {
    setErrorFor(password, "Escribe mínimo 7 caracteres.");
} else {
    setSuccessFor(password);
}

if (passwordConfirmationValue === "") {
    setErrorFor(passwordConfirmation, "La confirmación de la contraseña es obligatoria.");
} else if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, "Confirme por favor la contraseña.");
} else {
    setSuccessFor(passwordConfirmation);
}

const formControls = form.querySelectorAll(".form-control");

const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
});

if (formIsValid) {
    console.log("El formulario está 100% válido!");
}
}

function setErrorFor(input, message) {
const formControl = input.parentElement;
const small = formControl.querySelector("small");

  // Un mensaje de error
small.innerText = message;

  // Clase del error
formControl.className = "form-control error";
}

function setSuccessFor(input) {
const formControl = input.parentElement;

  // Clase del suceso
formControl.className = "form-control success";
}

function checkEmail(email) {
return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
);
}