const prodListReducer = (state = 0, action) => {
    switch(action.type) {
        case 'USERS':
            return state = action.payload;
        default:
            return state;
    }
};

export default prodListReducer;