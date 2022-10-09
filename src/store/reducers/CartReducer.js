
const initialState = {
    carts: JSON.parse(localStorage.getItem("CART:" + JSON.parse(localStorage.getItem("infoUser"))?.maNguoiDung)) || []
}

export const CartReducer = (state = initialState, action) => {
    var check = 0;
    switch (action.type) {
        case 'ADD_CART': {
            const newCart = [...state.carts];
            const item = action.payload.item;

            check = newCart.map(itcart => itcart.maCT).indexOf(parseInt(`${item.maCT}`))
            if (check === -1) {
                newCart.push(item);
            } else {
                if ((newCart[check].SL + item.SL) > parseInt(action.payload.SL)) {
                    alert(`Size Không Đủ Số Lượng Sản Phẩm !!!\n\nTrong Giỏ Hàng Đã Có ${newCart[check].SL} Sản Phẩm`)
                } else {
                    newCart[check].SL += parseInt(item.SL);
                }
            }
            console.log(newCart)
            localStorage.setItem("CART:" + JSON.parse(localStorage.getItem("infoUser")).maNguoiDung, JSON.stringify(newCart));

            return { ...state, carts: newCart }
        }
        case 'UPDATE_AMOUNT': {
            const newCart = [...state.carts];
            check = newCart.map(itcart => itcart.maCT).indexOf(parseInt(action.payload.maCT));
            if (action.payload.calc) {
                newCart[check].SL += 1;
            } else {
                newCart[check].SL -= 1;
            }
            localStorage.setItem("CART:" + JSON.parse(localStorage.getItem("infoUser")).maNguoiDung, JSON.stringify(newCart));
            return { ...state, carts: newCart }
        }
        case "DELETE_CART": {
            const newCart = [...state.carts];
            const maCT = action.payload.maCT;
            check = newCart.map(itcart => itcart.maCT).indexOf(parseInt(maCT))
            if (check > -1) {
                newCart.splice(check, 1);
                localStorage.setItem("CART:" + JSON.parse(localStorage.getItem("infoUser")).maNguoiDung, JSON.stringify(newCart));
            }
            return { ...state, carts: newCart }
        }
        case "GET_CART": {
            const newCart = JSON.parse(localStorage.getItem("CART:" + JSON.parse(localStorage.getItem("infoUser")).maNguoiDung)) || [];
            return { ...state, carts: newCart }
        }
        case "DONE": {
            localStorage.removeItem("CART:" + JSON.parse(localStorage.getItem("infoUser")).maNguoiDung);
            return { ...state, carts: [] }
        }
        default:
            return { ...state }
    }
}