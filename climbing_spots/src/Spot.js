import React from 'react'

const Spot = ({info, activeSpot}) => {
    return (
        <div>
            <h2>Description du spot :</h2>
            <p>{info}</p>
            {/* <p>{activeSpot.spot}</p> */}
            <p>{activeSpot.pays} | {activeSpot.region} | {activeSpot.departement} | {activeSpot.ville}</p>
            <p>Hauteur : {activeSpot.hauteur}</p>
            <p>Nombre de lignes : {activeSpot.nb_lignes}</p>
            <p>Meilleurs saisons : {activeSpot.meilleures_saisons}</p>
            <p>Cotations : {activeSpot.cotations}</p>
            <p>Type : {activeSpot.type}</p>
            <p>Orientation saisons : {activeSpot.orientation}</p>
            <p>Marche d'approche : {activeSpot.approche}</p>
            <br/><br/>
        </div>
    )
}

export default Spot
