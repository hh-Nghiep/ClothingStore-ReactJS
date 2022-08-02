import { TOKEN, USER_LOGIN } from "~/util/setting/config";

let user = {}

const stateDefault = {
    userLogin: user
}

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "LOGIN": {
            const { values } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(values));
            localStorage.setItem(TOKEN, values.asscess_Token);
            return { ...state, userLogin: values };
        }

        default:
            return { ...state }
    }
}