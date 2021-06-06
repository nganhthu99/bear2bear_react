import React, {createContext, useState} from 'react';
const SocketContractContext = createContext()

const SocketContractProvider = (props) => {
    const [socketContract, setSocketContract] = useState({})

    return(
        <SocketContractContext.Provider value={{socketContract, setSocketContract}}>
            {props.children}
        </SocketContractContext.Provider>
    )
};

export { SocketContractContext, SocketContractProvider };
