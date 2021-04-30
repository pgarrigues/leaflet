import React from 'react'

const Weather = ({infoWeatherDescription, infoTemperature}) => {
    return (
        <div>
            <h2>Météo :</h2>
            <p>Description : {infoWeatherDescription}</p>
            <p>Température : {infoTemperature}</p>
        </div>
    )
}

export default Weather