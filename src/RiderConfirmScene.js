import React from 'react';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        justifyContent: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
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

    const handleConfirmButton = () => {

    }

    return (
        // <div>
        //     <Button onClick={handleConfirmButton}>Confirm Pick Up</Button>
        // </div>
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
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
            </Grid>
        </Grid>
    )
};

export default RiderConfirmScene;
