const searchReducer = (state = 0, action) => {
    switch(action.type) {
        case 'SEARCH':
            return state=action.payload;
        default:
            return state;
    }
};

export default searchReducer;