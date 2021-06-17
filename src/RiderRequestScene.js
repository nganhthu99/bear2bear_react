import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { ProvidedInfoContext } from "./Provider/ProvidedInfoProvider";
import InputAdornment from "@material-ui/core/InputAdornment";
import ChoosePositionDialog from "./ChoosePositionDialog";
import { validatePhoneNumberUtil } from "./Utility/ValidateInputUtil";
import FeedbackSnackbar from "./Common/FeedbackSnackbar";
import InputGoogleAddress from "./Common/InputGoogleAddress";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getDistanceFromLatLonInKm } from "./utils";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 2, 9, 2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    progressBar: {
        margin: theme.spacing(2, 0, 0, 0),
    },
}));

const VEHICLE_TYPE = [
    {
        value: 0,
        label: "Motorcycle",
    },
    {
        value: 1,
        label: "4-seat car",
    },
    {
        value: 2,
        label: "7-seat car",
    },
];
const RiderRequestScene = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [vehicleType, setVehicleType] = useState("0");
    const [position, setPosition] = useState(null);
    const [destination, setDestination] = useState(null);
    const [distance, setDistance] = useState(0);

    const { info, setInfo } = useContext(ProvidedInfoContext);

    const [error, setError] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleRequestButton = () => {
        if (
            validatePhoneNumberUtil(phoneNumber) &&
            vehicleType &&
            position &&
            destination
        ) {
            setInfo({
                phoneNumber,
                vehicleType,
                position: position.address,
                destination: destination.address,
                distance,
                geometry: position.geometry,
            });
            history.push("/list-drivers");
        } else {
            setError({
                severity: "warning",
                message: "Please fill out all fields!",
            });
        }
    };

    useEffect(() => {
        if (position && destination) {
            const distance = getDistanceFromLatLonInKm(
                position.geometry,
                destination.geometry
            );
            setDistance(distance);
            setIsCalculating(false);
        }
    }, [position, destination]);

    return (
        <div className={classes.paper}>
            <Typography variant="h6">Request a new ride now!!!</Typography>
            <div className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Phone Number"
                    autoFocus
                    error={phoneNumber && !validatePhoneNumberUtil(phoneNumber)}
                    onChange={(event) => {
                        setPhoneNumber(event.target.value);
                    }}
                />
                <TextField
                    select
                    label="Vehicle Type"
                    fullWidth
                    value={vehicleType}
                    variant="outlined"
                    margin="normal"
                    SelectProps={{
                        native: true,
                    }}
                    onChange={(event) => {
                        setVehicleType(event.target.value);
                    }}
                >
                    {VEHICLE_TYPE.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <InputGoogleAddress
                    label="Position"
                    onChange={(address) => {
                        setIsCalculating(true);
                        setPosition(address);
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ChoosePositionDialog
                                    position={position?.geometry}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                <InputGoogleAddress
                    label="Destination"
                    onChange={(address) => {
                        setIsCalculating(true);
                        setDestination(address);
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ChoosePositionDialog
                                    position={destination?.geometry}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                {!isCalculating && (
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Distance"
                        value={`${distance} km`}
                    />
                )}
                {isCalculating && (
                    <LinearProgress className={classes.progressBar} />
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleRequestButton}
                >
                    Request
                </Button>
            </div>
            {error && (
                <FeedbackSnackbar
                    severity={error.severity}
                    message={error.message}
                    close={() => {
                        setError(null);
                    }}
                />
            )}
        </div>
    );
};

export default RiderRequestScene;
