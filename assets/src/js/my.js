'use strict';

// modal cart

const close_cart  = document.querySelector(".close-modal_cart");
const modal_cart = document.querySelector("#modal-cart");
const cartBtn = document.querySelector("#cart-btn");
const overlay = document.querySelector("body");
const mainCartList = document.querySelector(".main-cart-list");
const modalPriceTag = document.querySelector(".modal_price-tag");
const btnCancelCart = document.querySelector(".cancel");
const cart = [];

cartBtn.addEventListener("click", function (event) {
    renderItemsCart();
    modal_cart.classList.add("is-open");
    overlay.classList.add("o-hidden");
})
close_cart.addEventListener("click", function (event) {
    modal_cart.classList.remove("is-open");
    overlay.classList.remove("o-hidden");
})
btnCancelCart.addEventListener("click", function (event) {
    cart.length = 0;
    renderItemsCart();
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


const getData = async function (url) {

    const response = await fetch(url);

    if (!response.ok) {
        document.location.href = "/404.html";
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);

    }

    return await response.json();
};
getData('./db/partners.json');

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
    loginInput.style.borderColor = "#d9d9d9";
}
function notAuthorized() {
    btnAuth.addEventListener('click', toggleModalAuth);
    close_auth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
    console.log("не авторизован");
    loginInput.value = '';

    function logIn(event) {
        event.preventDefault();
        if(loginInput.value.trim()) {
            login = loginInput.value;
            console.log(login);
            localStorage.setItem('dfood', login);
            toggleModalAuth();
            btnAuth.removeEventListener('click', toggleModalAuth);
            close_auth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            checkAuth();
        }
        else {
            loginInput.style.borderColor = "red";
        }
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

function createCardRestaurant(restaurant) {

    let { image, kitchen, name, price, products, stars, time_of_delivery } = restaurant;

    const card = `<div class="restaurant__cards_card card animated zoomInDown">
                            <a href="/restaurant-shop.html" data-products = "${products}">
                                <img src="${image}" alt="">
                                <div class="card__info">
                                    <div class="card__info_headline">
                                        <h3 class="card__title">${name}</h3>
                                        <span class="time">${time_of_delivery} мин.</span>
                                    </div>
                                    <div class="card__info_short-desc">
                                        <span class="rate"><i class ="fas fa-star"></i>${stars}</span>
                                        <span class="price">${price} ₽ </span>
                                        <span class="type">${kitchen} </span>
                                    </div>
                                </div>
                            </a>
                        </div>`;
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

if (cardsRestaurants) {
    getData('./db/partners.json').then(function (data) {
        data.forEach(createCardRestaurant);
    });
    cardsRestaurants.addEventListener('click', openGoods);
}

function createCardGood(goods) {
    const { description, id, image, name, price } = goods;

    const foodCard = `<div class="restaurant__cards_card food__cards_card card animated zoomInLeft" id="${id}">
                            <img src="../img/main/cards-menu/roll-ugor-standart.jpg" alt="">
                            <div class="card__info">
                                <div class="card__info_headline card__info_headline-menu">
                                    <h3 class="card__title">${name}</h3>
                                </div>
                                <div class="card__info_short-desc">
                                    <span class="desc">${description}</span>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-primary add-to-cart">
                                        В корзину
                                        <i class="far fa-shopping-cart"></i>
                                    </button>
                                    <div class="price">
                                        <span>${price} ₽</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    cardsFoodRestaurant.insertAdjacentHTML('beforeend', foodCard);
    // localStorage.removeItem("card");
}

if (cardsFoodRestaurant) {
    if (newcard) {
        document.addEventListener("DOMContentLoaded", function() {
            getData(`./db/${newcard}`).then(function (data) {
                data.forEach(createCardGood);
            });
            console.log(newcard);
            let shopName = localStorage.getItem('shopName');
            let shopRate = localStorage.getItem('shopRate');
            let shopPrice = localStorage.getItem('shopPrice');
            let shopType = localStorage.getItem('shopType');
            document.querySelector('.restaurant-menu__header h2').textContent = shopName;
            document.querySelector('.restaurant-menu__header .rate').textContent = shopRate;
            document.querySelector('.restaurant-menu__header .price').textContent = shopPrice;
            document.querySelector('.restaurant-menu__header .type').textContent = shopType;

            cardsFoodRestaurant.addEventListener('click', addToCart);
            function addToCart(event) {
                const btnAddToCart = event.target.closest('.add-to-cart');

                if(btnAddToCart) {
                    const card = event.target.closest('.card');
                    const title = card.querySelector(".card__title").textContent;
                    const cost = card.querySelector(".price span").textContent;
                    const id = card.id;

                    const food  = cart.find(function (item) {
                        return item.id === id;
                    })
                    if (food) {
                        food.count += 1;
                    }
                    else {
                        cart.push({
                            id,
                            title,
                            cost,
                            count: 1
                        })
                    }
                    console.log(cart);
                }
            }
        });
    }
}

function changeCount(event) {
    if(event.target.classList.contains('quantity-btn'))  {
        const food = cart.find(function(item) {
            return item.id === event.target.dataset.id;
        });
        if(event.target.classList.contains('minus'))  {
            food.count--;
            if (food.count < 0) {
                cart.splice(cart.indexOf(food), 1)
            }
        }
        if(event.target.classList.contains('plus')) {
            food.count++;
        }
        renderItemsCart();
    }
}

mainCartList.addEventListener('click', changeCount);

function renderItemsCart() {
    mainCartList.textContent = "";
    cart.forEach(function ({id, title, cost, count}) {
        const itemCart = `
                <div class="cart-list">
                    <div class="cart-item">
                        <span class="item-name">${title}</span>
                        <div class="item-price__inner">
                            <strong class="price">${cost}</strong>
                            <div class="quantity">
                                <button class="quantity-btn minus" data-id = ${id}>-</button>
                                <input class="quantity-value" type="number" min="0" max="999" value="${count}">
                                <button class="quantity-btn plus" data-id = ${id}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        mainCartList.insertAdjacentHTML('afterbegin', itemCart);
    })

    const totalPrice = cart.reduce(function (result, item) {
        return result + (parseFloat(item.cost)*item.count);
    }, 0)

    modalPriceTag.textContent = totalPrice + " Грн";
}

function openGoods(event) {
    const typeRestaurant = event.target.closest("a").dataset.products;
    const shopName = event.target.closest("a").querySelector('h3').textContent;
    const shopRate = event.target.closest("a").querySelector('.rate').textContent;
    const shopPrice = event.target.closest("a").querySelector('.price').textContent;
    const shopType = event.target.closest("a").querySelector('.type').textContent;
    localStorage.setItem('shopName', shopName);
    localStorage.setItem('shopRate', shopRate);
    localStorage.setItem('shopPrice', shopPrice);
    localStorage.setItem('shopType', shopType);
    localStorage.setItem('card', typeRestaurant);
    console.log(typeRestaurant);
    if (typeRestaurant) {
        // document.location.href = "/restaurant-shop.html";
    }
}


