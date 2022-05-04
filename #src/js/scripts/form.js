// форма отправки оповещения в телеграм
const form = document.querySelector(".footer__form");

const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask("+373 (99) 999-999");
inputMask.mask(telSelector);

// const validation = new JustValidate("#fform");
const validation = new JustValidate("#fform");

validation
  .addField("#name", [
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Минимальная длина имени: 3 буквы",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Имя слишком длинное!",
    },
    {
      rule: "required",
      value: true,
      errorMessage: "Введите имя!",
    },
  ])
  .addField("#telephone", [
    {
      rule: "required",
      value: true,
      errorMessage: "Введите телефон!",
    },
    {
      rule: "function",
      validator: function () {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 8;
      },
      errorMessage: "Введите корректный номер телефона!",
    },
  ])
  .onSuccess((e) => {
    // сама форма обраюотки

    const sendForm = (data) => {
      return fetch("send.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": true,
        },
      }).then((res) => res.json());
    };

    // form.addEventListener("submit", (e) => {
    //   e.preventDefault();

    const dataForm = new FormData(e.target);
    const user = {};

    dataForm.forEach((val, key) => {
      user[key] = val;
      // console.log((user[key] = val));
    });

    sendForm(user).then((data) => {
      // console.log("Успешно!");
      // modal.classList.add("active");
      // time();
    });

    e.target.reset();

    function time() {
      document.querySelector('div[class="modal"]').classList.add("active");
      document.body.classList.add("_lock");
    }
    setTimeout(time, 500);

    // });
    // конец формы
  });

//*----
