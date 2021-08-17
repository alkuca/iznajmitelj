import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ChangeMapView from "./ChangeMapView"


const MapInfo = props => {

    return (
        <MapContainer center={[props.long, props.lat]} zoom={props.zoom} scrollWheelZoom={props.scrollWheel}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[props.long, props.lat]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ChangeMapView coords={[props.long, props.lat]} />
        </MapContainer>
    );
};

export default MapInfo;