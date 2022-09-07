
const stateDefault = {
    arrProductSale: [],
}

export const SaleReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "GET_ALL_SALE": {
            return { ...state, arrProductSale: state.payload.data }
        }
        default:
            return { ...state }
    }
}