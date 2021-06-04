import React, {useContext, useEffect, useState} from 'react';
import {ContractContext} from "./ContractProvider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        justifyContent: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        margin: theme.spacing(5, 0, 0),
        backgroundColor: theme.palette.primary.main,
    }
}));


const VEHICLE_TYPE = [
    {
        value: 0,
        label: "Motorcycle"
    },
    {
        value: 1,
        label: "4-seat car"
    },
    {
        value: 2,
        label: "7-seat car"
    }
]

const ListDriversScene = (props) => {
    const history = useHistory()
    const classes = useStyles()
    const [listDrivers, setListDrivers] = useState([]) //MAX = 10 drivers
    const [driversCounter, setDriversCounter] = useState(0);
    const [rider, setRider] = useState(props.location.state.rider);
    const {contract, setContract} = useContext(ContractContext)

    useEffect(() => {
        loadListDrivers()
            .then((r) => {
            });
    }, [])

    async function loadListDrivers() {
        const receivedListDrivers = await contract.methods.findSuitableDrivers(rider.position, rider.vehicle).call()
        console.log(typeof receivedListDrivers);

        setListDrivers(receivedListDrivers.resultList);
        setDriversCounter(parseInt(receivedListDrivers.resultCount));

        console.log(typeof listDrivers);
        console.log(typeof driversCounter);
    }

    const handleTableRowClick = (driver) => {
        history.push('/driver-info', {driver: driver})
    }

    const renderDriverItem = () => {
        let result = [];
        for (let index = 0; index < driversCounter; index++) {
            const driver = listDrivers[index];
            result.push(
                <TableRow key={driver.driverIndex} hover onClick={() => handleTableRowClick(driver)}>
                    <TableCell>{parseInt(driver.driverIndex) + 1}</TableCell>
                    <TableCell>{VEHICLE_TYPE[driver.ownedVehicle].label}</TableCell>
                    <TableCell>{driver.position}</TableCell>
                    <TableCell align="right">{driver.pricePerKm}</TableCell>
                </TableRow>
            );
        }
    return result;
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        List Drivers
                    </Typography>
                    <TableContainer component={Paper} className={classes.table}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Index</TableCell>
                                    <TableCell>Vehicle Type</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell align="right">Price Per Km</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderDriverItem()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Grid>
        </Grid>
    );
    };

    export default ListDriversScene;
