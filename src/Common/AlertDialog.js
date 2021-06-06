import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = (props) => {
    return (
        <Dialog
            open={true}
            onClose={props.close}>
            <DialogTitle>{"Are you sure wanting to process making transaction?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This will lead to making a new transaction, which will cost you some Ether.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={props.close} color="primary">
                    Close
                </Button>
                <Button variant="outlined" onClick={props.process} color="primary" autoFocus>
                    Process
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default AlertDialog;
