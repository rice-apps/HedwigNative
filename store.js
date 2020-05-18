// store.js
import React, {createContext, useReducer} from 'react';
import _ from 'lodash';

const initialState = {
    userID: "5ebcc3b7a55cea938d503171",
    cart: []
};
const store = createContext(initialState);
const { Provider } = store;

// Actions
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

const reducer = (state, action) => {
    let newCart;
    switch(action.type) {
        case ADD_TO_CART:
            newCart = _.cloneDeep(state.cart);
            newCart.push(action.item)
            return {...state, cart: newCart}
        case REMOVE_FROM_CART:
            // Update the cart
            newCart = _.cloneDeep(state.cart);
            let itemIndex = newState.cart.findIndex(item);
            return {...state, cart: newCart.splice(itemIndex, 1)}
        case CLEAR_CART:
            return {...state, cart: []};
        default:
            return {...state};
    };
}

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }