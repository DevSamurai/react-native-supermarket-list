import {useReducer} from 'react';

const INITIAL_STATE = [];

const marketListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: '123',
          title: action.title,
          check: false,
        },
      ];
    case 'CHECK':
      return state.map(item => {
        if (item.id === action.id) {
          return {...item, check: !item.check};
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};

const useMarketList = () => {
  const [state, dispatch] = useReducer(marketListReducer, INITIAL_STATE);

  const addItem = title => {
    dispatch({
      type: 'ADD',
      title: title,
    });
  };

  const checkItem = id => {
    dispatch({
      type: 'CHECK',
      id: id,
    });
  };

  return [state, addItem, checkItem];
};

export default useMarketList;
