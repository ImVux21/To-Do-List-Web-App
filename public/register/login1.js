// DOM

const submitElem = document.getElementById("submitForm");

const formElem = document.getElementById("form");
const firstnameElem = document.getElementById("firstname");
const lastnameElem = document.getElementById("lastname");
const emailElem = document.getElementById("email");
const passwordElem = document.getElementById("password");

const errorFirstNameElem = document.getElementById("errorFirstName");
const errorLastNameElem = document.getElementById("errorLastName");
const errorEmailElem = document.getElementById("errorEmail");
const errorPasswordElem = document.getElementById("errorPassword");

const inputFormElem = document.querySelectorAll("input");

submitElem.addEventListener("click", (e) => {
  e.preventDefault();

  if (firstnameElem.value === "") {
    firstnameElem.classList.add("errorimage");
    errorFirstNameElem.innerHTML = "First Name cannot be empty";
    return;
  } else if (lastnameElem.value === "") {
    firstnameElem.classList.remove("errorimage");
    errorFirstNameElem.innerHTML = "";
    lastnameElem.classList.add("errorimage");
    errorLastNameElem.innerHTML = "Last Name cannot be empty";
    return;
  } else if (emailElem.value === "") {
    lastnameElem.classList.remove("errorimage");
    errorLastNameElem.innerHTML = "";
    emailElem.classList.add("errorimage");
    errorEmailElem.innerHTML = "Email cannot be empty";
    return;
  } else if (emailElem.value.indexOf("@") < 0) {
    errorEmailElem.innerHTML = "Looks like this is not an email";
    return;
  } else if (emailElem.value.indexOf(".com") < 0) {
    errorEmailElem.innerHTML = "Looks like this is not an email";
    return;
  } else if (passwordElem.value === "") {
    emailElem.classList.remove("errorimage");
    errorEmailElem.innerHTML = "";
    passwordElem.classList.add("errorimage");
    errorPasswordElem.innerHTML = "Password cannot be empty";
    return;
  } else {
    passwordElem.classList.remove("errorimage");
    errorPasswordElem.innerHTML = "";
    alert("Registered Successfully!");
    inputFormElem.forEach((element) => {
      element.value = "";
    });
    window.location.reload();
  }
});