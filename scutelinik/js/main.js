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

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  const _this = this;
  // массив объектов
  this.оbjects = [];
  this.daClassname = "_dynamic_adapt_";
  // массив DOM-элементов
  this.nodes = document.querySelectorAll("[data-da]");

  // наполнение оbjects объктами
  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(",");
    const оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }

  this.arraySort(this.оbjects);

  // массив уникальных медиа-запросов
  this.mediaQueries = Array.prototype.map.call(
    this.оbjects,
    function (item) {
      return (
        "(" +
        this.type +
        "-width: " +
        item.breakpoint +
        "px)," +
        item.breakpoint
      );
    },
    this
  );
  this.mediaQueries = Array.prototype.filter.call(
    this.mediaQueries,
    function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    }
  );

  // навешивание слушателя на медиа-запрос
  // и вызов обработчика при первом запуске
  for (let i = 0; i < this.mediaQueries.length; i++) {
    const media = this.mediaQueries[i];
    const mediaSplit = String.prototype.split.call(media, ",");
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1];

    // массив объектов с подходящим брейкпоинтом
    const оbjectsFilter = Array.prototype.filter.call(
      this.оbjects,
      function (item) {
        return item.breakpoint === mediaBreakpoint;
      }
    );
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });
    this.mediaHandler(matchMedia, оbjectsFilter);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      if (оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(оbject.parent, оbject.element, оbject.index);
      }
    }
  }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === "last" || place >= destination.children.length) {
    destination.insertAdjacentElement("beforeend", element);
    return;
  }
  if (place === "first") {
    destination.insertAdjacentElement("afterbegin", element);
    return;
  }
  destination.children[place].insertAdjacentElement("beforebegin", element);
};

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement("beforebegin", element);
  } else {
    parent.insertAdjacentElement("beforeend", element);
  }
};

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return -1;
        }

        if (a.place === "last" || b.place === "first") {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return 1;
        }

        if (a.place === "last" || b.place === "first") {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};

const da = new DynamicAdapt("max");
da.init();

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

const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal__btn");

// body.classList.add("lock");

modal.addEventListener("click", (e) => {
  const isModal = e.target.closest(".modal__inner");

  if (!isModal) {
    modal.classList.remove("active");
    document.body.classList.remove("_lock");
  }
});

modalBtn.addEventListener("click", (e) => {
  modal.classList.remove("active");
  document.body.classList.remove("_lock");
});

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
