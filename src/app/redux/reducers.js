import { DELETE_ID} from "./actions";

const deleteIdReducer = (state = 0, action) => {
  switch (action.type) {
    case DELETE_ID:
      return state = action.them;

    default:
      return state;
  }
};

export {  deleteIdReducer };


