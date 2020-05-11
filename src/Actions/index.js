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

export const prodlist = (data) => {
    return {
        type: 'PRODUCT',
        payload: data
    };
};


export const userid = (id) => {
    return {
        type: 'USER_ID',
        payload: id
    };
};

export const addtocart = (data) => {
    return {
        type: 'ADDTOCART',
        payload: data
    };
};

export const deletefromcart = () => {
    return {
        type: 'DELETEFROMCART'
    };
};

export const addtorequest = (data) => {
    return {
        type: 'ADDTOREQUEST',
        payload: data
    };
};

export const searchvalue = (data) => {
    return {
        type: 'SEARCH',
        payload: data
    };
};


export const editProd = (data) => {
    return {
        type: 'EDITPRODUCT',
        payload: data
    };
};