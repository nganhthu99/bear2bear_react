import React, {useContext, useState} from 'react';
import {Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {ContractContext} from "./Provider/ContractProvider";
import {AccountContext} from "./Provider/AccountProvider";
import {ProvidedInfoContext} from "./Provider/ProvidedInfoProvider";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import DirectionsCarRoundedIcon from '@material-ui/icons/DirectionsCarRounded';
import ChoosePositionDialog from "./ChoosePositionDialog";
import AlertDialog from "./Common/AlertDialog";
import {loadAddress, loadBalance} from "./Service/ContractService";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 4, 20, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    frame: {
        margin: theme.spacing(5,0,0,0),
    },
    typography: {
        fontWeight: 600,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const DriverConfirmScene = (props) => {
    const history = useHistory()
    const classes = useStyles();

    const {account, setAccount} = useContext(AccountContext)
    const {contract, setContract} = useContext(ContractContext)
    const {info, setInfo} = useContext(ProvidedInfoContext)

    const [riderInfo, setRiderInfo] = useState(props.location.state.riderInfo)
    const [driverIndex, setDriverIndex] = useState(props.location.state.driverIndex)

    const [isMapDialogShow, setIsMapDialogShow] = useState(false)
    const [isAlertDialogShow, setIsAlertDialogShow] = useState(false)

    // const [riderInfo, setRiderInfo] = useState({riderAddress: "3232", riderPosition: "43243", riderDestination: "#@143"})
    // const [driverIndex, setDriverIndex] = useState("123")

    const handleConfirmButton = () => {
        // contract.methods.confirmRide(driverIndex)
        //     .send({from: account.address})
        //     .on('receipt', () => {
        //         setInfo({})
        //         history.push('/confirm-ride-success')
        //     })
        //     .on('error', () => {
        //
        //     })
        setIsAlertDialogShow(true)
    }

    const handleProcessButton = () => {
        contract.methods.confirmRide(driverIndex)
            .send({from: account.address})
            .on('receipt', () => {
                setInfo({})
                history.push('/confirm-ride-success')
            })
            .on('error', () => {

            })
    }

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Rider Detail Information
            </Typography>
            <Grid container spacing={2} className={classes.frame}>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Phone Number:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{riderInfo.riderPhoneNumber}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Position:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{riderInfo.riderPosition}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}><Divider/></Grid>

                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Box className={classes.typography}>Destination:</Box>
                    </Grid>
                    <Grid item>
                        <Typography>{riderInfo.riderDestination}</Typography>
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
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleConfirmButton}>
                Confirm Pick Up
            </Button>
            {isMapDialogShow && <ChoosePositionDialog open={true} close={() => {setIsMapDialogShow(false)}}/>}
            {isAlertDialogShow && <AlertDialog process={handleProcessButton} close={() => {setIsAlertDialogShow(false)}} />}
        </div>
    )
}

export default DriverConfirmScene;
