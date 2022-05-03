// форма отправки оповещения в телеграм

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
