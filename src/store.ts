import { combineReducers, createStore } from 'redux';

type ActionCreator<A> = {
  [key in keyof A]: <T>(id: T) => {
    type: key;
    id: T;
  };
};

// Reducer
const counterReducerMap:any = {
  idDeletePerson: (state:any, action:any) => [...state, action.id],
};

const counterReducer = (state = [], action:any) => {
  const handler = counterReducerMap[action.type];
  return handler ? handler(state, action) : state;
};

// Action creator
const createAction = <T>(reducers:any): T => {
  return Object.keys(reducers).reduce((acc:any, type) => {
    acc[type] = (id:any) => ({
      type,
      id,
    });
    return acc;
  }, {} as T);
};

type Action = ActionCreator<typeof counterReducerMap>;
export const { idDeletePerson } = createAction<Action>(counterReducerMap);

// Store content
const reducers = () =>
  combineReducers({
    counter: counterReducer,
  });

const store = createStore(reducers());

export default store;
