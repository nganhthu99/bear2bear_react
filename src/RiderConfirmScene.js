import React, {useContext} from 'react';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {ProvidedInfoContext} from "./Provider/ProvidedInfoProvider";
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
    const {info, setInfo} = useContext(ProvidedInfoContext)

    const handleConfirmButton = () => {
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
