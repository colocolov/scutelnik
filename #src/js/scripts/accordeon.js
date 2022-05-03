// accordeon
const servicesBtn = document.querySelector(".services__btn");
const servicesAll = document.querySelector(".services__all");
const works = document.querySelector(".works");
// const menuLink = document.querySelector(".menu__item");
if (servicesBtn) {
  servicesBtn.addEventListener("click", function (e) {
    // document.body.classList.toggle("_lock");
    servicesBtn.classList.toggle("active");
    servicesAll.classList.toggle("active");
    works.classList.toggle("active");

    // смена текста на кнопке "Все услуги" при клике
    if (servicesBtn.classList.contains("active")) {
      // console.log("yes");
      servicesBtn.textContent = "Закрыть";
    } else {
      servicesBtn.textContent = "Все услуги";
    }
  });
}
