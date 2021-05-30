import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        justifyContent: 'center'
    },
    paper: {
        margin: theme.spacing(10, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(0.5),
    },
    typography: {
        margin: theme.spacing(10)
    }
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
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography variant="h3" gutterBottom className={classes.typography}>BEAR2BEAR</Typography>
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
            </Grid>
        </Grid>
    );
};

export default HomeScene;
