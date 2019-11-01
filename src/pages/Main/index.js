import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';

import useMarketList from '../../hooks/useMarketList';

function Item({item, onPressItem}) {
  const isChecked = item.check;
  return (
    <TouchableHighlight
      underlayColor={'#f37262'}
      style={styles.item}
      onPress={() => onPressItem(item.id)}>
      <Text style={[styles.itemTitle, isChecked ? styles.itemChecked : '']}>
        {item.title}
      </Text>
    </TouchableHighlight>
  );
}

const Main = () => {
  const [marketItem, setMarketItem] = useState('');
  const [marketList, addItem, checkItem] = useMarketList();

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
        renderItem={({item}) => <Item item={item} onPressItem={checkItem} />}
        renderHiddenItem={data => (
          <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
            <Text style={styles.itemTitle}>Del</Text>
          </TouchableOpacity>
        )}
        rightOpenValue={-75}
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
