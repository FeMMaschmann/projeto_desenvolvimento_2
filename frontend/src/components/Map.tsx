import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
// @ts-ignore: Unreachable code error
import userMarker from "../img/userMarker.svg";
// @ts-ignore: Unreachable code error
import installerMarker from "../img/installerMarker.svg";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import axios from "axios";
import { baseURL } from "../types/types";

const userMarkerIcon = L.icon({
  iconUrl: userMarker,
  iconSize: [30, 95],
});

const installerMarkerIcon = L.icon({
  iconUrl: installerMarker,
  iconSize: [30, 95],
});

type UserMapData = {
  position: LatLngExpression;
  zoom: number;
};

type BdMapData = {
  Lat: number;
  Lon: number;
  Adress: string;
  Instalations: number;
};

const getBdMapData = async () => {
  try {
    const locations = await axios.get(`${baseURL}/locations/`);
    return await locations.data;
  } catch (error) {
    alert("Deu erro!");
    console.log(error);
    return error;
  }
};

export default function Map() {
  const [userMapData, setUserMapData] = useState<UserMapData>({
    position: [-30.055322, -51.104985],
    zoom: 12,
  });
  const [bdMapData, setBdMapData] = useState<BdMapData[] | []>([]);

  useEffect(() => {
    getBdMapData().then(function (result) {
      setBdMapData(result);
    });
  }, []);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setUserMapData({
        position: [pos.coords.latitude, pos.coords.longitude],
        zoom: 25,
      });
    });
  }

  return (
    <>
      <Menu />
      <MapContainer
        center={userMapData.position}
        zoom={userMapData.zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userMapData.position} icon={userMarkerIcon}>
          <Popup>Sua localização.</Popup>
        </Marker>
        <>
          {bdMapData.map((location, index) => {
            return (
              <Marker
                key={`location-${index}`}
                icon={installerMarkerIcon}
                position={[location.Lat, location.Lon]}
              >
                <Popup>{location.Adress}</Popup>
              </Marker>
            );
          })}
        </>
      </MapContainer>
    </>
  );
}
