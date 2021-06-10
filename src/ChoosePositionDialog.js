import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import MapContainer from "./GoogleMap";
import InputAdornment from "@material-ui/core/InputAdornment";
import NotListedLocationRoundedIcon from "@material-ui/icons/NotListedLocationRounded";
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ChoosePositionDialog = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open || false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (props.close) props.close();
    };

    return (
        <div>
            {!props.open && (
                <IconButton
                    onClick={handleClickOpen}
                    edge="end"
                    color="primary"
                >
                    <NotListedLocationRoundedIcon />
                </IconButton>
            )}
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Google Map
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Confirm
                        </Button>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ height: "100vh" }}>
                    <MapContainer
                        position={props.position}
                        destination={props.destination}
                        isRider={props.isRider}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default ChoosePositionDialog;
