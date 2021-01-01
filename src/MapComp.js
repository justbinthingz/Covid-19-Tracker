import React from 'react'
import { TileLayer } from "react-leaflet";
import { Map as LeafletMap, Popup, Marker } from 'react-leaflet';
import './Map.css'
import { showDataOnMap } from './util'


const MapComp = ({ countries, casesType, center, zoom }) => {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                {/* attributes */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}

            </LeafletMap>
        </div>
    )
}

export default MapComp
