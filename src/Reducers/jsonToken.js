const jsontokenReducer = (state = 0, action) => {
    switch(action.type) {
        case 'JSON_TOKEN':
            // console.log(action.payload);
            return state = action.payload;
        default:
            return state;
    }
};

export default jsontokenReducer;