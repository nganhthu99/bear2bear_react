import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";

const FeedbackSnackbar = (props) => {
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => {props.close()}}>
            <Alert severity={props.severity} onClose={() => {props.close()}}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default FeedbackSnackbar
