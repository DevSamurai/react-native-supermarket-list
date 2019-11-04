import React, {useState, forwardRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

import logo from '../../assets/logo.png';

import useMarketList from '../../hooks/useMarketList';

const Item = forwardRef(({item, onCheckItem, onRemoveItem}, ref) => {
  const isChecked = item.check;
  return (
    <SwipeRow rightOpenValue={-75} ref={ref}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          onRemoveItem(item.id);
        }}>
        <Icon name="delete" size={30} color={'#fff'} />
      </TouchableOpacity>
      <TouchableHighlight
        underlayColor={'#bdc3c7'}
        style={styles.item}
        onPress={() => onCheckItem(item.id)}>
        <Text style={[styles.itemTitle, isChecked ? styles.itemChecked : '']}>
          {item.title}
        </Text>
      </TouchableHighlight>
    </SwipeRow>
  );
});

const Main = () => {
  const [marketItem, setMarketItem] = useState('');
  const [marketList, addItem, checkItem, removeItem] = useMarketList();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={marketItem}
          placeholder={'Adicionar Produto'}
          onChangeText={text => {
            setMarketItem(text);
          }}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addItem(marketItem);
            setMarketItem('');
          }}>
          <Text style={styles.textAddButton}>+</Text>
        </TouchableOpacity>
      </View>
      <SwipeListView
        data={marketList}
        renderItem={({item}) => (
          <Item item={item} onCheckItem={checkItem} onRemoveItem={removeItem} />
        )}
      />

      <Image source={logo} style={{alignSelf: 'center'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    width: '80%',
    fontSize: 30,
    color: '#000',
    fontFamily: 'Roboto',
  },
  addButton: {
    flex: 1,
    width: '20%',
    marginLeft: 2,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Roboto',
  },
  textAddButton: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: 60,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  itemChecked: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    color: '#bdc3c7',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 3,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 75,
  },
});

export default Main;
