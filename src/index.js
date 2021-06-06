import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import {AccountProvider} from "./Provider/AccountProvider";
import {ContractProvider} from "./Provider/ContractProvider";
import {SocketContractProvider} from "./Provider/SocketContractProvider";
import { ThemeProvider } from '@material-ui/styles';
import {theme} from "./Style/Theme";
import ChoosePositionDialog from "./ChoosePositionDialog";
import {ProvidedInfoProvider} from "./Provider/ProvidedInfoProvider";

ReactDOM.render(
    <BrowserRouter>
        <AccountProvider>
            <SocketContractProvider>
                <ContractProvider>
                    <ProvidedInfoProvider>
                        <ThemeProvider theme={theme}>
                            <App/>
                        </ThemeProvider>
                    </ProvidedInfoProvider>
                </ContractProvider>
            </SocketContractProvider>
        </AccountProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
