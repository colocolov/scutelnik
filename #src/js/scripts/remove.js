$(window).on("load resize", function () {
  if ($(window).width() < 768) {
    $("#cut").insertAfter("#insert");
  }
});
