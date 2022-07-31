
const stateDefault = {
    product: [],
    productID: [],
    renderCate: [],
    productCopy: []
}

export const ProductReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "GET_ALL_PRODUCT": {
            state.product = action.product;
            state.renderCate = action.product;
            return { ...state }
        }
        case "GET_PRODUCT": {
            state.productID = action.productID;
            return { ...state }
        }
        case "SORT": {
            let productUpdate = [...state.renderCate]
            if (action.num === 1) {
                productUpdate = productUpdate.sort(function (a, b) { return a.discount - b.discount })
            } else if (action.num === 2) {
                productUpdate = productUpdate.sort(function (a, b) { return b.discount - a.discount })
            } else if (action.num === 3) {
                // productUpdate = productUpdate.sort()
                productUpdate = productUpdate.sort((a, b) => a.title.localeCompare(b.title))
            } else {
                productUpdate = productUpdate.reverse()
            }
            state.renderCate = productUpdate;
            return { ...state }
        }
        case "FILTER": {
            console.log("renderCate", state.renderCate)
            console.log("payload", action.payload)
            state.renderCate = [...action.payload];
            return { ...state }
        }
        default:
            return { ...state }
    }
}