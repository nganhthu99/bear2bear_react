import { makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
} from "react-places-autocomplete";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles((theme) => ({
    searchDropdown: {
        border: "2px solid #ff96ad",
        borderRadius: 4,
    },
    searchResult: {
        display: "flex",
        cursor: "pointer",
        padding: 5,
    },
    addressIcon: {},
}));

const InputGoogleAddress = (props) => {
    const { label, onChange, InputProps } = props;

    const classes = useStyles();
    const [address, setAddress] = useState("");
    const handleChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => {
                const { formatted_address } = results[0];
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                setAddress(formatted_address);
                return {
                    address: formatted_address,
                    geometry: {
                        lat: lat.toString(),
                        lng: lng.toString(),
                    },
                };
            })
            .then((latLng) => onChange(latLng))
            .catch((error) => console.error("Error", error));
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                    <TextField
                        value={address}
                        label={label}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        InputProps={InputProps}
                        {...getInputProps()}
                    />
                    <div
                        className={
                            suggestions.length !== 0
                                ? classes.searchDropdown
                                : ""
                        }
                    >
                        {suggestions.map((suggestion) => {
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion)}
                                    className={classes.searchResult}
                                >
                                    <div className={classes.addressIcon}>
                                        <RoomIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                    </div>
                                    <div>{suggestion.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default InputGoogleAddress;
