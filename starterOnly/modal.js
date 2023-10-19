// DOM Elements
const modalbg = document.querySelector(".bground");
const formulaire = document.querySelector("form");
const confirmationMessage = document.querySelector(".msg-confirmation");
const confirmationButton = document.querySelector(".btn-confirmation");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeButton = document.querySelector(".close");

//Toggle visibility Function
function toggleVisibility(element, show) {
  const displayClass = show ? "d-block" : "d-none";
  element.classList.remove("d-none", "d-block");
  element.classList.add(displayClass);
}
//Managing the responsive navbar Function 
function editNavbar() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}
//Launch modal form Function
function launchModal() {
  toggleVisibility(modalbg, true);
  closeButton.addEventListener("click", (reset) => {
    toggleVisibility(modalbg, false);
    return reset
  });
}
//Launch modal event Function
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Form Validation Function
function checkForm() {
  const inputFirstname = document.getElementById("firstname");
  const inputLastname = document.getElementById("lastname");
  const inputEmail = document.getElementById("email");
  const inputBirthdate = document.getElementById("birthdate");
  const inputQuantity = document.getElementById("quantity");
  const inputCheckbox = document.getElementById("checkbox1");
  const regExEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const regExBirthdate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  const regExQuantity = /^\d+$/;
  let validForm = true;

  const setErrorText = (element, message) => {
    document.getElementById(element).innerText = message;
  };
  const clearErrorText = (element) => {
    setErrorText(element, "");
  };
  if (inputFirstname.value.length < 2) {
    setErrorText("errorFirstname", "Vous n'avez pas précisé de prénoms !");
    validForm = false;
  } else {
    clearErrorText("errorFirstname");
  }
  if (inputLastname.value.length < 2) {
    setErrorText("errorLastname", "Vous n'avez pas précisé de noms !");
    validForm = false;
  } else {
    clearErrorText("errorLastname");
  }
  if (inputEmail.value === "") {
    setErrorText("errorEmail", "Vous n'avez pas précisé d'adresse e-mail !");
    validForm = false;
  } else if (!regExEmail.test(inputEmail.value)) {
    setErrorText(
      "errorEmail",
      "Le format de l'adresse e-mail précisée est invalide !"
    );
    validForm = false;
  } else {
    clearErrorText("errorEmail");
  }

  //Today's Birthdate
  const dateToday = new Date();
  // Calculating the Birthdate 100 years ago
  const date100Years = new Date(dateToday);
  date100Years.setFullYear(dateToday.getFullYear() - 100);
  // Calculating the Birthdate 18 years ago
  const date18Years = new Date(dateToday);
  date18Years.setFullYear(dateToday.getFullYear() - 18);
  // Retrieval of the original Birthdates
  const dateOriginMin = new Date(date18Years);
  const dateOriginMax = new Date(date100Years);
  // Function to format a Birthdate as "yyyy-mm-dd"
  function dateFormater(dateOrigin) {
    const year = dateOrigin.getFullYear();
    const month = String(dateOrigin.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0, donc ajoutez 1 et formatez avec deux chiffres
    const day = String(dateOrigin.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }
  // Formatting the Birthdate in "yyyy-mm-dd" format
  const dateMin = dateFormater(dateOriginMin);
  const dateMax = dateFormater(dateOriginMax);

  if (inputBirthdate.value === "") {
    setErrorText(
      "errorBirthdate",
      "Vous n'avez pas précisé votre date de naissance !"
    );
    validForm = false;
  } else if (
    inputBirthdate.value.replaceAll("-", "") >= dateMin ||
    inputBirthdate.value.replaceAll("-", "") <= dateMax
  ) {
    setErrorText(
      "errorBirthdate",
      "vous devez avoir plus de 18ans et moins de 100 ans pour vous inscrire !"
    );
    validForm = false;
  } else if (!regExBirthdate.test(inputBirthdate.value)) {
    setErrorText(
      "errorBirthdate",
      "Le format de la Date de naissance précisée est invalide !"
    );
    validForm = false;
  } else {
    clearErrorText("errorBirthdate");
  }

  if (inputQuantity.value === "") {
    setErrorText(
      "errorQuantity",
      "Vous n'avez pas précisé le nombre de tournois auxquels vous avez participé !"
    );
    validForm = false;
  } else if (!regExQuantity.test(inputQuantity.value)) {
    setErrorText("errorQuantity", "Veuillez entrer un nombre valide !");
    validForm = false;
  } else {
    clearErrorText("errorQuantity");
  }
  const radioButton = formulaire.elements["location"];
    let selectedButton = false;
    
    for (let i = 0; i < radioButton.length; i += 1) {
      if (radioButton[i].checked) {
        selectedButton = true;
        break;
      }
    }
    
    if (!selectedButton) {
      setErrorText("errorLocation", "Aucun tournoi n'est sélectionné !");
      validForm = false;
    } else {
      clearErrorText("errorLocation");
    }
    
    if (!inputCheckbox.checked) {
      setErrorText(
        "errorCheckbox",
        "Vous n'avez pas coché les Conditions d'utilisation !"
      );
      validForm = false;
    } else {
      clearErrorText("errorCheckbox");
    }
    
    const inputs = formulaire.querySelectorAll(
      "input[type=text], input[type=email], input[type=number], input[type=radio], input[type=checkbox], input[type=date]"
    );
    
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("input-invalide");
      } else {
        input.classList.remove("input-invalide");
      }
    });
    
    return validForm;
}

// Form submission
formulaire.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkForm()) {
    const elements = formulaire.elements;
    const formData = {};
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.type !== 'submit') {
        formData[element.name] = element.value;
      }
    }
    console.log(formData);
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem('formData', formDataJSON);
    confirmationMessage.appendChild(confirmationButton);
    confirmationMessage.classList.remove("d-none");
    toggleVisibility(formulaire, false);
    setTimeout(() => formulaire.submit(), 36000);
  } else {
    alert("Le formulaire présente de nombreuses erreurs il ne peut être transmit !");
  }
});
