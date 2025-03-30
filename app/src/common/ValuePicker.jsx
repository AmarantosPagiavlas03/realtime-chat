import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ValuePicker = ({ list, selectedValue, onValueChange, placeholder, icon }) => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon 
        icon={icon} 
        size={16} 
        color="#666" 
        style={styles.icon} 
      />
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor="#666"
      >
        <Picker.Item 
          label={placeholder} 
          value="" 
          color="#999"
        />
        {list.map(item => (
          <Picker.Item
            key={item}
            label={item}
            value={item}
            color="#333"
          />
        ))}
      </Picker>
    </View>
  );
};

ValuePicker.propTypes = {
  list: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 12,
  },
  picker: {
    flex: 1,
    height: 52,
    color: '#333',
  },
});

export default ValuePicker;