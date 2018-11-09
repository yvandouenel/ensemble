jQuery(function($) {
  console.log("dans manage date");
  var
    from_date,
    to_date,
    from_year_date,
    to_year_date,
    msg_date,
    url_data,
    options;
/* Gestion des dates des événments pour la page d'accueil *************************************************************/
  $("#views-bootstrap-frontpage-page-1 > .row > .col").each(function(){
    manageDates($(this));
  });

  /* Gestion des dates des événments pour la page des réunions ensemble ***********************************************/
  $("#views-bootstrap-events-block-reunion-ensemble > .row > .col").each(function(){
    console.log("dans la boucle");
    manageDates($(this));
  });


  function manageDates(this_event) {
    url_data = $(".field--name-node-link a", this_event).attr("href");

    if($(".field--name-field-date .field--item",this_event).length > 1) {
      console.log("Cas de plusieurs dates");
      from_date = $(".field--name-field-date .field--item:first", this_event).text();
      to_date = $(".field--name-field-date .field--item:last", this_event).text();

      from_date = new Date(from_date);
      if (from_date.getMonth() < 11) {
        from_date.setMonth(from_date.getMonth() + 1);
      } else {
        from_date.setMonth(1);
      }

      to_date = new Date(to_date);
      if (to_date.getMonth() < 11) {
        to_date.setMonth(from_date.getMonth() + 1);
      } else {
        to_date.setMonth(1);
      }

      options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      msg_date =
        from_date.getDate() + "/" + parseInt(from_date.getMonth()) + "/" + from_date.getFullYear() +
        " > " + to_date.getDate() + "/" + parseInt(to_date.getMonth()) + "/" + to_date.getFullYear() ;

      $(".field--name-field-date", this_event).html("")
      $(".field--name-field-date", this_event).text(msg_date)
    }
    else if ($(".field--name-field-date .field--item",this_event).length == 1) {
      console.log("Cas d'une date");
      from_date = $(".field--name-field-date .field--item:first",this_event).text();
      from_date = new Date(from_date);
      from_date.setMonth(from_date.getMonth() + 1);
      options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      from_date = from_date.toLocaleDateString('fr-FR', options);
      $(".field--name-field-date", this_event).html("")
      $(".field--name-field-date", this_event).text(from_date);
    }
    // wrap date in a link
    $(".date-display-single",this_event).wrap( '<a href="' + url_data + '"></a>' );
  }

  function customGetMonth(d) {
    console.log("mois : " + d);
    if(d.getMonth() < 10) {
      return "0" + d.getMonth();
    } else return d.getMonth();
  }
  function customGetDate(d) {
    if(d.getDate() < 10) {
      return "0" + d.getDate();
    } else return d.getDate();
  }

});