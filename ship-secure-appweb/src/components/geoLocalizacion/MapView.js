import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup,MapConsumer, useMap } from 'react-leaflet';
import './MapView.css';
import { db } from "../firebase";
import "firebase/firestore";
import { map } from "leaflet";


export const MapView = (props) => {
  
  const position = [props.latitude, props.longitude];

  

    return (  
    <MapContainer center={position} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
           <ChangeView position={position} /> 
        <Marker position={position} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    )
};


function ChangeView({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}
export default MapView