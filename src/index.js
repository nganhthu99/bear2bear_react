import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import {AccountProvider} from "./AccountProvider";
import {ContractProvider} from "./ContractProvider";
import {SocketContractProvider} from "./SocketContractProvider";
import { ThemeProvider } from '@material-ui/styles';
import {theme} from "./Theme";

ReactDOM.render(
    <BrowserRouter>
        <AccountProvider>
            <SocketContractProvider>
                <ContractProvider>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </ContractProvider>
            </SocketContractProvider>
        </AccountProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
