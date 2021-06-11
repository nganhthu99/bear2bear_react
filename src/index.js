import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import {AccountProvider} from "./Provider/AccountProvider";
import {ContractProvider} from "./Provider/ContractProvider";
import {SocketContractProvider} from "./Provider/SocketContractProvider";
import { ThemeProvider } from '@material-ui/styles';
import {theme} from "./Style/Theme";
import {ProvidedInfoProvider} from "./Provider/ProvidedInfoProvider";
import {Web3Provider} from "./Provider/Web3Provider";

ReactDOM.render(
    <BrowserRouter>
        <Web3Provider>
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
        </Web3Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
