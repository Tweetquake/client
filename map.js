require(["esri/Map", "esri/views/MapView", "esri/widgets/BasemapToggle", "esri/layers/GeoJSONLayer"], function(
    Map,
    MapView,
    BasemapToggle,
    GeoJSONLayer
) {
    // Create GeoJSONLayer
    var geojsonLayer = new GeoJSONLayer({
        url: "areaatrisk.geojson" //or try "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
    });

    // Create the Map with an initial basemap
    var map = new Map({
        basemap: "hybrid",
        layers: [geojsonLayer]
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

    // Add widget to the top right corner of the view
    view.ui.add(toggle, "top-right");
});