import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import useSwr from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const ClimbingSpotsMap = () => {

    const url = 'http://localhost:5000/spots';

    const {data, error } = useSwr(url, {fetcher});

    const spots = data && !error ? data.slice(0,10) : [];

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
                            parseInt(spot.latitude),
                            parseInt(spot.longitude)
                        ]}
                    >
                        <Popup>
                            <p>{spot.spot}</p>
                            <p>{spot.ville}</p>
                            <p>{spot.hauteur}</p>
                        </Popup>
                    </Marker>
                ))}
                </MapContainer>
            </div>    
        </div>
    )
}

export default ClimbingSpotsMap