  
  mapboxgl.accessToken = "pk.eyJ1IjoiYWJoYXlrNiIsImEiOiJja3MwMGk4djkwM2lwMm5xbXB1MGFnamx4In0.aPF1rP6B7zA8s4TJ5_JliQ";
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: camp.geometry.coordinates, // starting position [lng, lat]
  zoom: 9 // starting zoom
  })

  const marker1 = new mapboxgl.Marker()
  .setLngLat(camp.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h6>' + camp.title + '</h6>'))
  .addTo(map);





  