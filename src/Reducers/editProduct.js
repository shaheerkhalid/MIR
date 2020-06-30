const editProductReducer = (state = "", action) => {
    switch(action.type) {
        case 'EDITPRODUCT':
            return state = action.payload;
        default:
            return state;
    }
};

export default editProductReducer;