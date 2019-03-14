jQuery(function($) {
  // récupération des éléments de base
  const title = $("h2.page-header").text();
  const chapo = $(".field--name-body").html();
  const base_path = window.location.origin;
  const img_from = [];
  const title_from = [];
  const txt_from = [];
  const dates_from = [];
  const location_from = [];
  const base_url = window.location.origin;
  let html_to_copy;
  const has_address = [];

  //on cache les éléments venant de la vue
   $("#basic-fields").css({
        clip: "rect(1px,1px,1px,1px)",
        height: "1px",
        margin: "0",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px"
    });

  // Remplacement du titre et du texte d'introduction
  $("#newsletter-h1").text(title);
  $("#newsletter-chapo").html(chapo);

  // récupération des événénement provenant de la vue
  $("#basic-events-from-view > div > div > div.field--item").each(function(i) {
    // clonage des articles de la newsletter
    if (i)
      $(".newsletter-to-duplicate:first")
        .clone()
        .insertAfter($(".newsletter-to-duplicate:first"));

    // récupération des images
    $(".img-responsive", $(this)).each(function() {
      $(this).attr("src", base_url + $(this).attr("src"));
      img_from.push($(this));
    });

    // récupération des titres
    $(".field--name-node-title h2 a", $(this)).each(function() {
      title_from.push($(this));
    });

    // récupération des textes
    $(".field--name-body", $(this)).each(function() {
      txt_from.push($(this));
    });

    // récupération des dates
    $(".field--name-field-date .field--items", $(this)).each(function() {
      dates_from.push($(this));
    });

    // récupération de l'adresse
    has_address[i] = false;
    $(".field--name-field-address .field--item", $(this)).each(function() {
      has_address[i] = true;
      location_from.push($(this));
    });
  });
  $(".newsletter-to-duplicate").each(function(i) {
    console.log("image " + i + " : " + img_from[i].attr("src"));
    // remplacement des images
    $(".newsletter-img", $(this)).attr("src", img_from[i].attr("src"));

    // remplacement des titres
    $(".newsletter-title-event a", $(this))
      .text(title_from[i].text())
      .attr("href", base_path + title_from[i].attr("href"));

    // remplacement des textes
    $(".newsletter-paragraphes", $(this)).html(txt_from[i].html());

    // remplacement des dates
    $(".newsletter-dates", $(this)).html(dates_from[i].html());

    // remplacement de l'adresse
    if (has_address[i]) {
      $(".newsletter-address", $(this)).text(location_from[i].text());
    }

    // remplacement des liens lire la suite
    $(".newsletter-link", $(this)).attr(
      "href",
      base_path + title_from[i].attr("href")
    );
  });
  console.log("tableau des adresses : ", has_address);
  /******************************************************************************************** */
  html_to_copy = $("#newsletter-rendered").html();
  html_to_copy =
    '<html style="background-color:#F4F4F4;">' + html_to_copy + "</html>";
  $(".field--name-field-code-a-copier").text(html_to_copy);
});
