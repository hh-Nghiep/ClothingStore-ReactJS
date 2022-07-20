
const stateDefault = {
    product: [

    ],
}

export const PruductReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "GET_ALL_PRODUCT": {
            state.product = action.product
            return { ...state }
        }
        default:
            return { ...state }
    }
}