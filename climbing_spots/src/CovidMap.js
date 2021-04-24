import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import data from './data/centres-depistage-covid.json'

const CovidMap = () => {

  const [activeCenter, setActiveCenter] = useState(null);
  
  let info = 'Info : aucun centre séléctionné';
  if (activeCenter){
    info = `Info : ${activeCenter.fields.commune}`;
    console.log(activeCenter);
  }
  
  useEffect(() => {
    if(activeCenter){
      document.title = `${activeCenter.fields.commune}`;
    }
  }, [activeCenter])
    
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
                  console.log('marker clicked', e);
                  setActiveCenter(center);
                  // console.log(center);
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
      </div>
    </div>    
  )
}

export default CovidMap