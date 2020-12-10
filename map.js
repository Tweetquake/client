require(["esri/Map", "esri/views/MapView", "esri/widgets/BasemapToggle",
    "esri/layers/GeoJSONLayer", "esri/widgets/LayerList"],
    function(
    Map,
    MapView,
    BasemapToggle,
    GeoJSONLayer,
    LayerList
) {
    // Create templates for the layers
    // Tweets template
    const template_tweets = {
            title: "Tweet di {author} da {place}, {time_posted}",
            content: "'{text}'",
            fieldInfos: [
                {
                    fieldName: "time_posted",
                    format: {
                        dateFormat: "long-month-day-year-short-time-24"
                    }
                }]
    };
    // Area at risk template
    const template_risking_area = {
        title: "Area a rischio",
        content: "Popolazione totale: {population}"
    };
    // Seismogenic faults template
    const template_faults = {
        title: "Faglie attive candidate",
        content: "Probabilità: {probability}",
    };
    // Municipalities at risk template
    const template_municipalities = {
        title: "Comune di {name} ({province})",
        content: "Numero di abitanti: {population}"
    };

    // Create renderers for the layers
    // Tweets renderer
    const renderer_tweets = {
        type: "simple",
        symbol: {
            type: "simple-marker",
            size: 6,
            color: "0ED2F9",
            outline: {
                width: 0.5,
                color: "white"
            }
        }
    }

    // Create GeoJSON layers
    // Create GeoJSONLayer for tweets
    var geojsonLayer_tweets = new GeoJSONLayer({
        url: "tweets.geojson",
        title: 'Tweets',
        popupTemplate: template_tweets,
        renderer: renderer_tweets
    });

    // Create GeoJSONLayer for seismogenic faults
    var geojsonLayer_faults = new GeoJSONLayer({
        url: "faults.geojson",
        title: 'Seismogenic Faults',
        popupTemplate: template_faults
    });

    // Create GeoJSONLayer for area at risk
    var geojsonLayer_risking_area = new GeoJSONLayer({
        url: "area_at_risk.geojson",
        title: 'Risking Area',
        popupTemplate: template_risking_area
    });

    // Create GeoJSONLayer for municipalities at risk
    var geojsonLayer_municipalities = new GeoJSONLayer({
        url: "municipalities.geojson",
        title: 'Municipalities',
        popupTemplate: template_municipalities
    });


    // Create the Map with an initial basemap
    var map = new Map({
        basemap: "hybrid",
        layers: [geojsonLayer_risking_area,geojsonLayer_faults,geojsonLayer_municipalities,geojsonLayer_tweets]
    });

    // Create the MapView and reference the Map in the instance
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [12.492373, 41.890251],
        zoom: 6
    });

    // 1 - Create the widget
    var toggle = new BasemapToggle({
        // 2 - Set properties
        view: view, // view that provides access to the map's 'hybrid' basemap
        nextBasemap: "osm" // allows for toggling to the 'osm' basemap
    });

    var layerList = new LayerList({
        view: view,

    });

    // Add widget to the top right corner of the view
    view.ui.add(toggle, "top-right");

    // Add widget to the bottom right corner of the view
    view.ui.add(layerList, "bottom-right");

    view.padding.left = 320;
});