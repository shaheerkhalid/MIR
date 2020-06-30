
const cartReducer = (state = 0, action) => {
    switch(action.type) {
        case 'ADDTOCART':
            return state=action.payload;
        case 'DELETEFROMCART':
            return state=action.payload;
        default:
            return state;
    }
};

export default cartReducer;