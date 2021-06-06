import React, {useContext, useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import {AccountContext} from "./Provider/AccountProvider";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(1),
        fontWeight: 600
    },
    paper: {
        margin: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}));
const AccountInfoPopover = (props) => {
    const classes = useStyles();
    const {account, setAccount} = useContext(AccountContext)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="secondary"
            >
                <AccountBalanceWalletRoundedIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <div className={classes.paper}>
                        <Box className={classes.typography}>Address</Box>
                        <Tooltip title="Copy to clipboard" aria-label="add">
                            <Chip
                                variant="outlined"
                                label={`${account.address}`}
                                color="primary"
                                onClick={() => {
                                    navigator.clipboard.writeText(account.address)
                                }}
                            />
                        </Tooltip>
                        <Box className={classes.typography}>Balance</Box>
                        <Typography variant="h5">{`${account.balance} ETH`}</Typography>
                </div>
            </Popover>
        </div>
    )
};

export default AccountInfoPopover;
