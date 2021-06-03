import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Avatar, Typography } from '@material-ui/core';
import { ContractContext } from './ContractProvider';
import { AccountContext } from './AccountProvider';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
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
        margin: theme.spacing(3, 0, 2),
    },
    frame: {
        margin: theme.spacing(5, 0, 0, 0),
    },
}));

const DriverInfoScene = (props) => {
    const { contract, setContract } = useContext(ContractContext);
    const { account, setAccount } = useContext(AccountContext);
    const [driver, setDriver] = useState(props.location.state.driver);
    const { socketContract, setSocketContract } = useContext(
        SocketContractContext
    );
    const classes = useStyles();
    const history = useHistory();

    const handleSelectButton = () => {
        const { address } = account;
        const infoLocal = localStorage.getItem('riderInfo');
        const info = infoLocal ? JSON.parse(infoLocal) : {};
        const riderPosition = info.position;
        const riderPhoneNumber = info.phoneNumber;
        const riderAddress = 'test address 1';

        contract.methods
            .processRide(
                driver.driverIndex,
                driver.driverAddress,
                riderAddress,
                riderPhoneNumber,
                riderPosition
            )
            .send({ from: address })
            .on('receipt', () => {})
            .on('error', () => {});
        history.push('/rider-confirm');
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
                        Driver Detail Information
                    </Typography>

                    <Avatar
                        src={AvatarDriver}
                        style={{ height: 100, width: 100, marginTop: 35 }}
                    />

                    <Grid container spacing={2} className={classes.frame}>
                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Typography>Phone Number:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{driver.phoneNumber}</Typography>
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
                                <Typography>{driver.ownedVehicle}</Typography>
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
                                <Typography>{driver.detailVehicle}</Typography>
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
                                <Typography>{driver.position}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={5}>
                                <Typography>Price Per Kilometer:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{driver.pricePerKm}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSelectButton}
                    >
                        Select
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export default DriverInfoScene;
