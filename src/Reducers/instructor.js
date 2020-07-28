const instructorReducer = (state = 0, action) => {
    switch(action.type) {
        case 'INSTRUCTOR':
            return state = action.payload;
        default:
            return state;
    }
};

export default instructorReducer;