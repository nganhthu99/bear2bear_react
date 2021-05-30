export const TODO_LIST_ADDRESS = '0xD0e2074B9ea3A1C6Dc3b4D27FBD64E2b973A1508'

export const TODO_LIST_ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "listDrivers",
        "outputs": [
            {
                "name": "driverIndex",
                "type": "uint256"
            },
            {
                "name": "driverAddress",
                "type": "address"
            },
            {
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "name": "ownedVehicle",
                "type": "uint8"
            },
            {
                "name": "detailVehicle",
                "type": "string"
            },
            {
                "name": "position",
                "type": "string"
            },
            {
                "name": "pricePerKm",
                "type": "uint256"
            },
            {
                "name": "state",
                "type": "uint8"
            },
            {
                "components": [
                    {
                        "name": "riderAddress",
                        "type": "string"
                    },
                    {
                        "name": "phoneNumber",
                        "type": "string"
                    },
                    {
                        "name": "position",
                        "type": "string"
                    }
                ],
                "name": "rider",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "driverIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "driverAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "ownedVehicle",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "detailVehicle",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "position",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "pricePerKm",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "state",
                "type": "uint8"
            }
        ],
        "name": "UpdateListDrivers",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "driverAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "riderAddress",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "position",
                "type": "string"
            }
        ],
        "name": "NewRideIsProcessing",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getListDrivers",
        "outputs": [
            {
                "components": [
                    {
                        "name": "driverIndex",
                        "type": "uint256"
                    },
                    {
                        "name": "driverAddress",
                        "type": "address"
                    },
                    {
                        "name": "phoneNumber",
                        "type": "string"
                    },
                    {
                        "name": "ownedVehicle",
                        "type": "uint8"
                    },
                    {
                        "name": "detailVehicle",
                        "type": "string"
                    },
                    {
                        "name": "position",
                        "type": "string"
                    },
                    {
                        "name": "pricePerKm",
                        "type": "uint256"
                    },
                    {
                        "name": "state",
                        "type": "uint8"
                    },
                    {
                        "components": [
                            {
                                "name": "riderAddress",
                                "type": "string"
                            },
                            {
                                "name": "phoneNumber",
                                "type": "string"
                            },
                            {
                                "name": "position",
                                "type": "string"
                            }
                        ],
                        "name": "rider",
                        "type": "tuple"
                    }
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "removeDriverByIndex",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_driverAddress",
                "type": "address"
            },
            {
                "name": "_phoneNumber",
                "type": "string"
            },
            {
                "name": "_ownedVehicle",
                "type": "uint8"
            },
            {
                "name": "_detailVehicle",
                "type": "string"
            },
            {
                "name": "_position",
                "type": "string"
            },
            {
                "name": "_pricePerKm",
                "type": "uint256"
            }
        ],
        "name": "registerDrive",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_driverIndex",
                "type": "uint256"
            },
            {
                "name": "_driverAddress",
                "type": "address"
            },
            {
                "name": "_riderAddress",
                "type": "string"
            },
            {
                "name": "_riderPhoneNumber",
                "type": "string"
            },
            {
                "name": "_riderPosition",
                "type": "string"
            }
        ],
        "name": "processRide",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "confirmRide",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

