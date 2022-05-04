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
