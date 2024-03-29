import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET_ITEMS,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingItems: {}, paymentMethod: "" },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      const prod = action.payload;

      const product = state.cartItems.find((x) => x.product === prod);

      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product !== prod),
        };
      } else {
        return { ...state };
      }

    case CART_SAVE_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT:
      return { ...state, paymentMethod: action.payload };

    case CART_RESET_ITEMS:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};
