import React, {useState, forwardRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

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
        <Text style={styles.itemTitle}>Del</Text>
      </TouchableOpacity>
      <TouchableHighlight
        underlayColor={'#f37262'}
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
      <Text style={styles.title}>MARKET CART DEVSAMURAI</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={marketItem}
          onChangeText={text => {
            setMarketItem(text);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addItem(marketItem);
            setMarketItem('');
          }}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>
      <SwipeListView
        data={marketList}
        renderItem={({item}) => (
          <Item item={item} onCheckItem={checkItem} onRemoveItem={removeItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f37272',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 28,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    padding: 5,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    width: '20%',
    borderRadius: 3,
    marginLeft: 2,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    borderRadius: 3,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 30,
  },
  itemChecked: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: 'red',
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
