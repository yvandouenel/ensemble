(function ($) {
  if ($("#map").length) {
    // variables
    var
      lat,
      long,
      adresse,
      title,
      image,
      description,
      event_type,
      event_date,
      event_minutes,
      event_short_date,
      marker_class;
    var legend_tab = [];
    var relative_dates_tab = [];
    var markers_this_week_tab = [];
    var markers_second_week_tab = [];
    var markers_third_week_tab = [];
    var markers_fourth_week_tab = [];
    var markers_fifth_week_tab = [];
    var markers_more_mont_tab = [];
    marker = [];
    var months = [];
    initiateMonth();
    function initiateMonth () {
      months[0] = "janv.";
      months[1] = "fev.";
      months[2] = "mars";
      months[3] = "avril";
      months[4] = "mai";
      months[5] = "juin";
      months[6] = "juillet";
      months[7] = "août";
      months[8] = "sep.";
      months[9] = "oct.";
      months[10] = "nov.";
      months[11] = "déc.";
    }


    // Récupération des dates relatives
    getRelativeDatesTab();

    // Add basemap tiles and attribution.
    var baseLayer = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
      attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
      '<a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    // Create map and set center and zoom.
    var map = L.map('map', {
      scrollWheelZoom: true,
      center: [43.587709, 3.919725],
      zoom: 12
    });

    // Add basemap to map.
    map.addLayer(baseLayer);
    // Path to map icons
    L.Icon.Default.imagePath = '/themes/contrib/ensemble/less/images/leaflet/';
    //var marker = L.marker([43.591735400166904, ]).addTo(map);

    // points from drupal view
    $.getJSON('/events', function (data) {
      addDataToMap(data, map);
    });


    // Add Marker and pop up message and manage dates
    function addDataToMap(data, map) {
      for (var i = 0; i < data.features.length; i++) {
        lat = data.features[i].geometry.coordinates[1];
        long = data.features[i].geometry.coordinates[0];
        adresse = data.features[i].properties.adresse;
        title = data.features[i].properties.name;
        image = data.features[i].properties.image;
        description = data.features[i].properties.description;
        event_type = data.features[i].properties.type;
        event_date = data.features[i].properties.date;
        event_short_date = data.features[i].properties.short_date;
        marker_class = getMarkerClass(event_type);
        var event_date = new Date(event_date);
        event_minutes = (event_date.getMinutes() > 9) ? event_date.getMinutes() : "0" + event_date.getMinutes();

        //console.log(lat + " - " + long+ " - " + title+ " - " + description + " - " + event_type);
        marker[i] = new L.Marker([lat, long], {
          icon: new L.DivIcon({
            className: 'my-div-icon',
            html: '<div class="marker-glyphicon ' + marker_class + '"></div>' +
            '<div class="event-short-date">' + event_short_date + '</div>'
          })
        }).addTo(map);
        marker[i].bindPopup(
          image +
          "<h3>" + title + "</h3>" +
          event_short_date + " - " +
          event_date.getHours() + "h" + event_minutes + " - " + adresse +
          description
          );
        legend_tab[marker_class] = event_type;

        // on ajoute des marqueurs dans les tableaux en fonction de la date
        if (event_date < relative_dates_tab["next_monday"]) {
          markers_this_week_tab.push(marker[i]);
        }
        else if (event_date >= relative_dates_tab["next_monday"] && event_date < relative_dates_tab["second_monday"]) {
          markers_second_week_tab.push(marker[i]);
        }
        else if (event_date >= relative_dates_tab["second_monday"] && event_date < relative_dates_tab["third_monday"]) {
          markers_third_week_tab.push(marker[i]);
        }
        else if (event_date >= relative_dates_tab["third_monday"] && event_date < relative_dates_tab["fourth_monday"]) {
          markers_fourth_week_tab.push(marker[i]);
        }
        else if (event_date >= relative_dates_tab["fourth_monday"] && event_date < relative_dates_tab["fifth_monday"]) {
          markers_fifth_week_tab.push(marker[i]);
        }
        else if (event_date >= relative_dates_tab["fifth_monday"] ) {
          markers_more_mont_tab.push(marker[i]);
        }
      }
      addLegend(legend_tab);
      addDateLegend();
    }

    // Gestion des événements
    $("#hide-markers").click(function () {
      for (var i = 0; i < marker.length; i++) {
        map.removeLayer(marker[i]);
      }
    });
    $("#show-markers").click(function () {
      for (var i = 0; i < marker.length; i++) {
        marker[i].addTo(map);
        $(".date-legend").removeClass("selected-period");
        $(this).addClass("selected-period");
      }
    });

    function addLegend(legend_tab) {
      var cpt = 0;
      for (var key in legend_tab) {
        //console.log("cle : " + key + " - valeur : " + legend_tab[key]);
        if (!cpt) {
          $("<span></span>", {
            "class": "label-legend",
            text: "Légende : ",
          }).appendTo("#map-legend");
        } else {
          $("<span></span>", {
            "class": "label-separator",
            text: " - ",
          }).appendTo("#map-legend");
        }

        $("<span></span>", {
          "class": key + " legend",
          text: legend_tab[key],
        }).appendTo("#map-legend");
        cpt++;
      }
    }

    function addDateLegend() {

      if (markers_this_week_tab.length) {
        $("<span></span>", {
          "class": "date-legend",
          text: "Cette semaine",
        }).appendTo("#date-markers-legend").click(function () {
          for (var i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
          }
          for (var j = 0; j < markers_this_week_tab.length; j++) {
            markers_this_week_tab[j].addTo(map);
          }
          $(".date-legend").removeClass("selected-period");
          $(this).addClass("selected-period");
        });
      }
      if (markers_second_week_tab.length) {
        $("<span></span>", {
          "class": "date-legend",
          text: relative_dates_tab["next_monday"].getDate() +
          " " + ((relative_dates_tab["next_monday"].getDate() > 24) ? months[relative_dates_tab["next_monday"].getMonth()] : "")  +
          " > " + (relative_dates_tab["second_monday"].getDate() - 1) +
          " " + months[relative_dates_tab["second_monday"].getMonth()],
        }).appendTo("#date-markers-legend").click(function () {
          for (var i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
          }
          for (var j = 0; j < markers_second_week_tab.length; j++) {
            markers_second_week_tab[j].addTo(map);
          }
          $(".date-legend").removeClass("selected-period");
          $(this).addClass("selected-period");
        });
      }
      if (markers_third_week_tab.length) {
        $("<span></span>", {
          "class": "date-legend",
          text: relative_dates_tab["second_monday"].getDate() +
          " " + ((relative_dates_tab["second_monday"].getDate() > 24) ? months[relative_dates_tab["second_monday"].getMonth()] : "")  +
          " > " + (relative_dates_tab["third_monday"].getDate() - 1) +
          " " + months[relative_dates_tab["third_monday"].getMonth()],
        }).appendTo("#date-markers-legend").click(function () {
          for (var i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
          }
          for (var j = 0; j < markers_third_week_tab.length; j++) {
            markers_third_week_tab[j].addTo(map);
          }
          $(".date-legend").removeClass("selected-period");
          $(this).addClass("selected-period");
        });
      }
      if (markers_fourth_week_tab.length) {
        $("<span></span>", {
          "class": "date-legend",
          text: relative_dates_tab["third_monday"].getDate() +
          " " + ((relative_dates_tab["third_monday"].getDate() > 24) ? months[relative_dates_tab["third_monday"].getMonth()] : "") +
          " > " + (relative_dates_tab["fourth_monday"].getDate() - 1) +
          " " + months[relative_dates_tab["fourth_monday"].getMonth()],
        }).appendTo("#date-markers-legend").click(function () {
          for (var i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
          }
          for (var j = 0; j < markers_fourth_week_tab.length; j++) {
            markers_fourth_week_tab[j].addTo(map);
          }
          $(".date-legend").removeClass("selected-period");
          $(this).addClass("selected-period");
        });
      }
      if (markers_fifth_week_tab.length) {
        $("<span></span>", {
          "class": "date-legend",
          text: relative_dates_tab["fourth_monday"].getDate() +
          " " + ((relative_dates_tab["fourth_monday"].getDate() > 24) ? months[relative_dates_tab["fourth_monday"].getMonth()] : "") +
          " > " + (relative_dates_tab["fifth_monday"].getDate() - 1) +
          " " + months[relative_dates_tab["fifth_monday"].getMonth()],
        }).appendTo("#date-markers-legend").click(function () {
          for (var i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
          }
          for (var j = 0; j < markers_fifth_week_tab.length; j++) {
            markers_fifth_week_tab[j].addTo(map);
          }
          $(".date-legend").removeClass("selected-period");
          $(this).addClass("selected-period");
        });
      }
      if (markers_more_mont_tab.length) {
        $("<span></span>", {
          "class": "date-legend",
          text: "après le " +
          (relative_dates_tab["fifth_monday"].getDate() - 1) +
          " " + months[relative_dates_tab["fifth_monday"].getMonth()],
        }).appendTo("#date-markers-legend").click(function () {
          for (var i = 0; i < marker.length; i++) {
            map.removeLayer(marker[i]);
          }
          for (var j = 0; j < markers_more_mont_tab.length; j++) {
            markers_more_mont_tab[j].addTo(map);
          }
          $(".date-legend").removeClass("selected-period");
          $(this).addClass("selected-period");
        });
      }
    }

    function getMarkerClass(event_type) {
      if (event_type == "social") {
        marker_class = "social";
      } else if (event_type == "ensemble") {
        marker_class = "ensemble";
      } else if (event_type == "écologie") {
        marker_class = "ecologie";
      } else if (event_type == "international") {
        marker_class = "international";
      } else if (event_type == "réunion de comité") {
        marker_class = "rc";
      } else {
        marker_class = "no-type";
      }
      return marker_class;
    }


    function getRelativeDatesTab() {
      var next_monday = new Date();
      next_monday.setHours(00);
      next_monday.setDate(next_monday.getDate() + ((7 - next_monday.getDay()) % 7 + 1) % 7);
      relative_dates_tab["next_monday"] = next_monday;

      var second_monday = new Date(next_monday);
      second_monday.setHours(00);
      second_monday.setDate(second_monday.getDate() + 7);
      relative_dates_tab["second_monday"] = second_monday;

      var third_monday = new Date(next_monday);
      third_monday.setHours(00);
      third_monday.setDate(third_monday.getDate() + 14);
      relative_dates_tab["third_monday"] = third_monday;

      var fourth_monday = new Date(next_monday);
      fourth_monday.setHours(00);
      fourth_monday.setDate(fourth_monday.getDate() + 21);
      relative_dates_tab["fourth_monday"] = fourth_monday;

      var fifth_monday = new Date(next_monday);
      fifth_monday.setHours(00);
      fifth_monday.setDate(fifth_monday.getDate() + 28);
      relative_dates_tab["fifth_monday"] = fifth_monday;
    }
  }

})(jQuery);