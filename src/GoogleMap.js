import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import driverAvatar from "./assets/images/driver-marker.png";
import riderAvatar from "./assets/images/rider-marker.png";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5),
        display: "flex",
        justifyContent: "center",
    },
    textField: {
        width: "500px",
    },
}));

const MapContainer = (props) => {
    const { position = null, destination = null, isRider = true } = props;

    if (position) {
        position.lat = parseFloat(position.lat);
        position.lng = parseFloat(position.lng);
    }

    if (destination) {
        destination.lat = parseFloat(destination.lat);
        destination.lng = parseFloat(destination.lng);
    }

    const selectedPlace = useState({ name: "LA" });

    const onInfoWindowClose = () => {};

    return (
        <>
            <Map
                google={props.google}
                zoom={14}
                initialCenter={position || { lat: 37.778519, lng: -122.40564 }}
            >
                {position && (
                    <Marker
                        position={position}
                        icon={{
                            url: isRider ? riderAvatar : driverAvatar,
                            scaledSize: new window.google.maps.Size(30, 45),
                        }}
                    />
                )}
                {destination && (
                    <Marker
                        position={destination}
                        icon={{
                            url: isRider ? driverAvatar : riderAvatar,
                            scaledSize: new window.google.maps.Size(30, 45),
                        }}
                    />
                )}
                <InfoWindow onClose={onInfoWindowClose}>
                    <div>
                        <h1>{selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyCHy12YAUgj8tq_wJcDKmnIBwkwbLoC9kg",
})(MapContainer);
