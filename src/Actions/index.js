export const proddata = (data) => {
    return {
        type: 'PRODDATA',
        payload: data
    };
};


export const isLog = () => {
    return {
        type: 'SIGN_IN'
    };
};


export const jsontoken = (token) => {
    return {
        type: 'JSON_TOKEN',
        payload: token
    };
};

export const userid = (id) => {
    return {
        type: 'USER_ID',
        payload: id
    };
};

export const prodlist = (data) => {
    return {
        type: 'PRODUCTS',
        payload: data
    };
};


export const editProd = (data) => {
    return {
        type: 'EDITPRODUCT',
        payload: data
    };
};