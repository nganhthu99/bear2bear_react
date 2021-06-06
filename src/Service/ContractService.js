export async function loadAddress(web3) {
    return await web3.eth.getAccounts()
}

export async function loadBalance(web3, address) {
    return await web3.eth.getBalance(address)
}
