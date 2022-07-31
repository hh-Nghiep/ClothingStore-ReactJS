

const stateDefault = {
    size: [

    ]
}

export const SizeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "GET_ALL_SIZE": {
            state.size = action.size
            return { ...state }
        }
        default:
            return { ...state }
    }
}