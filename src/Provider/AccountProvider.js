import React, {createContext, useState} from 'react';
const AccountContext = createContext()

const AccountProvider = (props) => {
    const [account, setAccount] = useState({})

    return(
        <AccountContext.Provider value={{account, setAccount}}>
            {props.children}
        </AccountContext.Provider>
    )
};

export { AccountContext, AccountProvider };
