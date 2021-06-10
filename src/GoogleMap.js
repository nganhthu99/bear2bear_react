import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import driverAvatar from "./assets/images/driver.png";
import riderAvatar from "./assets/images/rider.png";

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
    // const [position, setPosition] = useState(props.position || null);
    // const [destination, setDestination] = useState(props.destination || null);

    const classes = useStyles();

    const onMarkerClick = () => {};

    const onInfoWindowClose = () => {};

    // Google Map
    // useEffect(() => {
    //     console.log(document.querySelector("#from"))
    //     const autocomplete = new props.google.maps.places.Autocomplete(document.querySelector("#from"))
    // }, [])
    //
    //
    // const calcRoute = () => {
    //     const google = props.google
    //     const map = props.map
    //     const directionService = new google.maps.DirectionsService()
    //     const directionsDisplay = new google.maps.DirectionsRenderer()
    //     directionsDisplay.setMap(map)
    //     const request = {
    //         origin: position,
    //         destination: destination,
    //         travelMode: google.maps.TravelMode.DRIVING,
    //         unitSystem: google.maps.UnitSystem.IMPERIAL
    //     }
    //     directionService.route(request, (result, status) => {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             directionsDisplay.setDirections(result)
    //         } else {
    //             directionsDisplay.setDirections({ routes: [] })
    //         }
    //     })
    // }

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
                            scaledSize: new window.google.maps.Size(45, 45),
                        }}
                    />
                )}
                {destination && (
                    <Marker
                        position={destination}
                        icon={{
                            url: isRider ? driverAvatar : riderAvatar,
                            scaledSize: new window.google.maps.Size(45, 45),
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
