import React, { useContext, useState } from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { ContractContext } from './ContractProvider';
import { AccountContext } from './AccountProvider';
import AvatarRider from './assets/images/rider.png';

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
        margin: theme.spacing(3, 0, 2),
    },
    frame: {
        margin: theme.spacing(5, 0, 0, 0),
    },
}));

const DriverConfirmScene = (props) => {
    const { contract, setContract } = useContext(ContractContext);
    const { account, setAccount } = useContext(AccountContext);
    const history = useHistory();
    const classes = useStyles();
    const [riderInfo, setRiderInfo] = useState(props.location.state.riderInfo);
    // const [riderInfo, setRiderInfo] = useState({phoneNumber: "0912321321", position: "Thanh Da"})

    const handleConfirmButton = () => {
        const { address } = account;
        const driverInfoLocal = localStorage.getItem('driverInfo');
        const driverInfo = driverInfoLocal ? JSON.parse(driverInfoLocal) : {};
        const driverIndex = driverInfo.driverIndex;

        contract.methods
            .confirmRide(driverIndex)
            .send({ from: address })
            .on('receipt', () => {})
            .on('error', () => {});
    };

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
                        Rider Detail Information
                    </Typography>

                    <Avatar
                        src={AvatarRider}
                        style={{
                            height: 100,
                            width: 100,
                            marginTop: 35,
                        }}
                    />

                    <Grid container spacing={2} className={classes.frame}>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Phone Number:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{riderInfo.phoneNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Address:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {riderInfo.riderAddress}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Position:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{riderInfo.position}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleConfirmButton}
                    >
                        Confirm Pick Up
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export default DriverConfirmScene;
