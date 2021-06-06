import React, {createContext, useState} from 'react';
const ProvidedInfoContext = createContext()

const ProvidedInfoProvider = (props) => {
    const [info, setInfo] = useState({})

    return(
        <ProvidedInfoContext.Provider value={{info, setInfo}}>
            {props.children}
        </ProvidedInfoContext.Provider>
    )
};

export { ProvidedInfoContext, ProvidedInfoProvider };
