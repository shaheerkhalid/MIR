const emailReducer = (state = 0, action) => {
    switch(action.type) {
        case 'EMAIL':
            return state = action.payload;
        default:
            return state;
    }
};

export default emailReducer;