import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const marketList = [
  {
    id: '123',
    title: 'Banana',
    check: false,
  },
  {
    id: '1234',
    title: 'Arroz',
    check: true,
  },
];

function Item({item}) {
  const isChecked = item.check;
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={[styles.itemTitle, isChecked ? styles.itemChecked : '']}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MARKET CART DEVSAMURAI</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={''} onChangeText={() => {}} />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={marketList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
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
});

export default Main;
