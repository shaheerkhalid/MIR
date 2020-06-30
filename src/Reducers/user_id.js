const useridReducer = (state = 0, action) => {
    switch(action.type) {
        case 'USER_ID':
            return state = action.payload;
        default:
            return state;
    }
};

export default useridReducer;