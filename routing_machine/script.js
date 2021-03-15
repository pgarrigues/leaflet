// vérif page bien chargée :
window.onload = () => {
  var mymap = L.map("map").setView([48.856614, 2.3522219], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    attribution:
      'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 1,
    maxZoom: 20,
  }).addTo(mymap);

  // Géocodeur :
  //   L.Control.geocoder().addTo(mymap);

  //   L.Routing.control({
  //     waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
  //   }).addTo(mymap);

  //   L.Routing.control({
  //     geocoder: L.Control.Geocoder.nominatim(),
  //   }).addTo(mymap);

  L.Routing.control({
    lineOptions: {
      styles: [{ color: "#fd0a0a", opacity: 1, weight: 3 }],
    },
    router: new L.Routing.osrmv1({
      language: "fr",
      profile: "car", // car, bike, foot
    }),
    geocoder: L.Control.Geocoder.nominatim(),
  }).addTo(mymap);
};
