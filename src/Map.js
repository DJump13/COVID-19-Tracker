import React from 'react';
import './Map.css';
import { MapContainer as MapLeaflet, TileLayer } from "react-leaflet"
import { showDataOnMap } from './util';

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapLeaflet center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png"
          atrribution='&copy; <a href="https://osm.org/copyright">
          OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapLeaflet>
    </div>
  )
}

export default Map
