(function ($) {

  console.log("dans incentive");

  if($(".field--name-field-argumentaires .field--item").length) {
    moveLinkArgument();
  }
  function moveLinkArgument() {
    $(".field--name-field-argumentaires .field--item a").insertAfter("#pause-cafe").addClass("link-to-arg");
    $
  }
})(jQuery);