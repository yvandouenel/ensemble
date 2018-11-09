jQuery(function ($) {
  $("#block-cartepermanente").hide(0);
  $("<div></div>", {
    id: "button-toggle-map",
    text: "Voir les événements sur une carte",
  }).appendTo("h2.page-header").click(function() {
    $("#block-cartepermanente").slideToggle(1000);
    $(".view-events").toggleClass("view-with-map");
    $("#button-toggle-map").toggleClass("map-open");
    if ($("#button-toggle-map").hasClass("map-open")){
      $("#button-toggle-map").text("Cacher la carte");
    } else {
      $("#button-toggle-map").text("Voir les événements sur une carte");
    }
  });

});