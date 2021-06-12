import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { ProvidedInfoContext } from "./Provider/ProvidedInfoProvider";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import DirectionsCarRoundedIcon from "@material-ui/icons/DirectionsCarRounded";
import ChoosePositionDialog from "./ChoosePositionDialog";
import Avatar from "@material-ui/core/Avatar";
import { ContractContext } from "./Provider/ContractProvider";
import { AccountContext } from "./Provider/AccountProvider";
import FeedbackSnackbar from "./Common/FeedbackSnackbar";
import AlertDialog from "./Common/AlertDialog";
import { loadAddress, loadBalance } from "./Service/ContractService";
import riderAvatar from "./assets/images/rider.png";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 4, 20, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    frame: {
        margin: theme.spacing(5, 0, 0, 0),
    },
    typography: {
        fontWeight: 600,
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    avatar: {
        margin: theme.spacing(1, 0, 0, 0),
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

const DriverConfirmScene = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const { account, setAccount } = useContext(AccountContext);
    const { contract, setContract } = useContext(ContractContext);
    const { info, setInfo } = useContext(ProvidedInfoContext);

    const [riderInfo, setRiderInfo] = useState(props.location.state.riderInfo);
    const [driverIndex, setDriverIndex] = useState(
        props.location.state.driverIndex
    );
    const [estimatedPrice, setEstimatedPrice] = useState(0);

    const [isMapDialogShow, setIsMapDialogShow] = useState(false);
    const [error, setError] = useState(null);
    const [isAlertDialogShow, setIsAlertDialogShow] = useState(false);

    // const [riderInfo, setRiderInfo] = useState({riderAddress: "3232", riderPosition: "43243", riderDestination: "#@143"})
    // const [driverIndex, setDriverIndex] = useState("123")

    useEffect(() => {
        setEstimatedPrice(
            Number(riderInfo.riderDistance) * Number(info.pricePerKm)
        );
    }, [riderInfo, info]);

    const handleFinishButton = () => {
        setIsAlertDialogShow(true);
    };

    const handleProcessButton = () => {
        contract.methods
            .finishRide(driverIndex)
            .send({ from: account.address })
            .on("receipt", () => {
                setInfo({});
                history.push("/confirm-ride-success");
            })
            .on("error", () => {
                setError({
                    severity: "error",
                    message: "Error processing transaction!",
                });
            });
        history.push("/confirm-ride-success");
    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Rider Detail Information
            </Typography>

            <Avatar
                alt="Driver"
                src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
                className={classes.avatar}
            />

            {/* <Grid container spacing={2} className={classes.frame}>

            <Avatar
                src={riderAvatar}
                style={{ height: 80, width: 80, marginTop: 15 }}
            /> */}

            <Grid container spacing={2} className={classes.frame}>
                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Contact:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{riderInfo.riderPhoneNumber}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Position:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{riderInfo.riderPosition}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Destination:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{riderInfo.riderDestination}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Distance:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{riderInfo.riderDistance}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>
                            Estimated Price:
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography>{`${estimatedPrice} $`}</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Chip
                        color="primary"
                        icon={<DirectionsCarRoundedIcon />}
                        label="See route"
                        onClick={() => {
                            setIsMapDialogShow(true);
                        }}
                    />
                </Grid>
            </Grid>

            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleFinishButton}
            >
                Finish
            </Button>
            {isMapDialogShow && (
                <ChoosePositionDialog
                    open={true}
                    close={() => {
                        setIsMapDialogShow(false);
                    }}
                    position={{
                        lat: info.geometry.lat,
                        lng: info.geometry.lng,
                    }}
                    destination={{
                        lat: riderInfo.geometry.lat,
                        lng: riderInfo.geometry.lng,
                    }}
                    isRider={false}
                />
            )}
            {isAlertDialogShow && (
                <AlertDialog
                    process={handleProcessButton}
                    close={() => {
                        setIsAlertDialogShow(false);
                    }}
                />
            )}
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

export default DriverConfirmScene;
