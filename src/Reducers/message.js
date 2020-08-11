const messageReducer = (state = 0, action) => {
    switch(action.type) {
        case 'MESSAGE':
            return state = action.payload;
        default:
            return state;
    }
};

export default messageReducer;