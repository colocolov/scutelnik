// мобильное меню

// проверка, является ли уствройство мобильным
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  // document.querySelector('html').classList.add('_touch');
  document.body.classList.add("_touch");
}

//выпадающее меню для мобильных устройств
document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;
  if (window.innerWidth > 768 && isMobile.any()) {
    if (targetElement.classList.contains("nav__link")) {
      // console.log("ehhh");
      targetElement.closest(".nav__item").classList.toggle("_hover");
    }
    if (
      !targetElement.closest(".nav__item") &&
      document.querySelectorAll(".nav__item._hover").length > 0
    ) {
      let element = document.querySelector(".nav__item._hover");
      element.classList.remove("_hover");
    }
  }

  if (window.innerWidth > 768 && isMobile.any()) {
    if (
      targetElement.closest(".nav__arrow") &&
      !targetElement.closest(".sub-menu")
    ) {
      e.preventDefault();
      targetElement.closest(".nav__item").classList.toggle("_hover");
    }
    if (
      !targetElement.closest(".nav__item") &&
      document.querySelectorAll(".nav__item._hover").length > 0
    ) {
      let element = document.querySelector(".nav__item._hover");
      element.classList.remove("_hover");
    }
  }
}

// меню бургер
const header = document.querySelector(".header");
const iconMenu = document.querySelector(".nav__icon");
const menuBody = document.querySelector(".nav__body");
const menuList = document.querySelector(".nav__list");
const menuArrow = document.querySelector(".nav__arrow > a");
const menuLink = document.querySelectorAll(".nav__item");

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    menuList.classList.toggle("_active");
    menuArrow.remove();
  });
}

// закрытие при клике
menuLink.forEach((item, i) => {
  item.addEventListener("click", () => {
    document.body.classList.remove("_lock");
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
    menuList.classList.remove("_active");
  });
});
