const courseListReducer = (state = 0, action) => {
    switch(action.type) {
        case 'COURSES':
            return state = action.payload;
        default:
            return state;
    }
};

export default courseListReducer; 