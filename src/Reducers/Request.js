const requestReducer = (state = 0, action) => {
    switch(action.type) {
        case 'ADDTOREQUEST':
            return state=action.payload;
        case 'DELETEFROMREQUEST':
            return state=action.payload;
        default:
            return state;
    }
};

export default requestReducer;