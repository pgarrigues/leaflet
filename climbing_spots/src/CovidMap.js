import React, { useState } from 'react'
// import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import data from './data/centres-depistage-covid.json'

const CovidMap = () => {

  const [info, setInfo] = useState('Info : aucun centre sélectionné');
  const [activeCenter, setActiveCenter] = useState('');

  if (activeCenter !== ''){
    console.log(info);
    console.log(activeCenter.fields.commune);
  }

  // const [infoWeather, setInfoWeather] = useState('Pas de météo');

  // const AppelAPI = (lat, long) =>{
  //   fetch(
  //   `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`
  // )
  //   .then((reponse) => {
  //     return reponse.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
  // }

  // if (activeCenter){
    // info = `Info : ${activeCenter.fields.commune}`;
    // console.log(activeCenter);
    // AppelAPI(activeCenter.geometry.coordinates[1], activeCenter.geometry.coordinates[0])
    // console.log(data);
  // }
  
  // useEffect(() => {
  //   if(activeCenter){
  //     document.title = `${activeCenter.fields.commune}`;
  //   }
  // }, [activeCenter])
    
  return (
    <div className="map-container">
      <MapContainer className='map' center={[48.866667, 2.333333]} zoom={11} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((center) => (
          <Marker 
            key={center.recordid} 
            position={[
              center.geometry.coordinates[1],
              center.geometry.coordinates[0]
            ]}
            eventHandlers={{
                click: (e) => {
                  setActiveCenter(center);
                  setInfo(center.fields.commune);
                  console.log(e);
                  console.log(center.geometry.coordinates[1]);
                },
              }
            }
          > 
            <Popup>
              <p>{center.fields.commune}</p>
              <p>{center.geometry.coordinates[1]}</p>
              <p>{center.geometry.coordinates[0]}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div>
        <h1 id='info'>{info}</h1>
        <p>{activeCenter.recordid}</p>
        {/* <h2>{infoWeather}</h2> */}
      </div>
    </div>    
  )
}

export default CovidMap