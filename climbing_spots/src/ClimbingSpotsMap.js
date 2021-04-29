import React, { useState } from 'react'
// import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import useSwr from 'swr';
const dotenv = require('dotenv')

dotenv.config();

const fetcher = (...args) => fetch(...args).then(res => res.json());

const ClimbingSpotsMap = () => {

    const CLEFAPI = "...";
    let resultatsAPI;
    const url = 'http://localhost:5000/spots';
    const {data, error } = useSwr(url, {fetcher});
    const spots = data && !error ? data : [];

    const [info, setInfo] = useState('Info : aucun spot sélectionné');
    const [activeSpot, setActiveSpot] = useState('');
    const [infoWeatherDescription, setInfoWeatherDescription] = useState('aucun spot sélectionné');
    const [infoTemperature, setInfoTemperature] = useState('aucun spot sélectionné');

    const AppelAPI = (lat, long) =>{
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        .then((reponse) => {
            return reponse.json();
        })
        .then((data) => {
            console.log(data);
            resultatsAPI = data;
            // console.log(resultatsAPI);
            setInfoWeatherDescription(resultatsAPI.current.weather[0].description);
            setInfoTemperature(`${Math.round(resultatsAPI.current.temp)}°`)
        });
    }

    if (activeSpot !== ''){
        // console.log(info);
        console.log(activeSpot.spot)
        AppelAPI(activeSpot.latitude, activeSpot.longitude);
    }
    
    return (
        <div>
            <div className="map-container">
                <div>
                    <h1>ClimbingSpotsMap</h1>
                </div>
                <MapContainer className='map' center={[48.866667, 2.333333]} zoom={7} scrollWheelZoom={false}>
                 <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {spots.map((spot) => (
                    <Marker
                        key={spot.id}
                        position={[
                            spot.latitude,
                            spot.longitude
                        ]}
                        eventHandlers={{
                            click: (e) => {
                                setActiveSpot(spot);
                                setInfo(spot.spot)
                                // console.log(e);
                            }
                        }}
                    >
                        <Popup>
                            <p>{spot.spot}</p>
                            <p>{spot.ville}</p>
                            <p>{spot.longitude}</p>
                        </Popup>
                    </Marker>
                ))}
                </MapContainer>
                <div>
                    <h1>{info}</h1>
                    <p>{activeSpot.spot}</p>
                    <p>Description : {infoWeatherDescription}</p>
                    <p>Température : {infoTemperature}</p>
                </div>
            </div>    
        </div>
    )
}

export default ClimbingSpotsMap