export const SCALE_3D = 0.001
export const GRID_GROUP_NAME = "GRID_GROUP_NAME"
export const INTERLOCKING_LOCK_HEIGHT = 0.005;

export const SIGN_PANEL_GROUP_NAME = "SIGN_PANEL_GROUP_NAME"

export const TAB_OPTIONS = {
    PANEL: 0,
    CHANNEL: 1,
    POST: 2
}

export const CHANNEL_SIZE = {
    SMALL: 1,
    MEDIUM: 2
}

export const COLOURS = {
    GREY: {
        text: "Grey",
        value: '#808080'
    },
    BLACK: {
        text: "Black",
        value: '#000000'
    },
    WHITE: {
        text: "White",
        value: '#FFFFFF'
    },
    MILL: {
        text: "Mill",
        value: '#0C347E'
    },
    SILVER: {
        text: "Silver",
        value: '#C0C0C0'
    },
    OAK_EFFECT: {
        text: "Oak effect",
        value: '#D8B589'
    },
    TEAK_EFFECT: {
        text: "Teak effect",
        value: '#8C522A'
    },
    STAINLESS: {
        text: "Stainless",
        value: '#d2d7dd'
    },
}

export const CHANNEL_SIZE_OPTIONS = [
    {
        text: 'Small',
        value: CHANNEL_SIZE.SMALL,
        objectUrl: '/models/Channel/small_sign_channel.glb'
    },
    {
        text: 'Medium',
        value: CHANNEL_SIZE.MEDIUM,
        objectUrl: '/models/Channel/medium_sign_channel.glb'
    }
]

export const CHANEL_COLOUR_OPTIONS = [
    COLOURS.GREY,
    COLOURS.BLACK,
    COLOURS.WHITE,
    // COLOURS.MILL
]

export const PANEL_MATERIAL = {
    ACM: 1,
    ALUMINIUM: 2
}

export const PANEL_COLOURS = {
    WHITE_GREY: {
        text: 'White/Grey',
        value: 'White/Grey',
        colours: [
            COLOURS.WHITE,
            COLOURS.GREY
        ]
    },
    WHITE_WHITE: {
        text: 'White/White',
        value: 'White/White',
        colours: [
            COLOURS.WHITE,
            COLOURS.WHITE
        ]
    },
    BLACK_BLACK: {
        text: 'Black/Black',
        value: 'Black/Black',
        colours: [
            COLOURS.BLACK,
            COLOURS.BLACK
        ]
    }
}

export const PANEL_MATERIAL_OPTIONS = [
    {
        text: 'ACM',
        value: PANEL_MATERIAL.ACM,
        colours: [
            PANEL_COLOURS.WHITE_GREY,
            PANEL_COLOURS.WHITE_WHITE,
            PANEL_COLOURS.BLACK_BLACK
        ]
    },
    {
        text: 'Alumium',
        value: PANEL_MATERIAL.ALUMINIUM,
        colours: [
            PANEL_COLOURS.WHITE_GREY,
        ]
    }
]

export const SHAPE = {
    STANDARD_RECTANGLE: 1,
    DOME_TOP_SIGN: 2,
    CATHEDRAL_SIGN: 3,
    CIRCLE: 4,
    TRIANGLE: 5,
    OCTAGON: 6
}

export const OPTION_TYPE = {
    TYPE: 1,
    SELECT: 2
}

export const SHAPE_OPTIONS = [
    {
        text: 'Standard Rectangle',
        value: SHAPE.STANDARD_RECTANGLE,
        type: OPTION_TYPE.TYPE,
        minWidth: 150,
        minHeight: 150,
        maxWidth: 4800,
        maxHeight: 4800,
        eachWidth: 2400,
        eachHeight: 1200
    },
    {
        text: 'Dome Top Sign',
        value: SHAPE.DOME_TOP_SIGN,
        type: OPTION_TYPE.TYPE,
        minWidth: 150,
        minHeight: 150,
        maxWidth: 1200,
        maxHeight: 2400,
        eachWidth: 2400,
        eachHeight: 1200
    },
    {
        text: 'Cathedral Sign',
        value: SHAPE.CATHEDRAL_SIGN,
        type: OPTION_TYPE.TYPE,
        minWidth: 150,
        minHeight: 150,
        maxWidth: 1200,
        maxHeight: 2400,
        eachWidth: 2400,
        eachHeight: 1200
    },
    {
        text: 'Circle',
        value: SHAPE.CIRCLE,
        type: OPTION_TYPE.SELECT,
        minWidth: 150,
        minHeight: 150,
        maxWidth: 900,
        maxHeight: 900,
        eachWidth: 900,
        eachHeight: 900
    },
    {
        text: 'Triangle',
        value: SHAPE.TRIANGLE,
        type: OPTION_TYPE.SELECT,
        minWidth: 150,
        minHeight: 150,
        maxWidth: 900,
        maxHeight: 900,
        eachWidth: 900,
        eachHeight: 900
    },
    {
        text: 'Octagon',
        value: SHAPE.OCTAGON,
        type: OPTION_TYPE.SELECT,
        minWidth: 150,
        minHeight: 150,
        maxWidth: 900,
        maxHeight: 900,
        eachWidth: 900,
        eachHeight: 900
    }
]

export const SHAPE_SIZE_OPTIONS = [
    {
        text: 150,
        value: 150
    },
    {
        text: 200,
        value: 200
    },
    {
        text: 300,
        value: 300
    },
    {
        text: 450,
        value: 450
    },
    {
        text: 600,
        value: 600
    },
    {
        text: 750,
        value: 750
    },
    {
        text: 900,
        value: 900
    }
]

export const RADIUS_CORNER_OPTIONS = [
    {
        text: 'None',
        value: 0
    },
    {
        text: '8mm',
        value: 8
    },
    {
        text: '12mm',
        value: 12
    },
    {
        text: '16mm',
        value: 16
    },
    {
        text: '25mm',
        value: 25
    }
]

export const INTERLOCKING_COLOUR_OPTIONS = [COLOURS.GREY]

export const FIXING_METHOD = {
    SELF_ADHESIVE_TAPE: 1,
    FLUSH_RIVET: 2
}

export const FIXING_METHOD_OPTIONS = [
    {
        text: 'Self Adhesive Tape',
        value: FIXING_METHOD.SELF_ADHESIVE_TAPE
    },
    {
        text: 'Flush Rivet',
        value: FIXING_METHOD.FLUSH_RIVET
    },
]

export const POST_LENGTH = {
    '1M': {
        text: '1m',
        value: 1000
    },
    '1.5M': {
        text: '1.5m',
        value: 1500
    },
    '2M': {
        text: '2m',
        value: 2000
    },
    '2.5M': {
        text: '2.5m',
        value: 2500
    },
    '3M': {
        text: '3m',
        value: 3000
    },
    '3.5M': {
        text: '3.5m',
        value: 3500
    },
    '4M': {
        text: '4m',
        value: 4000
    },
    '5M': {
        text: '5m',
        value: 5000
    },
    '6M': {
        text: '6m',
        value: 6000
    }
}

export const POST_TYPE = {
    DIA: 1,
    SQUARE: 2
}

export const POST_SIZE_OPTIONS = [
    {
        text: '50mm Dia',
        value: 1,
        size: 50,
        type: POST_TYPE.DIA,
        colours: [
            COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE, COLOURS.SILVER, COLOURS.MILL
        ],
        lengths: [
            POST_LENGTH["1M"], POST_LENGTH["1.5M"], POST_LENGTH["2M"], POST_LENGTH["2.5M"], POST_LENGTH["3M"], POST_LENGTH["3.5M"],
            POST_LENGTH["4M"], POST_LENGTH["5M"], POST_LENGTH["6M"]
        ],
        capColours: [
            COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ],
        clipColours: [
            COLOURS.STAINLESS, COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ]
    },
    {
        text: '76mm Dia',
        value: 2,
        size: 76,
        type: POST_TYPE.DIA,
        colours: [
            COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE, COLOURS.SILVER, COLOURS.MILL
        ],
        lengths: [
            POST_LENGTH["1M"], POST_LENGTH["1.5M"], POST_LENGTH["2M"], POST_LENGTH["2.5M"], POST_LENGTH["3M"], POST_LENGTH["3.5M"],
            POST_LENGTH["4M"], POST_LENGTH["5M"], POST_LENGTH["6M"]
        ],
        capColours: [
            COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ],
        clipColours: [
            COLOURS.STAINLESS, COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ]
    },
    {
        text: '89mm Dia',
        value: 3,
        size: 89,
        type: POST_TYPE.DIA,
        colours: [
            COLOURS.GREY
        ],
        lengths: [
           POST_LENGTH["3M"], POST_LENGTH["4M"], POST_LENGTH["5M"], POST_LENGTH["6M"]
        ],
        capColours: [
            COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ],
        clipColours: [
            COLOURS.STAINLESS, COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ]
    },
    {
        text: '102mm Dia',
        value: 4,
        size: 102,
        type: POST_TYPE.DIA,
        colours: [
            COLOURS.GREY, COLOURS.WHITE
        ],
        lengths: [
           POST_LENGTH["3M"], POST_LENGTH["5M"], POST_LENGTH["6M"]
        ],
        capColours: [
            COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ],
        clipColours: [
            COLOURS.STAINLESS, COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ]
    },
    {
        text: '114mm Dia',
        value: 5,
        size: 114,
        type: POST_TYPE.DIA,
        colours: [
            COLOURS.GREY, COLOURS.WHITE
        ],
        lengths: [
           POST_LENGTH["5M"], POST_LENGTH["6M"]
        ],
        capColours: [
            COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ],
        clipColours: [
            COLOURS.STAINLESS, COLOURS.GREY, COLOURS.BLACK, COLOURS.WHITE
        ]
    },
    {
        text: '50x50mm Square',
        value: 6,
        size: 50,
        type: POST_TYPE.SQUARE,
        colours: [
            COLOURS.BLACK, COLOURS.WHITE, COLOURS.OAK_EFFECT, COLOURS.TEAK_EFFECT
        ],
        lengths: [
            POST_LENGTH["1M"], POST_LENGTH["1.5M"], POST_LENGTH["2M"], POST_LENGTH["2.5M"], POST_LENGTH["3M"], POST_LENGTH["3.5M"],
            POST_LENGTH["4M"], POST_LENGTH["5M"], POST_LENGTH["6M"]
        ],
        capColours: [
            COLOURS.BLACK, COLOURS.WHITE, COLOURS.OAK_EFFECT
        ],
        clipColours: [
            COLOURS.STAINLESS
        ]
    },
    {
        text: '76x76mm Square',
        value: 7,
        size: 76,
        type: POST_TYPE.SQUARE,
        colours: [
            COLOURS.BLACK, COLOURS.WHITE, COLOURS.OAK_EFFECT, COLOURS.TEAK_EFFECT
        ],
        lengths: [
            POST_LENGTH["1M"], POST_LENGTH["1.5M"], POST_LENGTH["2M"], POST_LENGTH["2.5M"], POST_LENGTH["3M"], POST_LENGTH["3.5M"],
            POST_LENGTH["4M"], POST_LENGTH["5M"], POST_LENGTH["6M"]
        ],
        capColours: [
            COLOURS.BLACK, COLOURS.WHITE, COLOURS.OAK_EFFECT
        ],
        clipColours: [
            COLOURS.STAINLESS
        ]
    },
    {
        text: '100x100mm Square',
        value: 8,
        size: 100,
        type: POST_TYPE.SQUARE,
        colours: [
            COLOURS.BLACK, COLOURS.WHITE, COLOURS.MILL
        ],
        lengths: [
            POST_LENGTH["2.5M"], POST_LENGTH["3M"], POST_LENGTH["5M"], POST_LENGTH["6M"]
        ],
        capColours: [
            COLOURS.BLACK, COLOURS.WHITE, COLOURS.OAK_EFFECT
        ],
        clipColours: [
            COLOURS.STAINLESS
        ]
    },
]

export const DRAFT_ORDER_KEY = "DRAFT_ORDER"
export const OBJECT_TYPES = {
    CHANNEL: "CHANNEL",
    INTERLOCKING: "INTERLOCKING",
    CLIP: "CLIP"
}
export const prefixMapKey = 'map'
export const SHOPIFY_MAP = {
    PRODUCTS_CONFIGS: {
        'PanelProductId': {
            value: "123456789"
        }
    },
    POSTS: {
        [`${prefixMapKey}-${POST_TYPE.DIA}`]: {
            [`${prefixMapKey}-50`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127632624"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127665392"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127698160"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950127730928"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950127763696"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950127796464"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950127829232"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950127862000"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950127894768"
                    }
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127632624"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127665392"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127698160"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950127730928"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950127763696"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950127796464"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950127829232"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950127862000"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950127894768"
                    }
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127632624"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127665392"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127698160"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950127730928"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950127763696"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950127796464"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950127829232"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950127862000"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950127894768"
                    }
                },
                [`${prefixMapKey}-${COLOURS.SILVER.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127632624"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127665392"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127698160"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950127730928"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950127763696"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950127796464"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950127829232"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950127862000"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950127894768"
                    }
                },
                [`${prefixMapKey}-${COLOURS.MILL.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127632624"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127665392"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127698160"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950127730928"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950127763696"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950127796464"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950127829232"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950127862000"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950127894768"
                    }
                }
            },
            [`${prefixMapKey}-76`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127927536"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127960304"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127993072"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128025840"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128058608"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128091376"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128124144"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128156912"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128189680"
                    }
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127927536"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127960304"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127993072"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128025840"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128058608"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128091376"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128124144"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128156912"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128189680"
                    }
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127927536"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127960304"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127993072"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128025840"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128058608"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128091376"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128124144"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128156912"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128189680"
                    }
                },
                [`${prefixMapKey}-${COLOURS.SILVER.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127927536"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127960304"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127993072"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128025840"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128058608"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128091376"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128124144"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128156912"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128189680"
                    }
                },
                [`${prefixMapKey}-${COLOURS.MILL.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950127927536"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950127960304"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950127993072"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128025840"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128058608"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128091376"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128124144"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128156912"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128189680"
                    }
                }
            },
            [`${prefixMapKey}-89`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128222448"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128255216"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128287984"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128320752"
                    }
                },
            },
            [`${prefixMapKey}-102`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128353520"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128386288"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128419056"
                    }
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128353520"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128386288"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128419056"
                    }
                },
            },
            [`${prefixMapKey}-114`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128451824"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128484592"
                    }
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128451824"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128484592"
                    }
                },
            }
        },
        [`${prefixMapKey}-${POST_TYPE.SQUARE}`]: {
            [`${prefixMapKey}-50`]: {
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950128517360"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950128550128"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950128582896"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128615664"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128648432"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128681200"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128713968"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128746736"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128779504"
                    }
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950128517360"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950128550128"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950128582896"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128615664"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128648432"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128681200"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128713968"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128746736"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128779504"
                    }
                },
                [`${prefixMapKey}-${COLOURS.OAK_EFFECT.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950128517360"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950128550128"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950128582896"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128615664"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128648432"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128681200"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128713968"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128746736"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128779504"
                    }
                },
                [`${prefixMapKey}-${COLOURS.TEAK_EFFECT.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950128517360"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950128550128"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950128582896"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128615664"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128648432"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128681200"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950128713968"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950128746736"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950128779504"
                    }
                }
            },
            [`${prefixMapKey}-76`]: {
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950128812272"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950128845040"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950128877808"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128910576"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128943344"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128976112"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950129008880"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950129041648"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950129074416"
                    }
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950128812272"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950128845040"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950128877808"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128910576"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128943344"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128976112"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950129008880"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950129041648"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950129074416"
                    }
                },
                [`${prefixMapKey}-${COLOURS.OAK_EFFECT.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950128812272"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950128845040"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950128877808"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128910576"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128943344"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128976112"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950129008880"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950129041648"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950129074416"
                    }
                },
                [`${prefixMapKey}-${COLOURS.TEAK_EFFECT.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["1M"].value}`]: {
                        value: "46950128812272"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["1.5M"].value}`]: {
                        value: "46950128845040"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2M"].value}`]: {
                        value: "46950128877808"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950128910576"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950128943344"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3.5M"].value}`]: {
                        value: "46950128976112"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["4M"].value}`]: {
                        value: "46950129008880"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950129041648"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950129074416"
                    }
                }
            },
            [`${prefixMapKey}-100`]: {
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950129107184"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950129139952"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950129172720"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950129205488"
                    }
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950129107184"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950129139952"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950129172720"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950129205488"
                    }
                },
                [`${prefixMapKey}-${COLOURS.MILL.value}`] : {
                    [`${prefixMapKey}-${POST_LENGTH["2.5M"].value}`]: {
                        value: "46950129107184"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["3M"].value}`]: {
                        value: "46950129139952"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["5M"].value}`]: {
                        value: "46950129172720"
                    },
                    [`${prefixMapKey}-${POST_LENGTH["6M"].value}`]: {
                        value: "46950129205488"
                    }
                },
            }
        }
    },
    CAPS: {
        [`${prefixMapKey}-${POST_TYPE.DIA}`]: {
            [`${prefixMapKey}-50`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950176063728"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950176063728"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950176063728"
                },
            },
            [`${prefixMapKey}-76`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950176096496"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950176096496"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950176096496"
                },
            },
            [`${prefixMapKey}-89`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950176129264"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950176129264"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950176129264"
                },
            },
            [`${prefixMapKey}-102`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950176162032"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950176162032"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950176162032"
                },
            },
            [`${prefixMapKey}-114`]: {
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950176194800"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950176194800"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950176194800"
                },
            },
        },
        [`${prefixMapKey}-${POST_TYPE.SQUARE}`]: {
            [`${prefixMapKey}-50`]: {
                [`${prefixMapKey}-${COLOURS.OAK_EFFECT.value}`] : {
                    value: "46950176227568"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950176227568"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950176227568"
                },
            },
            [`${prefixMapKey}-76`]: {
                [`${prefixMapKey}-${COLOURS.OAK_EFFECT.value}`] : {
                    value: "46950176260336"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950176260336"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950176260336"
                },
            },
            [`${prefixMapKey}-100`]: {
                [`${prefixMapKey}-${COLOURS.OAK_EFFECT.value}`] : {
                    value: "46950176293104"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950176293104"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950176293104"
                },
            },
        }
    },
    CLIPS: {
        [`${prefixMapKey}-${POST_TYPE.DIA}`]: {
            [`${prefixMapKey}-50`]: {
                [`${prefixMapKey}-${COLOURS.STAINLESS.value}`] : {
                    value: "46950185763056"
                },
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950185763056"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950185763056"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950185763056"
                },
            },
            [`${prefixMapKey}-76`]: {
                [`${prefixMapKey}-${COLOURS.STAINLESS.value}`] : {
                    value: "46950185795824"
                },
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950185795824"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950185795824"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950185795824"
                },
            },
            [`${prefixMapKey}-89`]: {
                [`${prefixMapKey}-${COLOURS.STAINLESS.value}`] : {
                    value: "46950185828592"
                },
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950185828592"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950185828592"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950185828592"
                },
            },
            [`${prefixMapKey}-102`]: {
                [`${prefixMapKey}-${COLOURS.STAINLESS.value}`] : {
                    value: "46950185861360"
                },
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950185861360"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950185861360"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950185861360"
                },
            },
            [`${prefixMapKey}-114`]: {
                [`${prefixMapKey}-${COLOURS.STAINLESS.value}`] : {
                    value: "46950185894128"
                },
                [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                    value: "46950185894128"
                },
                [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                    value: "46950185894128"
                },
                [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                    value: "46950185894128"
                },
            },
        },
        [`${prefixMapKey}-${POST_TYPE.SQUARE}`]: {
            [`${prefixMapKey}-50`]: {
                [`${prefixMapKey}-${COLOURS.STAINLESS.value}`] : {
                    value: "46950185926896"
                }
            },
            [`${prefixMapKey}-76`]: {
                [`${prefixMapKey}-${COLOURS.STAINLESS.value}`] : {
                    value: "46950185959664"
                }
            },
            [`${prefixMapKey}-100`]: {
                [`${prefixMapKey}-${COLOURS.STAINLESS.value}`] : {
                    value: "46950185992432"
                }
            },
        }
    },
    CHANNELS: {
        [CHANNEL_SIZE.SMALL]: {
            [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                value: "46950183207152"
            },
            [`${prefixMapKey}-${COLOURS.BLACK.value}`] : {
                value: "46950183207152"
            },
            [`${prefixMapKey}-${COLOURS.WHITE.value}`] : {
                value: "46950183207152"
            },
            [`${prefixMapKey}-${COLOURS.MILL.value}`] : {
                value: "46950183207152"
            }
        },
        [CHANNEL_SIZE.MEDIUM]: {
            [`${prefixMapKey}-${COLOURS.GREY.value}`] : {
                value: "46950183239920"
            },
        }
    },
    INTERLOCKING: {
        value: "46950127108336"
    }
}

export const EVENT_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART'
}

export const TRIANGLE_SIZE = {
    "450": {
        width: 509.13,
        height: 450,
        channelOffset: [
            0.12898,
            0.39992,
        ],
    },
    "600": {
        width: 678.84,
        height: 600,
        channelOffset: [
            0.17389,
            0.54998
        ],
    },
    "750": {
        width: 848.55,
        height: 750,
        channelOffset: [
            0.21682,
            0.64995
        ],
    },
    "900": {
        width: 1018.26,
        height: 900,
        channelOffset: [
            0.22044,
            0.51017,
            0.7999
        ],
    },
}

export const CIRCLE_SIZE = {
    "300": {
        width: 300,
        height: 300,
        channelOffset: [
            0.06841,
            0.23159
        ],
    },
    "450": {
        width: 450,
        height: 450,
        channelOffset: [
            0.10939,
            0.34061
        ],
    },
    "600": {
        width: 600,
        height: 600,
        channelOffset: [
            0.14889,
            0.45111
        ],
    },
    "750": {
        width: 750,
        height: 750,
        channelOffset: [
            0.14589,
            0.56451
        ],
    },
    "900": {
        width: 900,
        height: 900,
        channelOffset: [
            0.14945,
            0.45,
            0.75055
        ],
    },
}

export const OCTAGON_SIZE = {
    "450": {
        width: 450,
        height: 450,
        channelOffset: [
            0.08508,
            0.36492
        ],
    },
    "600": {
        width: 600,
        height: 600,
        channelOffset: [
            0.1135,
            0.4865
        ],
    },
    "750": {
        width: 750,
        height: 750,
        channelOffset: [
            0.14537,
            0.60463
        ],
    },
}