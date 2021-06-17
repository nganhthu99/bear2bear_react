import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ContractContext } from "./Provider/ContractProvider";
import { AccountContext } from "./Provider/AccountProvider";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { ProvidedInfoContext } from "./Provider/ProvidedInfoProvider";
import {
    validatePhoneNumberUtil,
    validatePriceUtil,
} from "./Utility/ValidateInputUtil";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import ChoosePositionDialog from "./ChoosePositionDialog";
import FeedbackSnackbar from "./Common/FeedbackSnackbar";
import AlertDialog from "./Common/AlertDialog";
import InputGoogleAddress from "./Common/InputGoogleAddress";
import {loadAddress, loadBalance} from "./Service/ContractService";
import {Web3Context} from "./Provider/Web3Provider";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 2, 1, 2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
}));

const VEHICLE_TYPE = [
    {
        value: 0,
        label: "Motorcycle",
    },
    {
        value: 1,
        label: "4-seat car",
    },
    {
        value: 2,
        label: "7-seat car",
    },
];

const DriverRegisterScene = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const {web3, setWeb3} = useContext(Web3Context)
    const { account, setAccount } = useContext(AccountContext);
    const { info, setInfo } = useContext(ProvidedInfoContext);
    const { contract, setContract } = useContext(ContractContext);

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [vehicleType, setVehicleType] = useState("0");
    const [vehicleDetail, setVehicleDetail] = useState(null);
    const [position, setPosition] = useState(null);
    const [pricePerKm, setPricePerKm] = useState(null);

    const [error, setError] = useState(null);
    const [isAlertDialogShow, setIsAlertDialogShow] = useState(false);

    const handleRegisterButton = () => {
        if (
            validatePhoneNumberUtil(phoneNumber) &&
            vehicleType &&
            vehicleDetail &&
            position &&
            validatePriceUtil(pricePerKm)
        ) {
            setIsAlertDialogShow(true);
        } else {
            setError({
                severity: "warning",
                message: "Please fill out all fields!",
            });
        }
    };

    const handleProcessButton = () => {
        setInfo({
            phoneNumber,
            vehicleType,
            vehicleDetail,
            position: position.address,
            pricePerKm,
            geometry: position.geometry,
        });
        contract.methods
            .registerDrive(
                account.address,
                phoneNumber,
                vehicleType,
                vehicleDetail,
                position.address,
                Number(pricePerKm),
                position.geometry.lat,
                position.geometry.lng
            )
            .send({ from: account.address })
            .on("receipt", () => {
                loadAddress(web3).then((accounts) => {
                    loadBalance(web3, accounts[0]).then((res) => {
                        setAccount({
                            address: accounts[0],
                            balance: web3.utils.fromWei(res, "ether"),
                        });
                    });
                });
                history.replace("/driver-waiting");
            })
            .on("error", () => {
                setError({
                    severity: "error",
                    message: "Error processing transaction!",
                });
            });
    };

    return (
        <div className={classes.paper}>
            <Typography variant="h6">
                Register now to become a driver!!!
            </Typography>
            <div className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Phone Number"
                    autoFocus
                    error={phoneNumber && !validatePhoneNumberUtil(phoneNumber)}
                    onChange={(event) => {
                        setPhoneNumber(event.target.value);
                    }}
                />
                <TextField
                    select
                    label="Vehicle Type"
                    fullWidth
                    value={vehicleType}
                    variant="outlined"
                    margin="normal"
                    SelectProps={{
                        native: true,
                    }}
                    onChange={(event) => {
                        setVehicleType(event.target.value);
                    }}
                >
                    {VEHICLE_TYPE.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Detail Vehicle"
                    onChange={(event) => {
                        setVehicleDetail(event.target.value);
                    }}
                />
                <InputGoogleAddress
                    label="Position"
                    onChange={(address) => setPosition(address)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ChoosePositionDialog
                                    position={position?.geometry}
                                    isRider={false}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Price Per Kilometer"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Typography color="primary">ETH</Typography>
                            </InputAdornment>
                        ),
                    }}
                    error={pricePerKm && !validatePriceUtil(pricePerKm)}
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
            {isAlertDialogShow && (
                <AlertDialog
                    process={handleProcessButton}
                    close={() => {
                        setIsAlertDialogShow(false);
                    }}
                />
            )}
            {error && (
                <FeedbackSnackbar
                    severity={error.severity}
                    message={error.message}
                    close={() => {
                        setError(null);
                    }}
                />
            )}
        </div>
    );
};

export default DriverRegisterScene;
