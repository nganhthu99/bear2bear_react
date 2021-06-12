export const TODO_LIST_ADDRESS = "0x3F61b629Cc5428B94fE0d8CBb4Ac93E81B9F7008";

export const TODO_LIST_ABI = [
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        name: "listDrivers",
        outputs: [
            {
                name: "index",
                type: "uint256",
            },
            {
                name: "addr",
                type: "address",
            },
            {
                name: "phoneNumber",
                type: "string",
            },
            {
                name: "vehicleType",
                type: "uint8",
            },
            {
                name: "vehicleDetail",
                type: "string",
            },
            {
                name: "position",
                type: "string",
            },
            {
                name: "pricePerKm",
                type: "uint256",
            },
            {
                name: "state",
                type: "uint8",
            },
            {
                components: [
                    {
                        name: "riderAddress",
                        type: "string",
                    },
                    {
                        name: "phoneNumber",
                        type: "string",
                    },
                    {
                        name: "position",
                        type: "string",
                    },
                    {
                        name: "destination",
                        type: "string",
                    },
                    {
                        name: "distance",
                        type: "uint256",
                    },
                    {
                        components: [
                            {
                                name: "lat",
                                type: "string",
                            },
                            {
                                name: "lng",
                                type: "string",
                            },
                        ],
                        name: "geometry",
                        type: "tuple",
                    },
                ],
                name: "rider",
                type: "tuple",
            },
            {
                components: [
                    {
                        name: "lat",
                        type: "string",
                    },
                    {
                        name: "lng",
                        type: "string",
                    },
                ],
                name: "geometry",
                type: "tuple",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "driverIndex",
                type: "uint256",
            },
            {
                indexed: false,
                name: "driverAddress",
                type: "address",
            },
            {
                indexed: false,
                name: "riderAddress",
                type: "string",
            },
            {
                indexed: false,
                name: "riderPhoneNumber",
                type: "string",
            },
            {
                indexed: false,
                name: "riderPosition",
                type: "string",
            },
            {
                indexed: false,
                name: "riderDestination",
                type: "string",
            },
            {
                indexed: false,
                name: "riderDistance",
                type: "uint256",
            },
            {
                indexed: false,
                name: "lat",
                type: "string",
            },
            {
                indexed: false,
                name: "lng",
                type: "string",
            },
        ],
        name: "NewRide",
        type: "event",
    },
    {
        constant: true,
        inputs: [],
        name: "getListDrivers",
        outputs: [
            {
                components: [
                    {
                        name: "index",
                        type: "uint256",
                    },
                    {
                        name: "addr",
                        type: "address",
                    },
                    {
                        name: "phoneNumber",
                        type: "string",
                    },
                    {
                        name: "vehicleType",
                        type: "uint8",
                    },
                    {
                        name: "vehicleDetail",
                        type: "string",
                    },
                    {
                        name: "position",
                        type: "string",
                    },
                    {
                        name: "pricePerKm",
                        type: "uint256",
                    },
                    {
                        name: "state",
                        type: "uint8",
                    },
                    {
                        components: [
                            {
                                name: "riderAddress",
                                type: "string",
                            },
                            {
                                name: "phoneNumber",
                                type: "string",
                            },
                            {
                                name: "position",
                                type: "string",
                            },
                            {
                                name: "destination",
                                type: "string",
                            },
                            {
                                name: "distance",
                                type: "uint256",
                            },
                            {
                                components: [
                                    {
                                        name: "lat",
                                        type: "string",
                                    },
                                    {
                                        name: "lng",
                                        type: "string",
                                    },
                                ],
                                name: "geometry",
                                type: "tuple",
                            },
                        ],
                        name: "rider",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                name: "lat",
                                type: "string",
                            },
                            {
                                name: "lng",
                                type: "string",
                            },
                        ],
                        name: "geometry",
                        type: "tuple",
                    },
                ],
                name: "",
                type: "tuple[]",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "addr",
                type: "address",
            },
            {
                name: "phoneNumber",
                type: "string",
            },
            {
                name: "vehicleType",
                type: "uint8",
            },
            {
                name: "vehicleDetail",
                type: "string",
            },
            {
                name: "position",
                type: "string",
            },
            {
                name: "pricePerKm",
                type: "uint256",
            },
            {
                name: "lat",
                type: "string",
            },
            {
                name: "lng",
                type: "string",
            },
        ],
        name: "registerDrive",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "driverIndex",
                type: "uint256",
            },
            {
                name: "driverAddress",
                type: "address",
            },
            {
                name: "riderAddress",
                type: "string",
            },
            {
                name: "riderPhoneNumber",
                type: "string",
            },
            {
                name: "riderPosition",
                type: "string",
            },
            {
                name: "riderDestination",
                type: "string",
            },
            {
                name: "riderDistance",
                type: "uint256",
            },
            {
                name: "lat",
                type: "string",
            },
            {
                name: "lng",
                type: "string",
            },
        ],
        name: "processRide",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "index",
                type: "uint256",
            },
        ],
        name: "removeDriverByIndex",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "driverIndex",
                type: "uint256",
            },
        ],
        name: "finishRide",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
