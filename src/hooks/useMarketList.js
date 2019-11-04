import {useReducer} from 'react';
import {Alert} from 'react-native';

import {sha256} from 'react-native-sha256';

const INITIAL_STATE = [];

const marketListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item];
    case 'CHECK':
      return state.map(item => {
        if (item.id === action.id) {
          return {...item, check: !item.check};
        } else {
          return item;
        }
      });
    case 'REMOVE':
      return state.filter(item => {
        return item.id !== action.id;
      });
    default:
      return state;
  }
};

const useMarketList = () => {
  const [state, dispatch] = useReducer(marketListReducer, INITIAL_STATE);

  const addItem = async title => {
    if (title === '') {
      return Alert.alert('Produto não informado');
    }

    const itemFound = state.filter(
      item => item.title.toUpperCase() === title.toUpperCase(),
    );
    if (itemFound.length > 0) {
      return Alert.alert(`O produto ${title} já existe na lista`);
    }

    const hashId = await sha256(title);
    dispatch({
      type: 'ADD',
      item: {
        id: hashId,
        title: title,
        check: false,
      },
    });
  };

  const checkItem = id => {
    dispatch({
      type: 'CHECK',
      id: id,
    });
  };

  const removeItem = id => {
    dispatch({
      type: 'REMOVE',
      id: id,
    });
  };

  return [state, addItem, checkItem, removeItem];
};

export default useMarketList;
