import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import {ContractContext} from "./Provider/ContractProvider";
import {AccountContext} from "./Provider/AccountProvider";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {useHistory} from "react-router-dom";
import {ProvidedInfoContext} from "./Provider/ProvidedInfoProvider";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import ChoosePositionDialog from "./ChoosePositionDialog";
import AlertDialog from "./Common/AlertDialog";
import FeedbackSnackbar from "./Common/FeedbackSnackbar";
import DirectionsCarRoundedIcon from "@material-ui/icons/DirectionsCarRounded";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1.5, 4, 0, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    frame: {
        margin: theme.spacing(0.5, 0, 0, 0),
    },
    typography: {
        fontWeight: 600,
    },
    submit: {
        margin: theme.spacing(1, 1, 0, 1),
    },
}));


const DriverInfoScene = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const {contract, setContract} = useContext(ContractContext)
    const {account, setAccount} = useContext(AccountContext)
    const {info, setInfo} = useContext(ProvidedInfoContext)

    const [driver, setDriver] = useState(props.location.state.driver)
    const [isAlertDialogShow, setIsAlertDialogShow] = useState(false)
    const [error, setError] = useState(null)
    const [isMapDialogShow, setIsMapDialogShow] = useState(false)

    const translateVehicleType = (vehicleType) => {
        if (vehicleType == 0) return "Motorcycle"
        else if (vehicleType == 1) return "4-seat car"
        else if (vehicleType == 2) return "7-seat car"
        else return "undefined"
    }

    const handleSelectButton = () => {
        // contract.methods.processRide(driver.driverIndex, driver.driverAddress, account.address, info.phoneNumber, info.position, info.destination)
        //     .send({from: account})
        //     .on('receipt', () => {
        //         history.push('/rider-confirm')
        //     })
        //     .on('error', () => {
        //
        //     })
        setIsAlertDialogShow(true)
    }

    const handleProcessButton = () => {
        contract.methods.processRide(driver.index, driver.addr, account.address, info.phoneNumber, info.position, info.destination)
            .send({from: account.address})
            .on('receipt', () => {
                history.push('/rider-confirm')
            })
            .on('error', () => {
                setError({severity: error, message: "Error processing transaction!"})
            })
    }

    return (
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Driver Detail Information
                    </Typography>

                    <Grid container spacing={2} className={classes.frame}>
                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Box className={classes.typography}>Phone Number:</Box>
                            </Grid>
                            <Grid item>
                                <Typography>{driver.phoneNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Box className={classes.typography}>Vehicle Type:</Box>
                            </Grid>
                            <Grid item>
                                <Chip label={translateVehicleType(driver.vehicleType)} color="primary" variant="outlined"/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Box className={classes.typography}>Vehicle Detail:</Box>
                            </Grid>
                            <Grid item>
                                <Typography>{driver.vehicleDetail}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Box className={classes.typography} >Position:</Box>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {driver.position}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Box className={classes.typography}>Price/Kilometer:</Box>
                            </Grid>
                            <Grid item>
                                <Typography>{`${driver.pricePerKm} $`}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Box className={classes.typography}>Estimated Distance:</Box>
                            </Grid>
                            <Grid item>
                                <Typography>9.4 km</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Box className={classes.typography}>Estimated Price:</Box>
                            </Grid>
                            <Grid item>
                                <Typography>149 $</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Chip
                                color="primary"
                                icon={<DirectionsCarRoundedIcon />}
                                label="See route"
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
                        onClick={handleSelectButton}>
                        Select
                    </Button>

                    {isAlertDialogShow && <AlertDialog process={handleProcessButton} close={() => {setIsAlertDialogShow(false)}} />}
                    {error && <FeedbackSnackbar severity={error.severity} message={error.message} close={() => {setError(null)}} />}
                    {isMapDialogShow && <ChoosePositionDialog open={true} close={() => {setIsMapDialogShow(false)}}/>}
                </div>
    )
};

export default DriverInfoScene;
