let cart = []

if (localStorage.getItem("CART")) {
    cart = JSON.parse(localStorage.getItem("CART"));
}
const stateDefault = {
    carts: cart
}
export const CartReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "ADD_CART": {
            let cartUpdate = [...state.carts];

            if (cartUpdate.length === 0) {
                cartUpdate.push(action.item)
            } else {
                let i = cartUpdate.findIndex(item => { return (item.id === action.item.id && item.sizeName === action.item.sizeName) })
                if (i !== -1) {
                    console.log("Có rồi")
                    cartUpdate[i].number += action.item.number;
                } else {
                    console.log("Mới")
                    cartUpdate.push(action.item);
                }
            }
            localStorage.setItem("CART", JSON.stringify(cartUpdate));
            state.carts = cartUpdate;
            return { ...state }
        }
        case 'TANG_GIAM': {

            let cartUpdate = [...state.carts];
            let i = cartUpdate.findIndex(sp => sp.id === action.id);

            if (i !== -1) {
                if (action.boolean) {
                    cartUpdate[i].number += 1;
                } else if (!action.boolean) {
                    if (cartUpdate[i].number > 1) {
                        cartUpdate[i].number -= 1
                    } else {
                        alert("Sản Phẩm Phải Bằng Hoặc Lớn Hơn 1, Nếu Không Muốn Mua : Bấm 'Xóa'")
                    }
                }
            }
            localStorage.setItem("CART", JSON.stringify(cartUpdate));
            state.carts = cartUpdate;
            return { ...state }
        }
        case "DELETE_CART": {
            let cartUpdate = [...state.carts];
            let i = cartUpdate.findIndex(sp => sp.id === action.num);
            if (i !== -1) {
                cartUpdate.splice(i, 1);
            }
            localStorage.setItem("CART", JSON.stringify(cartUpdate));
            state.carts = cartUpdate;
            return { ...state }
        }
        case "ADD_SIZE": {

            let cartUpdate = [...state.carts];
            let i = cartUpdate.findIndex(sp => sp.id === action.id);

            let name;
            if (action.value === 1) {
                name = "S"
            } else if (action.value === 2) {
                name = "M"
            } else if (action.value === 3) {
                name = "L"
            } else if (action.value === 4) {
                name = "XL"
            } else if (action.value === 5) {
                name = "XXL"
            }
            if (i !== -1) {
                cartUpdate[i].size = action.value
                cartUpdate[i].sizeName = name
            }
            localStorage.setItem("CART", JSON.stringify(cartUpdate));
            state.carts = cartUpdate;
            return { ...state }
        }
        case "DONE": {
            let cartUpdate = [];
            alert("Đặt Hàng Thành Công")
            localStorage.removeItem("CART");
            state.carts = cartUpdate;
            return { ...state }
        }
        default:
            return { ...state }

    }
}