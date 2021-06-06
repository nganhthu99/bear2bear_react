import React, {useContext, useEffect, useState} from 'react';
import {ContractContext} from "./Provider/ContractProvider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';
import Chip from "@material-ui/core/Chip";
import FaceIcon from '@material-ui/icons/Face';
const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2.5, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        height: "60vh"
    },
    tableCell: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '130px',
        minWidth: '130px'
    },
}));

const ListDriversScene = (props) => {
    const history = useHistory()
    const classes = useStyles()
    const {contract, setContract} = useContext(ContractContext)
    const [listDrivers, setListDrivers] = useState([])

    async function loadListDrivers() {
        const receivedListDrivers = await contract.methods.getListDrivers().call()
        setListDrivers(receivedListDrivers)
    }

    useEffect(() => {
        loadListDrivers()
            .then((res) => {})
    }, [])

    useEffect(() => {
        // filter drivers by rider provided information

    }, [listDrivers])

    const handleReloadListDrivers =  () => {
        loadListDrivers()
            .then((res) => {})
    }

    const handleTableRowClick = (driver) => {
        history.push('/driver-info', { driver: driver })
    }

    const translateVehicleType = (vehicleType) => {
        if (vehicleType == 0) return "Motorcycle"
        else if (vehicleType == 1) return "4-seat car"
        else if (vehicleType == 2) return "7-seat car"
        else return "undefined"
    }

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Available drivers
            </Typography>
            <IconButton
                 aria-label="account of current user"
                 aria-controls="menu-appbar"
                 aria-haspopup="true"
                 onClick={handleReloadListDrivers}
                 color="secondary">
                 <LoopRoundedIcon color="primary" fontSize="large"/>
            </IconButton>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Vehicle Type</TableCell>
                            <TableCell className={classes.tableCell}>Position</TableCell>
                            <TableCell align="right">Price/Km</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listDrivers.map((driver) => (
                            <TableRow key={driver.addr} hover onClick={() => handleTableRowClick(driver)}>
                                <TableCell><FaceIcon/></TableCell>
                                <TableCell>
                                    <Chip label={translateVehicleType(driver.vehicleType)} color="primary" variant="outlined"/>
                                </TableCell>
                                <TableCell className={classes.tableCell}>{driver.position}</TableCell>
                                <TableCell align="right">{`${driver.pricePerKm} $`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListDriversScene;
