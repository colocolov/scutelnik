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

//

const form = document.querySelector(".footer__form");

const sendForm = (data) => {
  return fetch("tl.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  }).then((res) => res.json());
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataForm = new FormData(form);
  const user = {};

  dataForm.forEach((val, key) => {
    user[key] = val;
    // console.log((user[key] = val));
  });

  sendForm(user).then((data) => {
    console.log("Успешно!");
  });

  form.reset();
});
