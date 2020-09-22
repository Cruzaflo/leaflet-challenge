//geoJSON data URL
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Create map
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
})

//add tile layer to map
streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "CruzafloolfazurCCruzafloolfazurCCruzafloolfazurC",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap)

//qury the geoJSON data URL
d3.json(queryUrl, function(data){
    //create features for the map based on the data features
    createFeatures(data.features)
})

//create legend
var legend = L.control({
    position: "bottomright"
})

legend.onAdd = function (){
    var div = L.DomUtil.create("div", "info legend")
    var depths = [-10, 10, 30, 5, 70, 90]
    var colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"]
    for (i = 0; i < colors.length; i++){
        div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
        + depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+")
       // div.innerHTML += `<i style='background: ${colors[i]}></i>${grades[i]} (${grades[i + 1]} ?)`
    }
    return div
}

legend.addTo(myMap)

//function to create features for the map
function createFeatures(dataFeatures) {
    //create popup for each point containing the location and date of the earthquake
    function onEachFeature (feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
    }
    //create a function to determine the color of each circle marker
    function circleColor(depth){
        if (depth > 90){
          return "#ea2c2c"
        }
        else if (depth > 70){
          return "#ea822c"
        }
        else if (depth > 50){
          return "#ee9c00"
        }
        else if (depth > 30){
          return "#eecc00"
        }
        else if (depth > 10){
          return "#d4ee00"
        }
        else {
          return "#98ee00"
        }
      }
    
    //create function to determine the circle radius of the circle marker
    function circleRadius(magnitude){
        if (magnitude > 0){
          return magnitude * 5
            }
        else {
          return 1
            }
        }
    //create function to set the marker optons object
    function pointToLayer(feature, latlng){
        var geojsonMarkerOptions = {
          radius: circleRadius(feature.properties.mag),
          fillColor: circleColor(feature.geometry.coordinates[2]),
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.5
          }
        return L.circleMarker(latlng, geojsonMarkerOptions)
        }
    //define the geoJSON features
    var earthquakes = L.geoJSON(dataFeatures,{
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer
    })
    //add the features to the map
    earthquakes.addTo(myMap)
}
