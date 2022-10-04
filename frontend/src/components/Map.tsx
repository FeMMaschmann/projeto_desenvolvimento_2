import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
// @ts-ignore: Unreachable code error
import marker from "../img/marker.svg";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [30, 95],
});

type MapData = {
  position: LatLngExpression;
  zoom: number;
};

export default function Map() {
  const [mapData, setMapData] = useState<MapData>({
    position: [-30.055322, -51.104985],
    zoom: 15,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setMapData({
        position: [pos.coords.latitude, pos.coords.longitude],
        zoom: 20,
      });
    });
  }

  return (
    <>
      <Menu />
      <MapContainer
        center={mapData.position}
        zoom={mapData.zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapData.position} icon={markerIcon}>
          <Popup>Sua localização.</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
