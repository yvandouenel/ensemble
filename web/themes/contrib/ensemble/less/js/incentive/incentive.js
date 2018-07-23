(function ($) {

  console.log("dans incentive");

  if($(".field--name-field-argumentaires .field--item").length) {
    moveLinkArgument();
  }
  if($(".webform-submission-form").length) {
    moveWebform();
  } else {
    $("#custom-form-this-event").hide();
  }

  function moveLinkArgument() {
    $(".field--name-field-argumentaires .field--item a").insertAfter("#pause-cafe").addClass("link-to-arg");
  }

  function moveWebform() {
    $(".webform-submission-form").appendTo("#custom-form-this-event").hide();
    $("#custom-link-this-event").click(function(e) {
      e.preventDefault();
      $(".webform-submission-form").slideToggle();
    });
  }

})(jQuery);