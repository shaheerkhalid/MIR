
const cartReducer = (state = 0, action) => {
    switch(action.type) {
        case 'ADDTOCART':
            // state.products.push(action.payload);
            return state=action.payload;
        case 'DELETEFROMCART':
            return state="";
        default:
            return state;
    }
};

export default cartReducer;