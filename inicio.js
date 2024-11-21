// Obtener elementos del formulario por su id
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

// Agregar evento de envío al formulario
form.addEventListener("submit", (e) => {
    // Prevenir envío del formulario por defecto
    e.preventDefault();

    // Llamar función para verificar inputs
    checkInputs();
});

// Función para verificar inputs
function checkInputs() {
    // Obtener valores de los inputs
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    // Verificar nombre de usuario
    if (usernameValue === "") {
        // Mostrar error si el campo está vacío
        setErrorFor(username, "El nombre del usuario es obligatorio.");
    } else {
        // Mostrar éxito si el campo es válido
        setSuccessFor(username);
    }

    // Verificar email
    if (emailValue === "") {
        // Mostrar error si el campo está vacío
        setErrorFor(email, "El email es obligatorio.");
    } else if (!checkEmail(emailValue)) {
        // Mostrar error si el email no es válido
        setErrorFor(email, "Por favor, escribe un email válido.");
    } else {
        // Mostrar éxito si el campo es válido
        setSuccessFor(email);
    }

    // Verificar contraseña
    if (passwordValue === "") {
        // Mostrar error si el campo está vacío
        setErrorFor(password, "La contraseña es obligatoria.");
    } else if (passwordValue.length < 7) {
        // Mostrar error si la contraseña es demasiado corta
        setErrorFor(password, "Escribe mínimo 7 caracteres.");
    } else {
        // Mostrar éxito si el campo es válido
        setSuccessFor(password);
    }

    // Verificar confirmación de contraseña
    if (passwordConfirmationValue === "") {
        // Mostrar error si el campo está vacío
        setErrorFor(passwordConfirmation, "La confirmación de la contraseña es obligatoria.");
    } else if (passwordConfirmationValue !== passwordValue) {
        // Mostrar error si la confirmación no coincide con la contraseña
        setErrorFor(passwordConfirmation, "Confirme por favor la contraseña.");
    } else {
        // Mostrar éxito si el campo es válido
        setSuccessFor(passwordConfirmation);
    }

    // Obtener todos los controles del formulario
    const formControls = form.querySelectorAll(".form-control");

    // Verificar si todos los controles son válidos
    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    // Mostrar mensaje si el formulario es válido
    if (formIsValid) {
        console.log("El formulario está 100% válido!");
    }
}

// Función para mostrar error en un input
function setErrorFor(input, message) {
    // Obtener el control del formulario que contiene el input
    const formControl = input.parentElement;
    // Obtener el elemento small que muestra el mensaje de error
    const small = formControl.querySelector("small");

    // Establecer el mensaje de error
    small.innerText = message;

    // Agregar clase de error al control del formulario
    formControl.className = "form-control error";
}

// Función para mostrar éxito en un input
function setSuccessFor(input) {
    // Obtener el control del formulario que contiene el input
    const formControl = input.parentElement;

    // Agregar clase de éxito al control del formulario
    formControl.className = "form-control success";
}

// Función para verificar si un email es válido
function checkEmail(email) {
    // Expresión regular para verificar emails
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}