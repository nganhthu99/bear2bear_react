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
import {Web3Context} from "./Provider/Web3Provider";
import riderAvatar from "./assets/images/rider.png";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 4, 20, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    frame: {
        margin: theme.spacing(1, 0, 0, 0),
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

    const { web3, setWeb3 } = useContext(Web3Context)
    const { account, setAccount } = useContext(AccountContext);
    const { contract, setContract } = useContext(ContractContext);
    const { info, setInfo } = useContext(ProvidedInfoContext);

    const [riderInfo, setRiderInfo] = useState(props.location.state.riderInfo);
    const [driverIndex, setDriverIndex] = useState(props.location.state.driverIndex);
    const [estimatedPrice, setEstimatedPrice] = useState(0);

    const [isMapDialogShow, setIsMapDialogShow] = useState(false);
    const [error, setError] = useState(null);
    const [isAlertDialogShow, setIsAlertDialogShow] = useState(false);

    const [isConfirmed, setIsConfirmed] = useState(false)

    useEffect(() => {
        setEstimatedPrice(
            Number(riderInfo.riderDistance) * Number(info.pricePerKm)
        );
    }, [riderInfo, info]);

    const handleConfirmButton = () => {
        setIsAlertDialogShow(true);
    };

    const handleFinishButton = () => {
        setInfo({});
        history.push("/confirm-ride-success");
    }

    const handleProcessButton = () => {
        contract.methods
            .confirmRide(driverIndex)
            .send({ from: account.address })
            .on("receipt", () => {
                loadAddress(web3).then((accounts) => {
                    loadBalance(web3, accounts[0]).then((res) => {
                        setAccount({
                            address: accounts[0],
                            balance: web3.utils.fromWei(res, "ether"),
                        });
                    });
                });
                setIsAlertDialogShow(false)
                setIsConfirmed(true)
            })
            .on("error", () => {
                setError({
                    severity: "error",
                    message: "Error processing transaction!",
                });
            });
    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Rider Detail Information
            </Typography>

            <Avatar
                alt="Driver"
                src={riderAvatar}
                className={classes.avatar}
            />

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
                        label="See map"
                        onClick={() => {
                            setIsMapDialogShow(true);
                        }}
                    />
                </Grid>
            </Grid>

            {!isConfirmed && <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleConfirmButton}
            >
                Confirm Ride
            </Button>}

            {isConfirmed && <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleFinishButton}
            >
                Finish
            </Button>}

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
