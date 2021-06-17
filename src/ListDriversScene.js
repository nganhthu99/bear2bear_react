import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "./Provider/ContractProvider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LoopRoundedIcon from "@material-ui/icons/LoopRounded";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { TableSortLabel } from "@material-ui/core";
import { ProvidedInfoContext } from "./Provider/ProvidedInfoProvider";
import { getDistanceFromLatLonInKm } from "./utils";
const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2.5, 2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    table: {
        height: "60vh",
    },
    tableCell: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "130px",
        minWidth: "130px",
    },
}));

const ListDriversScene = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const { contract, setContract } = useContext(ContractContext);
    const [listDrivers, setListDrivers] = useState([]);
    const { info, setInfo } = useContext(ProvidedInfoContext);
    const [sortPosition, setSortPosition] = useState(null);
    const [initListDrivers, setInitListDrivers] = useState([]);

    async function loadListDrivers() {
        const receivedListDrivers = await contract.methods
            .getListDrivers()
            .call();
        setListDrivers(receivedListDrivers);
        setInitListDrivers([...receivedListDrivers]);
    }

    useEffect(() => {
        loadListDrivers().then((res) => {});
    }, []);

    useEffect(() => {
        // filter drivers by rider provided information
    }, [listDrivers]);

    const handleReloadListDrivers = () => {
        loadListDrivers().then((res) => {});
    };

    const handleTableRowClick = (driver) => {
        history.push("/driver-info", { driver: driver });
    };

    const translateVehicleType = (vehicleType) => {
        if (vehicleType == 0) return "Motorcycle";
        else if (vehicleType == 1) return "4-seat car";
        else if (vehicleType == 2) return "7-seat car";
        else return "undefined";
    };

    const handleSortPosition = () => {
        const newListDrivers = [...listDrivers];
        newListDrivers.sort((driver1, driver2) => {
            const positionRider = {
                lat: info.geometry.lat,
                lng: info.geometry.lng,
            };
            const distance1 = getDistanceFromLatLonInKm(
                positionRider,
                driver1.geometry
            );
            const distance2 = getDistanceFromLatLonInKm(
                positionRider,
                driver2.geometry
            );
            if (!sortPosition) return distance1 - distance2;
            if (sortPosition === "asc") return distance2 - distance1;
            return -1;
        });
        if (sortPosition !== "desc") {
            setListDrivers(newListDrivers);
        } else {
            setListDrivers(initListDrivers);
        }
        setSortPosition((prevSort) => {
            if (!prevSort) return "asc";
            if (prevSort === "asc") return "desc";
            return null;
        });
    };

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
                color="secondary"
            >
                <LoopRoundedIcon color="primary" fontSize="large" />
            </IconButton>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Vehicle Type</TableCell>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active={Boolean(sortPosition)}
                                    direction={
                                        sortPosition ? sortPosition : "asc"
                                    }
                                    onClick={handleSortPosition}
                                >
                                    Position
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">Price/Km</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listDrivers.map((driver) => (
                            <TableRow
                                key={driver.addr}
                                hover
                                onClick={() => handleTableRowClick(driver)}
                            >
                                <TableCell>
                                    <FaceIcon />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={translateVehicleType(
                                            driver.vehicleType
                                        )}
                                        color="primary"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    {driver.position}
                                </TableCell>
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
