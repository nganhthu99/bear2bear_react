import React, {useContext, useEffect, useState} from "react";
import Web3 from "web3";
import {TODO_LIST_ABI, TODO_LIST_ADDRESS} from "./contract_config";
import {Route, Switch} from 'react-router-dom';
import HomeScene from "./HomeScene";
import DriverRegisterScene from "./DriverRegisterScene";
import {ContractContext} from "./ContractProvider";
import {SocketContractContext} from "./SocketContractProvider";
import {AccountContext} from "./AccountProvider";
import DriverWaitingScene from "./DriverWaitingScene";
import RiderRequestScene from "./RiderRequestScene";
import ListDriversScene from "./ListDriversScene";
import DriverInfoScene from "./DriverInfoScene";
import DriverConfirmScene from "./DriverConfirmScene";
import RiderConfirmScene from "./RiderConfirmScene";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        justifyContent: 'center'
    },
    paper: {
        // margin: theme.spacing(0, 4, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        flexGrow: 1,
    },
    bottomNavigation: {
        width: "100%",
        margin: theme.spacing(28, 0, 0, 0),
    },
}));

const App = () => {
    const {account, setAccount} = useContext(AccountContext)
    const {contract, setContract} = useContext(ContractContext)
    const {socketContract, setSocketContract} = useContext(SocketContractContext)
    const classes = useStyles();
    const [value, setValue] = useState(0);

    useEffect(() => {
        // contract
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
        const initContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
        setContract(initContract)

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
        loadAccount(web3)
            .then((accounts) => {
                setAccount({address: accounts[0]})
            })
    }, [])

    async function loadAccount(web3) {
        return await web3.eth.getAccounts()
    }

    return (
        <div>
            <Switch>
                <Route path={'/register-drive'} component={DriverRegisterScene}/>
                <Route path={'/driver-waiting'} component={DriverWaitingScene}/>
                <Route path={'/request-ride'} component={RiderRequestScene}/>
                <Route path={'/list-drivers'} component={ListDriversScene}/>
                <Route path={'/driver-info'} component={DriverInfoScene}/>
                <Route path={'/driver-confirm'} component={DriverConfirmScene}/>
                <Route path={'/rider-confirm'} component={RiderConfirmScene}/>
                <Route path={'/'} component={HomeScene}/>
            </Switch>
        </div>

    //     <Grid container component="main" className={classes.root}>
    //         <CssBaseline />
    //         <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
    //             <div className={classes.paper}>
    //
    //                 <AppBar position="static">
    //                     <Toolbar>
    //                         <Typography variant="h6" className={classes.title}>
    //
    //                         </Typography>
    //                             <div>
    //                                 <IconButton
    //                                     aria-label="account of current user"
    //                                     aria-controls="menu-appbar"
    //                                     aria-haspopup="true"
    //                                     onClick={() => {}}
    //                                     color="secondary"
    //                                 >
    //                                     <AccountBalanceWalletRoundedIcon />
    //                                 </IconButton>
    //                             </div>
    //                     </Toolbar>
    //                 </AppBar>
    //
    //                 <Switch>
    //                     <Route path={'/register-drive'} component={DriverRegisterScene}/>
    //                     <Route path={'/driver-waiting'} component={DriverWaitingScene}/>
    //                     <Route path={'/request-ride'} component={RiderRequestScene}/>
    //                     <Route path={'/list-drivers'} component={ListDriversScene}/>
    //                     <Route path={'/driver-info'} component={DriverInfoScene}/>
    //                     <Route path={'/driver-confirm'} component={DriverConfirmScene}/>
    //                     <Route path={'/rider-confirm'} component={RiderConfirmScene}/>
    //
    //                     <Route path={'/'} component={HomeScene}/>
    //                 </Switch>
    //
    //                 <BottomNavigation
    //                     value={value}
    //                     onChange={(event, newValue) => {
    //                         setValue(newValue);
    //                     }}
    //                     showLabels
    //                     className={classes.bottomNavigation}>
    //                     {/*<BottomNavigationAction label="Recents" icon={<RestoreIcon />} />*/}
    //                     <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
    //                     {/*<BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />*/}
    //                 </BottomNavigation>
    //
    //             </div>
    //         </Grid>
    //     </Grid>

    )
}

export default App;
