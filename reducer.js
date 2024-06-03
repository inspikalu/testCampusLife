
export let initialState = {
    loggedIn: false,
    signedUp: false
}

export const actionTypes = {
    setLoggedIn: 'SETLOGGEDIN',
    setSignedUp: 'SETSIGNEDUP',
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.setLoggedIn:
            return {
                ...state,
                ...action.setLoggedIn
            }
        case actionTypes.setSignedUp:
            console.log('action ', action.payload);
            return {
                ...state,
                signedUp: action.payload
            }
        default:
            return state;
    }
};

export default reducer;