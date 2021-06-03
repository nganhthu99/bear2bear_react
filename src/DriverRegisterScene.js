import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ContractContext } from './ContractProvider';
import { AccountContext } from './AccountProvider';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const VEHICLE_TYPE = [
    {
        value: 0,
        label: 'Motorcycle',
    },
    {
        value: 1,
        label: '4-seat car',
    },
    {
        value: 2,
        label: '7-seat car',
    },
];

const DriverRegisterScene = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [ownedVehicle, setOwnedVehicle] = useState(0);
    const [detailVehicle, setDetailVehicle] = useState(null);
    const [position, setPosition] = useState(null);
    const [pricePerKm, setPricePerKm] = useState(null);

    const { account, setAccount } = useContext(AccountContext);
    const { contract, setContract } = useContext(ContractContext);

    const handleRegisterButton = () => {
        console.log(account.address);
        console.log(phoneNumber);
        console.log(ownedVehicle);
        console.log(detailVehicle);
        console.log(position);
        console.log(pricePerKm);

        contract.methods
            .registerDrive(
                account.address,
                phoneNumber,
                ownedVehicle,
                detailVehicle,
                position,
                Number(pricePerKm)
            )
            .send({ from: account.address })
            .on('receipt', (receipt) => {
                const returnValues =
                    receipt.events.UpdateListDrivers.returnValues;
                saveDriverInfo({
                    detailVehicle: returnValues.detailVehicle,
                    driverAddress: returnValues.driverAddress,
                    driverIndex: returnValues.driverIndex,
                    ownedVehicle: returnValues.ownedVehicle,
                    phoneNumber: returnValues.phoneNumber,
                    position: returnValues.position,
                    pricePerKm: returnValues.pricePerKm,
                    state: returnValues.state,
                });
                history.replace('/driver-waiting');
            })
            .on('error', () => {});
    };

    const saveDriverInfo = (driver) => {
        localStorage.setItem('driverInfo', JSON.stringify(driver));
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
                    <Typography variant="h6">
                        Register now to become a driver!!!
                    </Typography>
                    <div className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Phone Number"
                            autoFocus
                            onChange={(event) => {
                                setPhoneNumber(event.target.value);
                            }}
                        />
                        <TextField
                            select
                            label="Vehicle Type"
                            fullWidth
                            value={ownedVehicle}
                            variant="outlined"
                            margin="normal"
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {VEHICLE_TYPE.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                            onChange=
                            {(event) => {
                                setOwnedVehicle(event.target.value);
                            }}
                            >
                        </TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Detail Vehicle"
                            onChange={(event) => {
                                setDetailVehicle(event.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Position"
                            onChange={(event) => {
                                setPosition(event.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Price Per Kilometer"
                            onChange={(event) => {
                                setPricePerKm(event.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleRegisterButton}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default DriverRegisterScene;
