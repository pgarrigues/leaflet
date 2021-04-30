import React, { useState } from 'react'
import Weather from './Weather'
import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import useSwr from 'swr';
import axios from 'axios';
const dotenv = require('dotenv')
dotenv.config();

const ClimbingSpotsMap = () => {
    const [dataSpots, setDataSpots] = useState([]);
    const [activeSpot, setActiveSpot] = useState('');
    const [info, setInfo] = useState('Info : aucun spot sélectionné');
    const [infoWeatherDescription, setInfoWeatherDescription] = useState('aucun spot sélectionné');
    const [infoTemperature, setInfoTemperature] = useState('aucun spot sélectionné');

    useEffect(() => {
        axios
        .get('http://localhost:5000/spots')
        .then((res) => setDataSpots(res.data));
    }, []);

    // const fetcher = (...args) => fetch(...args).then(res => res.json());

    const CLEFAPI = "bcb0ed88746dcd2bad3f2c840ce3698b";
    let resultatsAPI;

    // const url = 'http://localhost:5000/spots';
    // const {data, error } = useSwr(url, {fetcher});
    // const spots = data && !error ? data : [];

    // useEffect((lat, long) => {
    //     axios
    //     .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    //     .then((data) => {
    //         console.log(data);
    //     })
    // })

    const weatherAPI = async (lat, long) =>{
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            resultatsAPI = data;
            setInfoWeatherDescription(resultatsAPI.current.weather[0].description);
            setInfoTemperature(`${Math.round(resultatsAPI.current.temp)}°`);
            console.log(infoWeatherDescription);
        });
    }

    if (activeSpot !== ''){
        // console.log(info);
        console.log(activeSpot.spot)
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
                {dataSpots.map((spot) => (
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
                                console.log(e);
                                console.log(spot.spot);
                                weatherAPI(spot.latitude, spot.longitude);
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
                <Weather infoWeatherDescription={infoWeatherDescription}/>
            </div>
        </div>
    )
}

export default ClimbingSpotsMap