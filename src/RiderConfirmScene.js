import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './contract_config';
import { SocketContractContext } from './SocketContractProvider';
import AvatarDriver from './assets/images/driver.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        justifyContent: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(20, 0, 2),
    },
}));

const RiderConfirmScene = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [isWaiting, setIsWaiting] = useState(true);
    const [driverInfo, setDriverInfo] = useState(null);
    const { socketContract, setSocketContract } = useContext(
        SocketContractContext
    );

    const handleConfirmButton = () => {};

    useEffect(() => {
        // socket contract
        const web3Socket = new Web3(
            new Web3.providers.WebsocketProvider('ws://localhost:7545')
        );
        const initSocketContract = new web3Socket.eth.Contract(
            TODO_LIST_ABI,
            TODO_LIST_ADDRESS
        );
        setSocketContract(initSocketContract);

        const driverInfoLocal = localStorage.getItem('driverInfo');
        const driverInfoParse = driverInfoLocal
            ? JSON.parse(driverInfoLocal)
            : {};
        setDriverInfo(driverInfoParse);

        initSocketContract.events
            .UpdateListDrivers({})
            .on('data', async function (event) {
                const eventValue = event.returnValues;
                const message = eventValue.message;
                if (message === '1') {
                    const driverIndex = eventValue.driverIndex;
                    const index = driverInfoParse.driverIndex;

                    if (driverIndex === index) {
                        setIsWaiting(false);
                    }
                }
            })
            .on('error', console.error);
    }, []);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
                item
                xs={12}
                sm={8}
                md={4}
                component={Paper}
                elevation={6}
                square
            >
                {/* <div className={classes.paper}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleConfirmButton}>
                        Confirm Pick Up
                    </Button>
                </div> */}
                <div className={classes.paper}>
                    {isWaiting ? (
                        <>
                            <Typography component="h1" variant="h5">
                                Waiting for driver confirm ride...
                            </Typography>
                            <CircularProgress
                                color="primary"
                                className={classes.progress}
                            />
                        </>
                    ) : (
                        <>
                            <Typography component="h1" variant="h5">
                                Driver is arriving...
                            </Typography>

                            <Avatar
                                src={AvatarDriver}
                                style={{
                                    height: 100,
                                    width: 100,
                                    marginTop: 35,
                                    marginBottom: 35,
                                }}
                            />

                            <Grid
                                container
                                spacing={2}
                                className={classes.frame}
                            >
                                <Grid item container xs={12}>
                                    <Grid item xs={5}>
                                        <Typography>Phone Number:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {driverInfo.phoneNumber}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item container xs={12}>
                                    <Grid item xs={5}>
                                        <Typography>Vehicle Type:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {driverInfo.ownedVehicle}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item container xs={12}>
                                    <Grid item xs={5}>
                                        <Typography>Vehicle Detail:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {driverInfo.detailVehicle}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item container xs={12}>
                                    <Grid item xs={5}>
                                        <Typography>Position:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {driverInfo.position}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item container xs={12}>
                                    <Grid item xs={5}>
                                        <Typography>
                                            Price Per Kilometer:
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {driverInfo.pricePerKm}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

export default RiderConfirmScene;
