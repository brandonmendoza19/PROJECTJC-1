// Obtener elementos del formulario por su id
// - document.getElementById(): devuelve un elemento por su id
const form = document.getElementById("form"); // Formulario principal
const username = document.getElementById("username"); // Campo de nombre de usuario
const email = document.getElementById("email"); // Campo de email
const password = document.getElementById("password"); // Campo de contraseña
const passwordConfirmation = document.getElementById("password-confirmation"); // Campo de confirmación de contraseña

// Agregar evento de envío al formulario
// - addEventListener(): agrega un evento a un elemento
// - "submit": evento de envío del formulario
form.addEventListener("submit", (e) => {
    // Prevenir envío del formulario por defecto
    // - preventDefault(): evita la acción predeterminada del evento
    e.preventDefault();

    // Llamar función para verificar inputs
    // - checkInputs(): verifica los campos del formulario
    checkInputs();
});

// Función para verificar inputs
function checkInputs() {
    // Obtener valores de los inputs
    // - value: propiedad que devuelve el valor de un input
    const usernameValue = username.value; // Valor del campo de nombre de usuario
    const emailValue = email.value; // Valor del campo de email
    const passwordValue = password.value; // Valor del campo de contraseña
    const passwordConfirmationValue = passwordConfirmation.value; // Valor del campo de confirmación de contraseña

    // Verificar nombre de usuario
    // - if(): condición que verifica si el campo está vacío
    if (usernameValue === "") {
        // Mostrar error si el campo está vacío
        // - setErrorFor(): función que muestra un error en un input
        setErrorFor(username, "El nombre del usuario es obligatorio.");
    } else {
        // Mostrar éxito si el campo es válido
        // - setSuccessFor(): función que muestra éxito en un input
        setSuccessFor(username);
    }

    // Verificar email
    // - if(): condición que verifica si el campo está vacío
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
    // - if(): condición que verifica si el campo está vacío
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
    // - if(): condición que verifica si el campo está vacío
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
    // - querySelectorAll(): devuelve una lista de elementos que coinciden con el selector
    const formControls = form.querySelectorAll(".form-control");

    // Verificar si todos los controles son válidos
    // - every(): método que devuelve true si todos los elementos del arreglo cumplen la condición
    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    // Mostrar mensaje si el formulario es válido
    // - console.log(): imprime un mensaje en la consola
    if (formIsValid) {
        console.log("El formulario está 100% válido!");
    }
}

// Función para mostrar error en un input
function setErrorFor(input, message) {
    // Obtener el control del formulario que contiene el input
    // - parentElement: propiedad que devuelve el elemento padre
    const formControl = input.parentElement;
        // Obtener el elemento small que muestra el mensaje de error
    // - querySelector(): devuelve el primer elemento que coincide con el selector
    const small = formControl.querySelector("small");

    // Establecer el mensaje de error
    // - innerText: propiedad que establece el texto del elemento
    small.innerText = message;

    // Agregar clase de error al control del formulario
    // - className: propiedad que establece la clase del elemento
    formControl.className = "form-control error";
}

// Función para mostrar éxito en un input
function setSuccessFor(input) {
    // Obtener el control del formulario que contiene el input
    // - parentElement: propiedad que devuelve el elemento padre
    const formControl = input.parentElement;

    // Agregar clase de éxito al control del formulario
    // - className: propiedad que establece la clase del elemento
    formControl.className = "form-control success";
}

// Función para verificar si un email es válido
function checkEmail(email) {
    // Expresión regular para verificar emails
    // - test(): método que devuelve true si la cadena coincide con la expresión regular
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}