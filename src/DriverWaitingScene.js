import React, {useContext, useEffect, useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {SocketContractContext} from "./Provider/SocketContractProvider";
import {Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Web3 from "web3";
import {TODO_LIST_ABI, TODO_LIST_ADDRESS} from "./Service/contract_config";
import {AccountContext} from "./Provider/AccountProvider";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 4, 11, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    progress: {
        margin: theme.spacing(20)
    }
}));

const DriverWaitingScene = (props) => {
    const history = useHistory()
    const classes = useStyles()

    const {account, setAccount} = useContext(AccountContext)
    const {socketContract, setSocketContract} = useContext(SocketContractContext)

    const [isWaiting, setIsWaiting] = useState(true)

    useEffect(() => {
        // socket contract
        const web3Socket = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))
        const initSocketContract = new web3Socket.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
        setSocketContract(initSocketContract)

        initSocketContract.events.NewRide({})
            .on('data', async function(event){
                const eventValue = event.returnValues
                const driverIndex = eventValue.driverIndex
                const driverAddress = eventValue.driverAddress
                if (driverAddress === account.address) {
                    const rider = {
                        riderAddress: eventValue.riderAddress,
                        riderPhoneNumber: eventValue.riderPhoneNumber,
                        riderPosition: eventValue.riderPosition,
                        riderDestination: eventValue.riderDestination,
                        riderDistance: eventValue.riderDistance
                    }
                    setIsWaiting(false)
                    history.push('/driver-confirm', { riderInfo : rider, driverIndex })
                }
            })
            .on('error', console.error);
    }, [])

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Please stay on this screen while waiting for a new ride.
            </Typography>
            {isWaiting && <CircularProgress color="primary" className={classes.progress}/>}
        </div>
    );
};

export default DriverWaitingScene;
