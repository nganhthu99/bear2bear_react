import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4, 29, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    typography: {
        margin: theme.spacing(5,0,5,0)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(0.5),
    },
}));

const HomeScene = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const handleRiderButton = () => {
        history.push('/request-ride')
    }

    const handleDriverButton = () => {
        history.push('/register-drive')
    }

    return (
        <div className={classes.paper}>
            <Typography variant="h3" gutterBottom className={classes.typography}>BEAR2BEAR</Typography>

            <div className={classes.form}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleRiderButton}>
                    Rider
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleDriverButton}>
                    Driver
                </Button>
            </div>
        </div>
    );
};

export default HomeScene;
