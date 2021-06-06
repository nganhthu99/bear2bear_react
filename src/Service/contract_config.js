export const TODO_LIST_ADDRESS = '0xe2475Ee427c378325A1304C2e67325217456f867'

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
                "name": "index",
                "type": "uint256"
            },
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "name": "vehicleType",
                "type": "uint8"
            },
            {
                "name": "vehicleDetail",
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
                    },
                    {
                        "name": "destination",
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
                "name": "riderAddress",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "riderPhoneNumber",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "riderPosition",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "riderDestination",
                "type": "string"
            }
        ],
        "name": "NewRide",
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
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "name": "phoneNumber",
                        "type": "string"
                    },
                    {
                        "name": "vehicleType",
                        "type": "uint8"
                    },
                    {
                        "name": "vehicleDetail",
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
                            },
                            {
                                "name": "destination",
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
                "name": "addr",
                "type": "address"
            },
            {
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "name": "vehicleType",
                "type": "uint8"
            },
            {
                "name": "vehicleDetail",
                "type": "string"
            },
            {
                "name": "position",
                "type": "string"
            },
            {
                "name": "pricePerKm",
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
                "name": "driverIndex",
                "type": "uint256"
            },
            {
                "name": "driverAddress",
                "type": "address"
            },
            {
                "name": "riderAddress",
                "type": "string"
            },
            {
                "name": "riderPhoneNumber",
                "type": "string"
            },
            {
                "name": "riderPosition",
                "type": "string"
            },
            {
                "name": "riderDestination",
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
                "name": "driverIndex",
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

