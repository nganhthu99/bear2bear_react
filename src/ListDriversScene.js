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
import {
    FormControl,
    Input,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import ChoosePositionDialog from "./ChoosePositionDialog";
import InputGoogleAddress from "./Common/InputGoogleAddress";
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
    menuItemText: {
        fontSize: "smaller",
    },
}));

const ListDriversScene = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const { contract, setContract } = useContext(ContractContext);
    const [listDrivers, setListDrivers] = useState([]);
    const [shownListDrivers, setShownListDrivers] = useState([]);
    const [filterVehicleType, setFilterVehicleType] = useState("3");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortPriceTerm, setSortPriceTerm] = useState(0);
    const [search, setSearch] = useState(false);
    const { info, setInfo } = useContext(ProvidedInfoContext);
    const [sortPosition, setSortPosition] = useState(null);
    const [initListDrivers, setInitListDrivers] = useState([]);

    async function loadListDrivers() {
        const receivedListDrivers = await contract.methods
            .getListDrivers()
            .call();
        setListDrivers(receivedListDrivers);
        setFilterVehicleType(info.vehicleType);
        setInitListDrivers([...receivedListDrivers]);
    }

    useEffect(() => {
        loadListDrivers().then((res) => {});
    }, []);

    useEffect(() => {
        // filter drivers by rider provided information
        filterList(filterVehicleType, sortPriceTerm);
    }, [filterVehicleType, sortPriceTerm, search]);

    const handleReloadListDrivers = () => {
        loadListDrivers().then((res) => {});
    };

    const handleTableRowClick = (driver) => {
        history.push("/driver-info", { driver: driver });
    };

    const translateVehicleType = (vehicleType) => {
        if (vehicleType === "0") return "Motorcycle";
        else if (vehicleType === "1") return "4-seat car";
        else if (vehicleType === "2") return "7-seat car";
        else return "undefined";
    };

    const handleSortPosition = () => {
        const newListDrivers = [...shownListDrivers];
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
            setShownListDrivers(newListDrivers);
        } else {
            filterList(filterVehicleType, sortPriceTerm);
        }
        setSortPosition((prevSort) => {
            if (!prevSort) return "asc";
            if (prevSort === "asc") return "desc";
            return null;
        });
        setSortPriceTerm(0);
    };

    const filterList = (vehicleType, sort) => {
        if (vehicleType === "3" && sort === 0) {
            let filteredList = listDrivers;
            //search
            if (searchTerm !== "") {
                filteredList = filteredList.filter((driver) => {
                    return driver.position.toLowerCase().includes(searchTerm);
                });
            }

            setShownListDrivers(filteredList);
        } else {
            //filter
            let filteredList = [];
            if (vehicleType === "3") {
                filteredList = listDrivers;
            } else {
                filteredList = listDrivers.filter((driver) => {
                    return driver.vehicleType === vehicleType;
                });
            }

            //search
            if (searchTerm !== "") {
                filteredList = filteredList.filter((driver) => {
                    return driver.position.toLowerCase().includes(searchTerm);
                });
            }

            //sort
            if (sort === 1) {
                filteredList = filteredList
                    .slice()
                    .sort(
                        (driver1, driver2) =>
                            parseInt(driver1.pricePerKm) -
                            parseInt(driver2.pricePerKm)
                    );
                setSortPosition(null);
            } else if (sort === 2) {
                filteredList = filteredList
                    .slice()
                    .sort(
                        (driver1, driver2) =>
                            parseInt(driver1.pricePerKm) -
                            parseInt(driver2.pricePerKm)
                    )
                    .reverse();
                setSortPosition(null);
            }

            setShownListDrivers(filteredList);
        }
    };

    const filterVehicleTypeHandle = (event) => {
        const selectedValue = event.target.value;
        setFilterVehicleType(selectedValue);
    };

    const changeSearchTermHandle = (event) => {
        setSearchTerm(event.target.value);
    };

    const changeSortPriceTermHandle = (event) => {
        const sorted = event.target.value;
        setSortPriceTerm(sorted);
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
                            <TableCell>
                                Vehicle Type
                                <FormControl>
                                    <Select
                                        displayEmpty
                                        inputProps={{
                                            "aria-label": "Without label",
                                        }}
                                        value={filterVehicleType}
                                        onChange={(event) =>
                                            filterVehicleTypeHandle(event)
                                        }
                                        className={classes.menuItemText}
                                    >
                                        <MenuItem
                                            value="3"
                                            className={classes.menuItemText}
                                        >
                                            All
                                        </MenuItem>
                                        <MenuItem
                                            value="0"
                                            className={classes.menuItemText}
                                        >
                                            {translateVehicleType("0")}
                                        </MenuItem>
                                        <MenuItem
                                            value="1"
                                            className={classes.menuItemText}
                                        >
                                            {translateVehicleType("1")}
                                        </MenuItem>
                                        <MenuItem
                                            value="2"
                                            className={classes.menuItemText}
                                        >
                                            {translateVehicleType("2")}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={Boolean(sortPosition)}
                                    direction={
                                        sortPosition ? sortPosition : "asc"
                                    }
                                    onClick={handleSortPosition}
                                >
                                    Position
                                </TableSortLabel>
                                <FormControl>
                                    {/*<InputGoogleAddress*/}
                                    {/*    onChange={(address) => {*/}
                                    {/*        console.log(address);*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                    <Input
                                        placeholder="Search"
                                        inputProps={{
                                            "aria-label": "description",
                                        }}
                                        className={classes.menuItemText}
                                        value={searchTerm}
                                        onKeyDown={() => {
                                            setSearch(!search);
                                        }}
                                        onChange={(event) => {
                                            changeSearchTermHandle(event);
                                        }}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                Price/Km
                                <FormControl>
                                    <Select
                                        displayEmpty
                                        inputProps={{
                                            "aria-label": "Without label",
                                        }}
                                        value={sortPriceTerm}
                                        onChange={(event) =>
                                            changeSortPriceTermHandle(event)
                                        }
                                        className={classes.menuItemText}
                                    >
                                        <MenuItem
                                            value={0}
                                            className={classes.menuItemText}
                                        >
                                            None
                                        </MenuItem>
                                        <MenuItem
                                            value={1}
                                            className={classes.menuItemText}
                                        >
                                            Ascending
                                        </MenuItem>
                                        <MenuItem
                                            value={2}
                                            className={classes.menuItemText}
                                        >
                                            Descending
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shownListDrivers.map((driver) => (
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
                                <TableCell align="right">{`${driver.pricePerKm} ETH`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListDriversScene;
