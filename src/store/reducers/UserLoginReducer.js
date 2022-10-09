const stateDefault = {
    userLogin: localStorage.getItem('isLogin'),
    role: JSON.parse(localStorage.getItem("infoUser"))?.role,
    infoUser: JSON.parse(localStorage.getItem("infoUser")),
}

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "SET_LOGIN": {
            localStorage.setItem("isLogin", action.payload.status)
            return { ...state, userLogin: action.payload.status };
        }
        case "SET_ROLE": {
            var newRole = action.payload.role;
            return { ...state, role: newRole };
        }
        case "SET_INFO": {
            var info = action.payload.info;
            return { ...state };
        }
        default:
            return { ...state }
    }
}