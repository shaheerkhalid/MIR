const coursedataReducer = (state = 0, action) => {
    switch(action.type) {
        case 'COURSEDATA':
            return state = action.payload;
        default:
            return state;
    }
};

export default coursedataReducer;