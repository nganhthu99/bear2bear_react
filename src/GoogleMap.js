import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5),
        display: 'flex',
        justifyContent: 'center'
    },
    textField: {
        width: "500px"
    }
}));

const MapContainer = (props) =>  {
    const selectedPlace = useState({name: "LA"})

    const [position, setPosition] = useState("")
    const [destination, setDestination] = useState("")

    const classes = useStyles()

    const onMarkerClick = () => {

    }

    const onInfoWindowClose = () => {

    }

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
            <Map google={props.google} zoom={14}>

                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 37.778519, lng: -122.405640}} />
                <Marker
                    name={'Dolores park'}
                    position={{lat: 37.759703, lng: -122.428093}} />
                <Marker />
                <InfoWindow onClose={onInfoWindowClose}>
                    <div>
                        <h1>{selectedPlace.name}</h1>
                    </div>
                </InfoWindow>

            </Map>
        </>
    );
}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyDcb9xE9GcxnqUUbLeZNFvEQQtjoeYMitY")
})(MapContainer)
