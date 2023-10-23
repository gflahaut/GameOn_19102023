/**
 * DOM Elements
 */
const modalForm = document.querySelector("#modal-form");
const modalConfirmation = document.querySelector("#modal-confirmation");
const formulaire = document.querySelector("form");
const confirmationMessage = document.querySelector(".msg-confirmation");
const confirmationButton = document.querySelector(".btn-confirmation");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeButtonForm = document.querySelector("#close-modal-form");
const closeButtonConfirmation = document.querySelector("#close-modal-confirmation");
const closeButtonConfirmationBis = document.querySelector(".btn-confirmation");

/**
 * Événement déclenché lorsque la fenêtre est entièrement chargée
 */
window.onload = function () {
  // Si des données de formulaire existent enregistrées localement, affiche la confirmation
    if (localStorage.getItem("formData")) {
      confirmationMessage.appendChild(confirmationButton);
      confirmationMessage.classList.remove("d-none");
      // Ouvre la confirmation modal avec les boutons de fermeture associés
      launchModal(modalConfirmation, [closeButtonConfirmation, closeButtonConfirmationBis]);
    }
    // Ajoute un événement d'ouverture du formulaire modal aux boutons correspondants
    modalBtn.forEach((btn) => btn.addEventListener("click", () => {
      launchModal(modalForm, [closeButtonForm]);
    }));
  /**
 * Gère la soumission du formulaire et le stockage local des données.
 *
 * @param {Event} event - L'événement de soumission du formulaire.
 */
formulaire.addEventListener("submit", (event) => {
  // Empêche le comportement par défaut du formulaire (rechargement de la page)
  event.preventDefault();

  // Vérifie si le formulaire est valide en appelant la fonction checkForm()
  if (checkForm()) {
    // Récupère tous les éléments du formulaire
    const elements = formulaire.elements;

    // Crée un objet pour stocker les données du formulaire
    const formData = {};

    // Parcourt tous les éléments du formulaire
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      // Exclut le bouton de soumission (type "submit")
      if (element.type !== "submit") {
        // Associe le nom de l'élément à sa valeur
        formData[element.name] = element.value;
      }
    }

    // Convertit l'objet formData en format JSON
    const formDataJSON = JSON.stringify(formData);

    // Stocke les données localement dans le navigateur sous la clé "formData"
    localStorage.setItem("formData", formDataJSON);

    // Soumet le formulaire
    formulaire.submit();
  } else {
    // Affiche une alerte si le formulaire contient des erreurs
    alert("Le formulaire présente de nombreuses erreurs, il ne peut être transmis !");
  }
});


  /**
   * Fonction pour basculer la visibilité d'un élément
   * @param {HTMLElement} element - L'élément HTML à afficher ou cacher
   * @param {boolean} show - Indique si l'élément doit être affiché (true) ou caché (false)
   */
  function toggleVisibility(element, show) {
    const displayClass = show ? "d-block" : "d-none";
    element.classList.remove("d-none", "d-block");
    element.classList.add(displayClass);
  }

  /**
   * Fonction pour gérer la navigation responsive
   */
  function editNavbar() {
    var navBar = document.getElementById("myTopnav");
    if (navBar.className === "topnav") {
      navBar.className += " responsive";
    } else {
      navBar.className = "topnav";
    }
  }
    /**
     * Fonction pour ouvrir un modal
     * @param {HTMLElement} modal - L'élément modal à ouvrir
     * @param {Array<HTMLElement>} closeButtons - Tableau des boutons de fermeture associés
     */
    function launchModal(modal, closeButtons) {
      toggleVisibility(modal, true);
      for (let closeButton of closeButtons) {
        closeButton.addEventListener("click", (reset) => {
          toggleVisibility(modal, false);
          return reset;
        });
      }
    }

    /**
     * Fonction de validation du formulaire
     * @returns {boolean} - true si le formulaire est valide, sinon false
     */
    function checkForm() {
      // Sélection des éléments du formulaire
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

      // Fonction pour définir un message d'erreur pour un élément
      const setErrorText = (element, message) => {
        document.getElementById(element).innerText = message;
      };

      // Fonction pour effacer le message d'erreur d'un élément
      const clearErrorText = (element) => {
        setErrorText(element, "");
      };
      /**
       * Vérification de la longueur du prénom dans le formulaire
       * @param {HTMLInputElement} inputFirstname - L'élément d'entrée HTML du prénom
       * @returns {boolean} - true si le prénom est valide, sinon false
       */

      if (inputFirstname.value.length < 2) {
        setErrorText("errorFirstname", "Vous n'avez pas précisé de prénoms !");
        validForm = false;
      } else {
        clearErrorText("errorFirstname");
      }
      /**
     * Vérification de la longueur du nom dans le formulaire
     * @param {HTMLInputElement} inputLastname - L'élément d'entrée HTML du nom
     * @returns {boolean} - true si le nom est valide, sinon false
     */
      if (inputLastname.value.length < 2) {
        setErrorText("errorLastname", "Vous n'avez pas précisé de noms !");
        validForm = false;
      } else {
        clearErrorText("errorLastname");
      }

      /**
     * Vérification de l'adresse e-mail dans le formulaire
     * @param {HTMLInputElement} inputEmail - L'élément d'entrée HTML de l'adresse e-mail
     * @param {boolean} validForm - Indique si le formulaire est valide ou non
     * @param {RegExp} regExEmail - L'expression régulière utilisée pour valider l'adresse e-mail
     * @returns {boolean} - true si l'adresse e-mail est valide, sinon false
     */
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
      /**
       * Vérification de la date de naissance dans le formulaire
       * @param {HTMLInputElement} inputBirthdate - L'élément d'entrée HTML de la date de naissance
       * @param {boolean} validForm - Indique si le formulaire est valide ou non
       * @param {RegExp} regExBirthdate - L'expression régulière utilisée pour valider la date de naissance
       * @returns {boolean} - true si la date de naissance est valide, sinon false
       */
      // Obtention de la date actuelle
      const dateToday = new Date();

      // Calcul de la date de naissance il y a 100 ans
      const date100Years = new Date(dateToday);
      date100Years.setFullYear(dateToday.getFullYear() - 100);

      // Calcul de la date de naissance il y a 18 ans
      const date18Years = new Date(dateToday);
      date18Years.setFullYear(dateToday.getFullYear() - 18);

      // Récupération des dates de naissance originales
      const dateOriginMin = new Date(date18Years);
      const dateOriginMax = new Date(date100Years);

      /**
       * Fonction pour formater une date de naissance au format "yyyy-mm-dd"
       * @param {Date} dateOrigin - La date de naissance à formater
       * @returns {string} - La date de naissance formatée
       */
      function dateFormater(dateOrigin) {
        const year = dateOrigin.getFullYear();
        const month = String(dateOrigin.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0, donc ajoutez 1 et formatez avec deux chiffres
        const day = String(dateOrigin.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
      }

      // Formatage de la date de naissance au format "yyyy-mm-dd"
      const dateMin = dateFormater(dateOriginMin);
      const dateMax = dateFormater(dateOriginMax);

      /**
       * Vérification de la date de naissance dans le formulaire
       * @param {HTMLInputElement} inputBirthdate - L'élément d'entrée HTML de la date de naissance
       * @param {RegExp} regExBirthdate - L'expression régulière utilisée pour valider la date de naissance
       * @param {string} dateMin - La date minimale acceptable au format "yyyy-mm-dd"
       * @param {string} dateMax - La date maximale acceptable au format "yyyy-mm-dd"
       * @returns {boolean} - true si la date de naissance est valide, sinon false
       */
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
          "Vous devez avoir plus de 18 ans et moins de 100 ans pour vous inscrire !"
        );
        validForm = false;
      } else if (!regExBirthdate.test(inputBirthdate.value)) {
        setErrorText(
          "errorBirthdate",
          "Le format de la date de naissance précisée est invalide !"
        );
        validForm = false;
      } else {
        clearErrorText("errorBirthdate");
      }

      /**
       * Vérification de la quantité de tournois et de la sélection d'une option de localisation dans le formulaire
       * @param {HTMLInputElement} inputQuantity - L'élément d'entrée HTML pour la quantité de tournois
       * @param {boolean} validForm - Indique si le formulaire est valide ou non
       * @param {RegExp} regExQuantity - L'expression régulière utilisée pour valider la quantité
       * @param {HTMLFormControlsCollection} radioButton - La collection d'éléments de contrôle radio pour la sélection de la localisation
       * @returns {boolean} - true si la quantité et la localisation sont valides, sinon false
       */
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

      /**
       * Vérification de la sélection d'une option de localisation dans le formulaire
       * @param {HTMLFormControlsCollection} radioButton - La collection d'éléments de contrôle radio pour la sélection de la localisation
       * @param {boolean} selectedButton - Indique si une option de localisation a été sélectionnée (true) ou non (false)
       * @returns {boolean} - true si une option de localisation a été sélectionnée, sinon false
       */
      // Sélection des éléments de contrôle radio pour la localisation
      const radioButton = formulaire.elements["location"];
      let selectedButton = false;

      // Parcours des options de localisation pour vérifier si l'une d'entre elles est sélectionnée
      for (let i = 0; i < radioButton.length; i += 1) {
        if (radioButton[i].checked) {
          selectedButton = true;
          break; // Sortie de la boucle dès qu'une option est sélectionnée
        }
      }

      /**
       * Vérification de la sélection d'une option de localisation et gestion des erreurs
       * @param {boolean} selectedButton - Indique si une option de localisation a été sélectionnée (true) ou non (false)
       * @param {boolean} validForm - Indique si le formulaire est valide ou non
       */
      if (!selectedButton) {
        setErrorText("errorLocation", "Aucun tournoi n'est sélectionné !");
        validForm = false;
      } else {
        clearErrorText("errorLocation");
      }
    
      /**
       * Vérification des cases à cocher des conditions d'utilisation, des champs vides et gestion des styles d'erreur
       * @param {HTMLInputElement} inputCheckbox - L'élément d'entrée HTML pour la case à cocher des Conditions d'utilisation
       * @param {boolean} validForm - Indique si le formulaire est valide ou non
       * @param {NodeListOf<HTMLInputElement>} inputs - La liste des éléments d'entrée du formulaire
       * @returns {boolean} - true si le formulaire est valide, sinon false
       */
      if (!inputCheckbox.checked) {
        setErrorText(
          "errorCheckbox",
          "Vous n'avez pas coché les Conditions d'utilisation !"
        );
        validForm = false;
      } else {
        clearErrorText("errorCheckbox");
      }

      // Sélection de tous les éléments d'entrée du formulaire
      const inputs = formulaire.querySelectorAll(
        "input[type=text], input[type=email], input[type=number], input[type=radio], input[type=checkbox], input[type=date]"
      );

      // Vérification des champs vides et application des styles d'erreur
      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          input.classList.add("input-invalide");
        } else {
          input.classList.remove("input-invalide");
        }
      });

      // Si le formulaire est valide, renvoie true, sinon renvoie false
      return validForm;
    }
