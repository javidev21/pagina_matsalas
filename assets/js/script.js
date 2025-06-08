'use strict';

/**
 * add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header & back top btn active when window scroll down to 100px
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const showElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", showElemOnScroll);

document.addEventListener('DOMContentLoaded', function() {
  const buyBtns = document.querySelectorAll('.buy-btn');
  const phoneNumber = '526751056874'; // Reemplaza con tu número de WhatsApp

  buyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const product = btn.dataset.product || 'producto';
      const message = encodeURIComponent(`Hola, quiero comprar el producto: ${product}`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });
  });
});

/**
 * product filter
 */
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const productItems = document.querySelectorAll('.grid-list.product-list > li');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Quitar clase activa de todos los botones
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const selectedFilter = this.dataset.filterBtn;

      productItems.forEach(item => {
        if (selectedFilter === "all") {
          item.style.display = "";
        } else {
          item.style.display = item.classList.contains(selectedFilter) ? "" : "none";
        }
      });
    });
  });
});

/**
 * Favoritos: agregar/quitar y actualizar contador
 */
document.addEventListener('DOMContentLoaded', function() {
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  const favoriteCount = document.getElementById('favorite-count');

  // Cargar favoritos de LocalStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Actualiza el contador
  function updateFavoriteCount() {
    favoriteCount.textContent = favorites.length;
  }

  // Marca los favoritos ya seleccionados
  function markFavorites() {
    favoriteBtns.forEach(btn => {
      const product = btn.dataset.product;
      if (favorites.includes(product)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Evento para agregar/quitar favoritos
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const product = btn.dataset.product;
      if (favorites.includes(product)) {
        favorites = favorites.filter(fav => fav !== product);
      } else {
        favorites.push(product);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateFavoriteCount();
      markFavorites();
    });
  });
  updateFavoriteCount();
  markFavorites();
});