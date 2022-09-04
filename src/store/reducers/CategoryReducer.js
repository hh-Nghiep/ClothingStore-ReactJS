

const stateDefault = {
    cate: []
}

export const CategoryReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "GET_ALL_CATEGORY": {
            state.cate = action.cate
            return { ...state }
        }

        default:
            return { ...state }
    }
}