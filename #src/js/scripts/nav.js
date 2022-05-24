// мобильное меню

// меню бургер
const header = document.querySelector(".header");
const iconMenu = document.querySelector(".nav__icon");
const menuBody = document.querySelector(".nav__body");
const menuList = document.querySelector(".nav__list");
const menuLink = document.querySelectorAll(".nav__item");

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    menuList.classList.toggle("_active");
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
