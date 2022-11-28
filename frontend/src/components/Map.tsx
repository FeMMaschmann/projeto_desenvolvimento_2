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
import {
  baseURL,
  TypesLogged,
  TypesLoginData,
  TypesPerfilData,
} from "../types/types";
import { Link } from "react-router-dom";

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
  UserName: string;
  BusinessName: string;
  Adress: string;
  Instalations: number;
  Id: number;
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

export default function Map(
  props: TypesLogged & TypesLoginData & TypesPerfilData
) {
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
      <Menu
        isLogged={props.isLogged}
        setIsLogged={props.setIsLogged}
        loggedData={props.loggedData}
        setLoggedData={props.setLoggedData}
      />
      <MapContainer
        center={userMapData.position}
        zoom={userMapData.zoom}
        scrollWheelZoom={true}
        className="map-container"
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
            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${location.Lat},${location.Lon}`;
            return (
              <Marker
                key={`location-${index}`}
                icon={installerMarkerIcon}
                position={[location.Lat, location.Lon]}
              >
                <Popup>
                  <div>
                    <h5>{location.BusinessName}</h5>
                    <p>
                      Endereço: {location.Adress} <br />
                      Número de instalações: {location.Instalations}
                    </p>
                    <Link
                      to="/perfil"
                      onClick={() => {
                        props.setPerfil({
                          Id: location.Id,
                          BusinessName: location.BusinessName,
                        });
                      }}
                    >
                      <span className="small">Ver perfil</span>
                    </Link>
                    <br />
                    <a href={googleMapsLink} className="my-google-link-button">
                      <span className="small">Ver no Google Maps</span>
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </>
      </MapContainer>
    </>
  );
}
