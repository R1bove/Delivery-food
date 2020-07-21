'use strict';

// modal cart

const close_cart  = document.querySelector(".close-modal_cart");
const modal_cart = document.querySelector("#modal-cart");
const cartBtn = document.querySelector("#cart-btn");
const overlay = document.querySelector("body");

cartBtn.addEventListener("click", function (event) {
    modal_cart.classList.add("is-open");
    overlay.classList.add("o-hidden");
})
close_cart.addEventListener("click", function (event) {
    modal_cart.classList.remove("is-open");
    overlay.classList.remove("o-hidden");
})


// pajax container

// $(document).pjax('.restaurant__cards_card a', '.pjax-container', {fragment: '.pjax-container'});


// modal-auth
const close_auth  = document.querySelector(".close-modal_auth");
const modal_auth = document.querySelector("#modal-auth");
const btnAuth = document.querySelector("#btn-auth");
const btnLogout = document.querySelector("#btn-logout");
const logInForm = document.querySelector("#authForm");
const loginInput = document.querySelector("#login-field");
let  userName = document.querySelector(".user-name");
let login = localStorage.getItem('dfood');
//cards
const cardsRestaurants = document.querySelector('#restaurant__cards');
const cardsFoodRestaurant = document.querySelector('#food__cards');
let newcard = localStorage.getItem("card");

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


//create card

function createCardRestaurant() {
    const card = `<div class="restaurant__cards_card card animated zoomInDown">
                            <a>
                                <img src="../img/main/cards/tanuki.jpg" alt="">
                                <div class="card__info">
                                    <div class="card__info_headline">
                                        <h3 class="card__title">Тануки</h3>
                                        <span class="time">50 мин</span>
                                    </div>
                                    <div class="card__info_short-desc">
                                        <span class="rate"><i class ="fas fa-star"></i>4.5</span>
                                        <span class="price">От 900 ₽ </span>
                                        <span class="type">Пицца </span>
                                    </div>
                                </div>
                            </a>
                        </div>`;
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}
if (cardsRestaurants) {
    createCardRestaurant();
    cardsRestaurants.addEventListener('click', openGoods);
}

function createCardGood() {
    const foodCard = `<div class="restaurant__cards_card card animated zoomInLeft">
                            <img src="../img/main/cards-menu/roll-ugor-standart.jpg" alt="">
                            <div class="card__info">
                                <div class="card__info_headline card__info_headline-menu">
                                    <h3 class="card__title">Пицца плюс</h3>
                                </div>
                                <div class="card__info_short-desc">
                                    <span class="desc">Рис, угорь, соус унаги, кунжут, водоросли нори. </span>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-primary">
                                        В корзину
                                        <i class="far fa-shopping-cart"></i>
                                    </button>
                                    <div class="price">
                                        <span>250 ₽</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    cardsFoodRestaurant.insertAdjacentHTML('beforeend', foodCard);
    localStorage.removeItem("card");
}


if (newcard) {
    document.addEventListener("DOMContentLoaded", function() {
        createCardGood();
    });
}


function openGoods(event) {
    const typeRestaurant = event.target.closest("a");
    localStorage.setItem('card', typeRestaurant);
    console.log(typeRestaurant);
    if (typeRestaurant) {
        // document.location.href = "/restaurant-shop.html";
    }
}

