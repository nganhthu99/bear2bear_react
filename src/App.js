import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./Service/contract_config";
import { Route, Switch } from "react-router-dom";
import HomeScene from "./HomeScene";
import DriverRegisterScene from "./DriverRegisterScene";
import { ContractContext } from "./Provider/ContractProvider";
import { SocketContractContext } from "./Provider/SocketContractProvider";
import { AccountContext } from "./Provider/AccountProvider";
import DriverWaitingScene from "./DriverWaitingScene";
import RiderRequestScene from "./RiderRequestScene";
import ListDriversScene from "./ListDriversScene";
import DriverInfoScene from "./DriverInfoScene";
import DriverConfirmScene from "./DriverConfirmScene";
import RiderConfirmScene from "./RiderConfirmScene";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmRideSuccessScene from "./ConfirmRideSuccessScene";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AccountInfoPopover from "./AccountInfoPopover";
import { loadAddress, loadBalance } from "./Service/ContractService";
import { Web3Context } from "./Provider/Web3Provider";
import RiderWaitingScene from "./RiderWaitingScene";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        justifyContent: "center",
    },
    paper: {
        // margin: theme.spacing(0, 4, 0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
    },
    appBar: {
        height: "10vh",
    },
    title: {
        flexGrow: 1,
    },
    bottomNavigation: {
        width: "100%",
        height: "10vh",
        // margin: theme.spacing(28, 0, 0, 0),
    },
    bodyContent: {
        flexGrow: 1,
        width: "100%",
    },
}));

const App = () => {
    const classes = useStyles();
    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(AccountContext);
    const { contract, setContract } = useContext(ContractContext);
    const { socketContract, setSocketContract } = useContext(
        SocketContractContext
    );
    const [value, setValue] = useState(0);

    useEffect(() => {
        // contract
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const initContract = new web3.eth.Contract(
            TODO_LIST_ABI,
            TODO_LIST_ADDRESS
        );
        setWeb3(web3);
        setContract(initContract);

        // socket contract
        // const web3Socket = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))
        // const initSocketContract = new web3Socket.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
        // setSocketContract(initSocketContract)
        //
        // initSocketContract.events.UpdateListDrivers({})
        //     .on('data', async function(event){
        //       console.log("Event update list drivers")
        //       console.log(event.returnValues);
        //       // Do something here
        //     })
        //     .on('error', console.error);

        // account
        loadAddress(web3).then((accounts) => {
            loadBalance(web3, accounts[0]).then((res) => {
                console.log(web3.utils.fromWei(res, "ether"));
                setAccount({
                    address: accounts[0],
                    balance: web3.utils.fromWei(res, "ether"),
                });
            });
            setAccount({ address: accounts[0] });
        });
    }, []);

    // async function loadAddress(web3) {
    //     return await web3.eth.getAccounts()
    // }
    //
    // async function loadBalance(web3, address) {
    //     return await web3.eth.getBalance(address)
    // }

    return (
        // <div>
        //     <Switch>
        //         <Route path={'/register-drive'} component={DriverRegisterScene}/>
        //         <Route path={'/driver-waiting'} component={DriverWaitingScene}/>
        //         <Route path={'/request-ride'} component={RiderRequestScene}/>
        //         <Route path={'/list-drivers'} component={ListDriversScene}/>
        //         <Route path={'/driver-info'} component={DriverInfoScene}/>
        //         <Route path={'/driver-confirm'} component={DriverConfirmScene}/>
        //         <Route path={'/rider-confirm'} component={RiderConfirmScene}/>
        //         <Route path={'/confirm-ride-success'} component={ConfirmRideSuccessScene}/>
        //         <Route path={'/'} component={HomeScene}/>
        //     </Switch>
        // </div>

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
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar>
                            <Typography
                                variant="h6"
                                className={classes.title}
                            />
                            <AccountInfoPopover />
                        </Toolbar>
                    </AppBar>

                    <div className={classes.bodyContent}>
                        <Switch>
                            <Route
                                path={"/register-drive"}
                                component={DriverRegisterScene}
                            />
                            <Route
                                path={"/driver-waiting"}
                                component={DriverWaitingScene}
                            />
                            <Route
                                path={"/rider-waiting"}
                                component={RiderWaitingScene}
                            />
                            <Route
                                path={"/request-ride"}
                                component={RiderRequestScene}
                            />
                            <Route
                                path={"/list-drivers"}
                                component={ListDriversScene}
                            />
                            <Route
                                path={"/driver-info"}
                                component={DriverInfoScene}
                            />
                            <Route
                                path={"/driver-confirm"}
                                component={DriverConfirmScene}
                            />
                            <Route
                                path={"/rider-confirm"}
                                component={RiderConfirmScene}
                            />
                            <Route
                                path={"/confirm-ride-success"}
                                component={ConfirmRideSuccessScene}
                            />
                            <Route path={"/"} component={HomeScene} />
                        </Switch>
                    </div>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        showLabels
                        className={classes.bottomNavigation}
                    >
                        <BottomNavigationAction
                            label="Home"
                            icon={<HomeRoundedIcon />}
                        />
                    </BottomNavigation>
                </div>
            </Grid>
        </Grid>
    );
};

export default App;
