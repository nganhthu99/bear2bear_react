import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: "#ff96ad",
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#005a8d',
        },
    },
});
