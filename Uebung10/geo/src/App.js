import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import axios from "axios";
import {TextField} from '@mui/material';

import 'leaflet/dist/leaflet.css';
import { Grid } from '@mui/material';


function App() {
  
  const [startlat, setStartLatidue]= useState(47.5349);
  const [startlng, setStartLontigue]= useState(7.6415);
  const [endlat, setEndLatidue]= useState(8.9738);
  const [endlng, setEndLontigue]= useState(-79.506);
  const [point, setPoint]=useState(100);



  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const geoJSONLayer =useRef(null);

  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    }, []);

  useEffect(() => {
    if(geoJSONLayer.current){
      geoJSONLayer.current.clearLayers().addData(data);
    }
  },[data]); 

  function do_download() {
    // TODO: Parametrisieren
    var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${startlat}&startlng=${startlng}&endlat=${endlat}&endlng=${endlng}&pts=${point}`;

  

    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
    <h1>Geodetic Line</h1>
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField label= "Start Breite" variant= "outlined" defaultValue={startlat} onChange= {(event)=> {setStartLatidue(event.target.value)}}/>
      </Grid>
      <Grid item xs={3}>
        <TextField label= "Start Länge" variant= "outlined" defaultValue={startlng} onChange= {(event)=> {setStartLontigue(event.target.value)}}/>
      </Grid>
      <Grid item xs={3}>
        <TextField label= "Ende Breite" variant= "outlined" defaultValue={endlat} onChange= {(event)=> {setEndLatidue(event.target.value)}}/>
      </Grid>
      <Grid item xs={3}>
        <TextField label= "Ende Länge" variant= "outlined" defaultValue={endlng} onChange= {(event)=> {setEndLontigue(event.target.value)}}/>
      </Grid>
      <Grid item xs={3}>
        <TextField label= "Anzahl Punkte" variant= "outlined" defaultValue={point} onChange= {(event)=> {setPoint(event.target.value)}}/>
      </Grid>
      <Grid item xs={3}>
        <Button variant='contained' onClick={() => {do_download()}} > Convert in to Line</Button>
      </Grid>
    </Grid>


      

      {!data &&
      <Button variant="contained" onClick={() => { do_download() }}>
          Convert
        </Button>
      }
   
      {loading && <>
                     <div>API Aufruf, bitte warten!</div><br/>
                  </>
      }

      {error &&   <>
                     <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br/>
                  </>}

      {data &&  <>
                  <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
                    style={{ height: "600px", width: "100%" }} >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                  
                  <GeoJSON data={data} ref={geoJSONLayer}style={{ weight: 8, opacity: '30%', color: 'green'}}/>

                  </MapContainer>
                </>}
  
      </>
  );
}

export default App;
