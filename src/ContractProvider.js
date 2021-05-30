import React, {createContext, useState} from 'react';
const ContractContext = createContext()

const ContractProvider = (props) => {
    const [contract, setContract] = useState({})

    return(
        <ContractContext.Provider value={{contract, setContract}}>
            {props.children}
        </ContractContext.Provider>
    )
};

export { ContractContext, ContractProvider };
