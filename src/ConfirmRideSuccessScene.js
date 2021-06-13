import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(18, 4, 31, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(4,0.5,0.5,0.5),
    },
    typography: {
        margin: theme.spacing(0,2,0,2)
    }
}));

const ConfirmRideSuccessScene = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const handleBackToHomeButton = () => {
        history.push('/')
    }

    return (
        <div className={classes.paper}>
            <Typography variant="h5" className={classes.typography}>{"Have a nice and safe ride!"}</Typography>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleBackToHomeButton}>
                Back To Home
            </Button>
        </div>
    )
};

export default ConfirmRideSuccessScene;
