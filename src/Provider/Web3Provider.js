import React, {createContext, useState} from 'react';
const Web3Context = createContext()

const Web3Provider = (props) => {
    const [web3, setWeb3] = useState({})

    return(
        <Web3Context.Provider value={{web3, setWeb3}}>
            {props.children}
        </Web3Context.Provider>
    )
};

export { Web3Context, Web3Provider };
