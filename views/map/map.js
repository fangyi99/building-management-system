mapboxgl.accessToken =
    "pk.eyJ1IjoiZmFuZ3lpOTkiLCJhIjoiY2wxNG9rYXZrMDg0azNqcDhlYjczNWwzNiJ9.xFpknuWLdbEXxke53ikprw";
//create map
var map = new mapboxgl.Map({
    container: "map",
    center: [103.8194992, 1.357107],
    zoom: 10.8,
    style: "mapbox://styles/mapbox/streets-v11",
});

//create popup
const popup = new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: false,
    offset: 25,
}).setText("Clementi Mall");

//create DOM element for the marker
const marker = document.createElement("div");
marker.id = "marker";

//create marker
new mapboxgl.Marker(marker)
    .setLngLat([103.764536, 1.315419])
    .setPopup(popup)
    .addTo(map)
    .togglePopup();

marker.addEventListener("click", navigateToDirectory, false);

function navigateToDirectory() {
    window.location.href = "../directory/directory.html";
}