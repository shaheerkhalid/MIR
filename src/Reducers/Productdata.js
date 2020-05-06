const proddataReducer = (state = 0, action) => {
    switch(action.type) {
        case 'PRODDATA':
            return state = action.payload;
        default:
            return state;
    }
};

export default proddataReducer;