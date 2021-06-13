import React, {useContext, useEffect, useState} from 'react';
import {Button, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {ProvidedInfoContext} from "./Provider/ProvidedInfoProvider";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import DirectionsCarRoundedIcon from "@material-ui/icons/DirectionsCarRounded";
import AlertDialog from "./Common/AlertDialog";
import FeedbackSnackbar from "./Common/FeedbackSnackbar";
import ChoosePositionDialog from "./ChoosePositionDialog";
import Avatar from "@material-ui/core/Avatar";
import {ContractContext} from "./Provider/ContractProvider";
import {AccountContext} from "./Provider/AccountProvider";
import {Web3Context} from "./Provider/Web3Provider";
import {loadAddress, loadBalance} from "./Service/ContractService";
import driverAvatar from "./assets/images/driver.png";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 4, 14, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    frame: {
        margin: theme.spacing(1,0,0,0),
    },
    typography: {
        fontWeight: 600,
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    avatar: {
        margin: theme.spacing(1,0,0,0),
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
}));

const RiderConfirmScene = (props) => {
    const history = useHistory()
    const classes = useStyles();

    const {web3, setWeb3} = useContext(Web3Context)
    const {info, setInfo} = useContext(ProvidedInfoContext)
    const {contract, setContract} = useContext(ContractContext)
    const {account, setAccount} = useContext(AccountContext)

    const [driver, setDriver] = useState(props.location.state.driver)
    const [estimatedPrice, setEstimatedPrice] = useState(0)

    const [isAlertDialogShow, setIsAlertDialogShow] = useState(false)
    const [error, setError] = useState(null)
    const [isMapDialogShow, setIsMapDialogShow] = useState(false)

    useEffect(() => {
        setEstimatedPrice(Number(info.distance) * Number(driver.pricePerKm))
    }, [driver, info])

    const handlePayRideButton = () => {
        setIsAlertDialogShow(true)
    }

    const handleProcessButton = () => {
        const from = account.address
        const to = driver.addr
        const value = web3.utils.toWei(estimatedPrice.toString(), "ether")
        web3.eth.sendTransaction({from, to, value}, function(error, result) {
            if (error) {
                console.log(error)
                setError({severity: "error", message: "Error processing transaction!"})
            } else {
                console.log(result)
                loadAddress(web3).then((accounts) => {
                    loadBalance(web3, accounts[0]).then((res) => {
                        setAccount({
                            address: accounts[0],
                            balance: web3.utils.fromWei(res, "ether"),
                        });
                        setInfo({})
                        history.push('/confirm-ride-success')
                    });
                });
            }
        });
    }

    return (
        <div className={classes.paper}>

            <Typography component="h1" variant="h5">
                Driver Detail Information
            </Typography>

            <Avatar alt="Driver"
                    src={driverAvatar}
                    className={classes.avatar} />

            <Grid container spacing={2} className={classes.frame}>
                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Contact:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{driver.phoneNumber}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Vehicle:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{driver.vehicleDetail}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Estimated Price:</Box>
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
                        onClick={() => {setIsMapDialogShow(true)}}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handlePayRideButton}>
                Pay Ride
            </Button>

            {isAlertDialogShow && <AlertDialog process={handleProcessButton} close={() => {setIsAlertDialogShow(false)}} />}
            {error && <FeedbackSnackbar severity={error.severity} message={error.message} close={() => {setError(null)}} />}
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
                        lat: driver.geometry.lat,
                        lng: driver.geometry.lng,
                    }}
                />
            )}
        </div>
    )
};

export default RiderConfirmScene;
