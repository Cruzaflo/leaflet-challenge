# leaflet-challenge
This repository containes the following files:

index.html 
static/js/logic.js
static/css/style.css

The index.html file is the main webpage for the front end of this project. The logic.js file contains all the javascript used. The styl.css file contains some styles for the html. 

This project maps earthquake data from the past 7 days. 
The data is in geoJSON format and provided from the following link: 
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

Leaflet is used in Javascript to generate the map. The map uses circles as points to plot the coordinates of the earthquakes. The darkness of the circle is dependent on the depth of the earthquake. The greater depth an earthquake has, the darker the circle will be. Also, the size of the circle is dependent on the magnitude of the earthquake. The greater the magnitude, the larger the circle. 
