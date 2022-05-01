import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, TOGGLE_ITEM, ITEMS_LOADING } from "../actions/types"

const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            console.log(action.payload)
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case DELETE_ITEM:
            return {
                items: state.items.filter(
                    item => item._id !== action.payload
                )
            }
        case ADD_ITEM:

            console.log(action.payload)

            return {
                items: [...state.items, action.payload]
            }

        case TOGGLE_ITEM:

            return {
                items: state.items.map(item => {
                    if(item._id === action.payload) {
                        if (item.isOpen) {
                            item.isOpen = false
                        }
                        else if (!item.isOpen) {
                            item.isOpen = true
                        }
                    }
                    else{
                        item.isOpen = false
                    }
                    return item;
                })
            }

        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}