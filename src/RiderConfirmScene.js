import React, {useContext} from 'react';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {ProvidedInfoContext} from "./Provider/ProvidedInfoProvider";
import {ContractContext} from "./Provider/ContractProvider";
import Web3 from "web3";
import {AccountContext} from "./Provider/AccountProvider";
const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4, 31, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(20, 0, 2),
    },
}));

const RiderConfirmScene = (props) => {
    const history = useHistory()
    const classes = useStyles();
    const {info, setInfo} = useContext(ProvidedInfoContext);
    const {account, setAccount} = useContext(AccountContext);
    const {contract, setContract} = useContext(ContractContext);

    const handleConfirmButton =  () => {
        const to = "0x3cA0eeda7EA86507D6ECD27c890EEfd7C8506DC8";
        const from = account.address;

        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
        const value = web3.utils.toWei("10", "ether")
        web3.eth.sendTransaction({from, to, value}, function(error, result) {
            if(error) console.log(error)
            else console.log(result)
        });

        setInfo({})
        history.push('/confirm-ride-success')
    }

    return (
        <div className={classes.paper}>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleConfirmButton}>
                Confirm Pick Up
            </Button>
        </div>
    )
};

export default RiderConfirmScene;
