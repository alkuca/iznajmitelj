import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const MapInfo = () => {
    return (
        <MapContainer center={[46.20798295, 16.045020074065896]} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[46.211532, 16.0414396]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapInfo;