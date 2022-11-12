// Constantes para obtener inputs de formulario
const formName = document.getElementById("name");
const formLastName = document.getElementById("lastName");
const formEmail = document.getElementById("email");
const form = document.getElementById("contactForm");

form.addEventListener("submit", validForm)

function validForm(event) {
    // Expresiones regulares
    // Letras a - z
    let a_z = /[^a-z]+/g;
    // Email
    let em = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Si el input del nombre esta vacio o contiene caracteres invalidos.
    if ((formName.value == "") || (formName.value.toLowerCase().match(a_z))) {
        formName.nextElementSibling.className = "warning";
        formName.classList.add("invalidInput");
        event.preventDefault();
    } else {
        formName.nextElementSibling.className = "display-none";
    }

    // Si el input del apellido esta vacio o contiene caracteres invalidos.
    if ((formLastName.value == "") || (formLastName.value.toLowerCase().match(a_z))) {
        formLastName.nextElementSibling.className = "warning";
        formLastName.classList.add("invalidInput");
        event.preventDefault();
    } else {
        formLastName.nextElementSibling.className = "display-none";
    }

    // Si el input del email esta vacio o contiene caracteres invalidos.
    if ((!formEmail.value.match(em)) || (formEmail.value == "")) {
        formEmail.nextElementSibling.className = "warning";
        formEmail.classList.add("invalidInput");
        event.preventDefault();
    } else {
        formEmail.nextElementSibling.className = "display-none";
    }

    formName.addEventListener("animationend", () => {
        formName.classList.remove("invalidInput");
    })

    formLastName.addEventListener("animationend", () => {
        formLastName.classList.remove("invalidInput");
    })

    formEmail.addEventListener("animationend", ()=>{
        formEmail.classList.remove("invalidInput");
    })
}