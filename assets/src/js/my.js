// modal cart

const close_cart  = document.querySelector(".close-modal_cart");
const modal_cart = document.querySelector("#modal-cart");
const cartBtn = document.querySelector("#cart-btn");
const overlay = document.querySelector("body");

cartBtn.addEventListener("click", function (event) {
    modal_cart.classList.add("is-open");
    overlay.classList.add("hidden");
})
close_cart.addEventListener("click", function (event) {
    modal_cart.classList.remove("is-open");
    overlay.classList.remove("hidden");
})


// pajax container

$(document).pjax('.restaurant__cards_card a', '.pjax-container', {fragment: '.pjax-container'});


// modal-auth
const close_auth  = document.querySelector(".close-modal_auth");
const modal_auth = document.querySelector("#modal-auth");
const btnAuth = document.querySelector("#btn-auth");
const btnLogout = document.querySelector("#btn-logout");
const logInForm = document.querySelector("#authForm");
const loginInput = document.querySelector("#login-field");
let  userName = document.querySelector(".user-name");
let login = localStorage.getItem('dfood');


function authorized() {
    console.log("авторизован");
    btnAuth.style.display = "none";
    btnLogout.style.display = "inline-block";
    userName.style.display = "inline-block";
    userName.textContent = login;

    btnLogout.addEventListener("click", logOut);

    function logOut() {
        login = null;
        btnAuth.style.display = "";
        btnLogout.style.display = "";
        userName.style.display = "";
        btnLogout.removeEventListener("click", logOut);
        localStorage.removeItem('dfood');
;       checkAuth();
    }
}
function toggleModalAuth() {
    modal_auth.classList.toggle("is-open");
}
function notAuthorized() {
    btnAuth.addEventListener('click', toggleModalAuth);
    close_auth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
    console.log("не авторизован");
    loginInput.value = '';

    function logIn(event) {
        event.preventDefault();
        login = loginInput.value;
        console.log(login);
        localStorage.setItem('dfood', login);
        toggleModalAuth()
        btnAuth.removeEventListener('click', toggleModalAuth);
        close_auth.removeEventListener('click', toggleModalAuth);
        logInForm.removeEventListener('submit', logIn);
        checkAuth();
    }
}
function checkAuth() {
    if (login) {
        authorized();
    }
    else {
        notAuthorized()
    }
}
checkAuth();

