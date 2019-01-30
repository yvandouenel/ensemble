jQuery(function ($) {
    // récupération des éléments de base
    const base_path = window.location.origin;
    const headband_src = $(".basic-image img").attr("src");
    const img_from = [];
    let new_nl_item;

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
        
    });
    $(".newsletter-to-duplicate").each(function(i){
        console.log("image " + i + " : " + img_from[i].attr("src"));
        
        $(".newsletter-img",$(this)).attr("src",img_from[i].attr("src"));
    });

    console.log(img_from);
});