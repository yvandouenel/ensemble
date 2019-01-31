jQuery(function ($) {
    // récupération des éléments de base
    const base_path = window.location.origin;
    const headband_src = $(".basic-image img").attr("src");
    const img_from = [];
    const title_from = [];
    const txt_from = [];
    const dates_from = [];
    const location_from = [];
    const event_url_from = [];

    // modification des styles de base de la newsletter
    const head_band_div_dest = $("#newsletter-div-headband");
    // remplacement 
    console.log(head_band_div_dest.attr("style"));
    
    //console.log("base path : " + base_path);
    console.log("url image bandeau : " + base_path + headband_src);
    
    // récupération des événénement provenant de la vue
    $("#basic-events-from-view > div > div > div.field--item").each(function(i) {
        // clonage des articles de la newsletter 
        if(i) $(".newsletter-to-duplicate:first").clone().insertAfter($(".newsletter-to-duplicate:first") );
        
        // récupération des images
        $(".img-responsive", $(this)).each(function() {
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
        $(".field--name-field-address .field--item", $(this)).each(function() {
            location_from.push($(this));
        });
        
    });
    $(".newsletter-to-duplicate").each(function(i){
        console.log("image " + i + " : " + img_from[i].attr("src"));
        // remplacement des images
        $(".newsletter-img",$(this)).attr("src",img_from[i].attr("src"));

        // remplacement des titres
        $(".newsletter-title-event a",$(this)).text(title_from[i].text()).attr("href",base_path + title_from[i].attr("href"));

        // remplacement des textes
        $(".newsletter-paragraphes",$(this)).html(txt_from[i].html());

        // remplacement des dates
        $(".newsletter-dates",$(this)).html(dates_from[i].html());

        // remplacement de l'adresse
        $(".newsletter-address",$(this)).text(location_from[i].text());

        // remplacement des liens lire la suite
        $(".newsletter-link",$(this)).attr("href",base_path + title_from[i].attr("href"));
    });

    console.log(img_from);
});