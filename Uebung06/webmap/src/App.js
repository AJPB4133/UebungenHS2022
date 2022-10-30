import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";


import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'


function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);


  const center = [ 
    [46.968872773,7.268042402],
    [47.366075562,7.966750757], 
    [47.552019433,8.228391684],
    [47.601455367,8.182823992]
  ];

  const fillBlueoptions = {fillColor: "blue"};

return (
  <MapContainer center={[46.968872773, 7.966750757]} zoom={7} scrollWheelZoom={true}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  <Circle center= {center[0]} pathOptions={fillBlueoptions} radius={50000}></Circle>
  <Circle center= {center[1]} pathOptions={fillBlueoptions} radius={50000}></Circle>
  <Circle center= {center[2]} pathOptions={fillBlueoptions} radius={50000}></Circle>
  <Circle center= {center[3]} pathOptions={fillBlueoptions} radius={50000}></Circle>
  <Marker position={center[0]}>
    <Popup >
    Kernkraftwerk Mühleberg
    </Popup>
  </Marker>
  <Marker position={center[1]}>
    <Popup>
    Kernkraftwerk Gösgen
    </Popup>
  </Marker>
  <Marker position={center[2]}>
    <Popup>
    Kernkraftwerk Beznau
    </Popup>
  </Marker>
  <Marker position={center[3]}>
    <Popup>
    Kernkraftwerk Leibstadt
    </Popup>
  </Marker>

</MapContainer>
  );
}

export default App;
