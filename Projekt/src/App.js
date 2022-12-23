import React, {useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import { Alert, AlertTitle, BottomNavigation, Button,  MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import axios from "axios";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper'



import "leaflet/dist/leaflet.css";
import { red } from '@mui/material/colors';






function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const geoJsonLayer = useRef(null);
  const airports = [
    {value: 'London Heathrow Airport', text: 'London Heathrow Airport (England)'},
    {value: 'New York John F. Kennedy Airport', text: 'New York John F. Kennedy Airport (USA)'},
    {value: 'Buenos Aires Ezeiza Airport', text: 'Buenos Aires Ezeiza Airport (Argentinien)'},
    {value: 'Dubai International Airport', text: 'Dubai International Airport (Vereinigten Arabischen Emirate)'},
    {value: 'Zurich Flughafen', text: 'Zürich Flughafen (Schweiz)'},
    {value: 'Palma de Mallorca Aeroport de Son Sant Joan', text: 'Palma de Mallorca Aeroport de Son Sant Joan (Spanien)'},
    {value: 'Aéorport de Paris Charles de Gaulle', text: 'Aéorport de Paris Charles de Gaulle (Frankreich)'},
    {value: 'Flughafen Berlin Brandenburg', text: 'Flughafen Berlin Brandenburg (Deutschland)'},
    {value: 'Flughafen Frankfurt Main', text: 'Flughafen Frankfurt Main (Deutschland)'},
    {value: 'Flughafen Kairo-International', text: 'Flughafen Kairo-International (Ägypten)'},
    {value: 'Hartsfield-Jackson Atlanta Airport', text: 'Hartsfield-Jackson Atlanta Airport (USA)'},
    {value: 'Chicago O’Hare International Airport', text: 'Chicago O’Hare International Airport (USA)'},
    {value: 'Los Angeles International Airport', text: 'Los Angeles International Airport (USA)'},
    {value: 'Las Vegas McCarran International Airport', text: 'Las Vegas McCarran International Airport (USA)'},
    {value: 'Johannesburg O.R Tambo Internation Airport', text: 'Johannesburg O.R Tambo International Airport (RSA)'},
    {value: 'Kapstadt International Airport', text: 'Kapstadt International Airport(RSA)'}
  ]
  const [fin, setfinn] = useState("");
  const [fout, setfoutt] = useState("");
  const mystyle = {padding: 4}
  const mystyle1 = {margin: 8}
  const mystyle2 = {color: "red"}
  const mystyle3 = {padding: 4}
  const mystyle4 = {marginLeft: 15}


  
   


  const style = { 
    appBar: { 
        padding: 5,
        
    }, 
    paper: {
        color: "white", 
        margin: 5, 
        padding: 4,
        fontSize:'30px',   
    }
}


  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    do_download1([-180,90,-180,90]);
    }, []);

  useEffect(() => {
    if (geoJsonLayer.current) {
        geoJsonLayer.current.clearLayers().addData(data);
      }
  }, [data]);

  function do_download1(arry) {
    var url = `https://vm9.sourcelab.ch/geodetic/line?startlat=${arry[1]}&startlng=${arry[0]}&endlat=${arry[3]}&endlng=${arry[2]}&pts=300`;

    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getCord(place) {
    if(place === "London Heathrow Airport") {
      return [-0.451967, 51.470035]
    } else if (place === "New York John F. Kennedy Airport") {
      return [-73.784413, 40.643170]
    } else if (place === "Buenos Aires Ezeiza Airport") {
      return [-58.543104, -34.810920]
    } else if (place === "Dubai International Airport") {
      return [49.823257, 26.460090]
    } else if (place === "Zurich Flughafen") {
      return [8.562591816333036,47.45048786731165]
    } else if (place === "Palma de Mallorca Aeroport de Son Sant Joan") {
      return [2.725343, 39.545208]
    } else if (place === "Aéorport de Paris Charles de Gaulle"){
      return [2.547778, 49.009722]
    } else if (place === "Flughafen Berlin Brandenburg"){
      return [13.500672, 52.362247]
    } else if (place === 'Flughafen Frankfurt Main'){
      return [8.570456,50.033306]
    } else if (place === 'Flughafen Kairo-International'){
      return [31.405556,30.121944]
    } else if (place === 'Hartsfield-Jackson Atlanta Airport'){
      return [-84.427778,33.639167]
    } else if (place === 'Chicago O’Hare International Airport'){
      return [-87.904842, 41.978603 ]
    } else if (place === 'Los Angeles International Airport'){
      return [-118.408075,33.942536]
    } else if (place === 'Las Vegas McCarran International Airport'){
      return [-115.15225,36.080056]
    } else if (place === 'Johannesburg O.R Tambo Internation Airport'){
      return [28.242317,-26.133694]
    } else if (place === 'Kapstadt International Airport'){
      return [18.597222, -33.969444]
    }

  }

  function setfin(ffin) {
    setfinn(ffin)
    if (fout !== null && ffin !== fout){
      setError(null)
      do_download1(getCord(ffin).concat(getCord(fout)))
    } else if (fout === ffin) {
      setError("Start- und Zieldestination können nicht identisch sein, bitte wählen Sie ein anderer Start- oder Zieldestination!")
      
      do_download1(getCord(ffin).concat(getCord(fout)))
    }

  }

  function setfout(ffout) {
    setfoutt(ffout)
    if (fin !== null && fin !== ffout) {
      setError(null)
      do_download1(getCord(fin).concat(getCord(ffout)))
    } else if (ffout === fin) {
      setError("Start- und Zieldestination können nicht identisch sein, bitte wählen Sie ein anderer Start- oder Zieldestination!")
      
      do_download1(getCord(fin).concat(getCord(ffout)))
    }

  }

  return (
    <>
    <AppBar position='sticky' color="primary" style={style.appBar}> 
      <Toolbar > 
        <Grid container justifyContent="flex-end"  background-color="primary"> 
          <Grid item xs={12} sm={12} md='flex'  > 
            <Typography style={style.paper}>Darstellung verschiedener Flugrouten</Typography> 
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
        <Grid container justifyContent='flex-end'>   
          <Grid item xs={12} sm={4} md='flex' padding={2}> 
            <Typography h2> <strong>Bitte wählen Sie ihre gewünschte Flugroute</strong></Typography>
          </Grid>
          <Grid item xs={12} sm={4} md='flex' padding={2}> 
            <FormControl fullWidth>
              <InputLabel>Startdestination</InputLabel>
                
              <Select id="airport-in" style={mystyle1}  size="6" value={fin} onChange={o => setfin(o.target.value)} >
                {airports.map(airport => (<MenuItem key={airport.value} value={airport.value}>{airport.text}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md='flex' padding={2}>
            <FormControl fullWidth>
              <InputLabel>Zieldestination</InputLabel>
              <Select id="airport-out" style={mystyle1}  size="6" value={fout} onChange={o => setfout(o.target.value)} >
                {airports.map(airport => (<MenuItem key={airport.value} value={airport.value} >{airport.text}</MenuItem>))}
              </Select>
            </FormControl> 
          </Grid>
      </Grid> 
      
    

      {error &&   <>
        <Alert variant='outlined'  severity='error'>
          <AlertTitle id="div-error" style={mystyle2} >{error}</AlertTitle>
        </Alert> 
                  </>}

      {loading&& <>
        <Alert variant='outlined' severity='warning'>
          <AlertTitle>Warning</AlertTitle>
          API wird aufgerufen, bitte Warten
        </Alert>
        </>
      }

      {data &&  <>
        <MapContainer center={[32.421975, 8.533351]} zoom={2} maxBounds={[[-90,-180],[90,180]]} scrollWheelZoom={true} worldCopyJump={true} minZoom={2}
                    style={{ height: "593px", width: "100%" }} >
                  <TileLayer noWrap={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
              <GeoJSON data={data} ref={geoJsonLayer} style={{ weight: 8, opacity: '30%', color: 'green'}}/>
      </MapContainer>
     
       </>}

       
    
      <BottomNavigation >
        <Grid item xs={12} sm={8} md='flex' padding={2}>
          <Typography>Erstellt von A. Bricalli, F. Waltisberg, J. Wörgau / FHNW Institut Geomatik / Version 1.0.0  </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md='flex' padding={2}>
          <Button variant='contained' href='https://www.fhnw.ch/de/die-fhnw/hochschulen/architektur-bau-geomatik/institute/institut-geomatik'>ÜBER UNS</Button>
        </Grid>
      </BottomNavigation>


      
   
      </>
  );
}


export default App;