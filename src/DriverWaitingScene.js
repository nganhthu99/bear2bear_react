import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SocketContractContext } from './SocketContractProvider';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './contract_config';
import { AccountContext } from './AccountProvider';

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
    progress: {
        margin: theme.spacing(20),
    },
}));

const DriverWaitingScene = (props) => {
    const { account, setAccount } = useContext(AccountContext);
    const { socketContract, setSocketContract } = useContext(
        SocketContractContext
    );
    const [isWaiting, setIsWaiting] = useState(true);
    const history = useHistory();
    const classes = useStyles();

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

        initSocketContract.events
            .NewRideIsProcessing({})
            .on('data', async function (event) {
                const eventValue = event.returnValues;
                const driverAddress = eventValue.driverAddress;
                if (driverAddress === account.address) {
                    const rider = {
                        riderAddress: eventValue.riderAddress,
                        phoneNumber: eventValue.phoneNumber,
                        position: eventValue.position,
                    };
                    setIsWaiting(false);
                    history.push('/driver-confirm', { riderInfo: rider });
                }
            })
            .on('error', console.error);

        // history.push('/driver-confirm');
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
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Waiting...
                    </Typography>
                    {isWaiting && (
                        <CircularProgress
                            color="primary"
                            className={classes.progress}
                        />
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

export default DriverWaitingScene;
