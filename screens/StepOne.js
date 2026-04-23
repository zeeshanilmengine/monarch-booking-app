import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

const bookingSchema = Yup.object().shape({
  bookingType: Yup.string().required('Required'),
  pickupAddress: Yup.string().required('Required'),
  dropoffAddress: Yup.string().required('Required'),
  pickupDateTime: Yup.date().required('Required'),
  dropoffDateTime: Yup.date().required('Required'),
  passengers: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  smallSuitcases: Yup.string().required('Required'),
  largeSuitcases: Yup.string().required('Required'),
});

const vehicleOptions = [
  { label: "4-Seater Executive Car", value: "4-Seater Executive Car" },
  { label: "4-Seater Standard Car", value: "4-Seater Standard Car" },
  { label: "5-Seater Executive MPV", value: "5-Seater Executive MPV" },
  { label: "5-Seater Executive Minivan", value: "5-Seater Executive Minivan" },
  { label: "5-Seater MPV (Standard)", value: "5-Seater MPV (Standard)" },
  { label: "7-8 Seater Executive Minibus", value: "7-8 Seater Executive Minibus" },
  { label: "7-8 Seater Standard Minivan", value: "7-8 Seater Standard Minivan" },
  { label: "8-Seater Standard Minivan", value: "8-Seater Standard Minivan" },
  { label: "9-10 Seater Minibus", value: "9-10 Seater Minibus" },
  { label: "12-14 Seater Executive Minibus", value: "12-14 Seater Executive Minibus" },
  { label: "12-14 Seater Standard Minibus", value: "12-14 Seater Standard Minibus" },
  { label: "16-Seater Executive Minibus", value: "16-Seater Executive Minibus" },
  { label: "16-Seater Standard Minibus", value: "16-Seater Standard Minibus" },
  { label: "17-22 Seater Minibus", value: "17-22 Seater Minibus" },
  { label: "24-28 Seater Mini Coach", value: "24-28 Seater Mini Coach" },
  { label: "29-33 Seater Mini Coach", value: "29-33 Seater Mini Coach" },
  { label: "33-37 Seater Coach", value: "33-37 Seater Coach" },
  { label: "37-41 Seater Executive Minicoach", value: "37-41 Seater Executive Minicoach" },
  { label: "41-49 Seater Coach", value: "41-49 Seater Coach" },
  { label: "49-53 Seater Coach", value: "49-53 Seater Coach" },
  { label: "51-70 Seater Coach", value: "51-70 Seater Coach" },
  { label: "60-80 Seater Double-Decker Bus", value: "60-80 Seater Double-Decker Bus" },
  { label: "70-Seater Executive Coach", value: "70-Seater Executive Coach" },
];

const StepOne = ({ navigation }) => {
  const [pickerType, setPickerType] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showPicker = (type) => {
    setPickerType(type);
    setDatePickerVisibility(true);
  };

  const hidePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <Formik
      initialValues={{
        bookingType: '',
        pickupAddress: '',
        dropoffAddress: '',
        pickupDateTime: null,
        dropoffDateTime: null,
        passengers: '',
        vehicleType: '',
        smallSuitcases: '',
        largeSuitcases: '',
      }}
      validationSchema={bookingSchema}
      onSubmit={(values) => {
        navigation.navigate('StepTwo', { bookingData: values });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.logo}
          />

          <Text variant="titleLarge" style={styles.title}>Type of Booking*</Text>
          <RadioButton.Group
            onValueChange={value => setFieldValue('bookingType', value)}
            value={values.bookingType}
          >
            <RadioButton.Item label="One Way" value="One Way" />
            <RadioButton.Item label="Return" value="Return" />
            <RadioButton.Item label="Multi Stop" value="Multi Stop" />
          </RadioButton.Group>
          {touched.bookingType && errors.bookingType && <Text style={styles.error}>{errors.bookingType}</Text>}

          <TextInput
            label="Pickup Address*"
            value={values.pickupAddress}
            onChangeText={handleChange('pickupAddress')}
            onBlur={handleBlur('pickupAddress')}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Dropoff Address*"
            value={values.dropoffAddress}
            onChangeText={handleChange('dropoffAddress')}
            onBlur={handleBlur('dropoffAddress')}
            style={styles.input}
            mode="outlined"
          />

          <Button
            onPress={() => showPicker('pickup')}
            mode="outlined"
            style={styles.dateButton}
          >
            {values.pickupDateTime
              ? new Date(values.pickupDateTime).toLocaleString()
              : 'Select Pickup Date & Time'}
          </Button>
          {touched.pickupDateTime && errors.pickupDateTime && (
            <Text style={styles.error}>{errors.pickupDateTime}</Text>
          )}

          <Button
            onPress={() => showPicker('dropoff')}
            mode="outlined"
            style={styles.dateButton}
          >
            {values.dropoffDateTime
              ? new Date(values.dropoffDateTime).toLocaleString()
              : 'Select Dropoff Date & Time'}
          </Button>
          {touched.dropoffDateTime && errors.dropoffDateTime && (
            <Text style={styles.error}>{errors.dropoffDateTime}</Text>
          )}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={(date) => {
              hidePicker();
              if (pickerType === 'pickup') {
                setFieldValue('pickupDateTime', date);
              } else if (pickerType === 'dropoff') {
                setFieldValue('dropoffDateTime', date);
              }
            }}
            onCancel={hidePicker}
            minimumDate={new Date()}
          />

          <TextInput
            label="No. of Passengers*"
            value={values.passengers}
            onChangeText={handleChange('passengers')}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />

          <Text style={styles.label}>Vehicle Type*</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={values.vehicleType}
              onValueChange={(itemValue) => setFieldValue('vehicleType', itemValue)}
            >
              <Picker.Item label="Select vehicle type..." value="" />
              {vehicleOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
          {touched.vehicleType && errors.vehicleType && (
            <Text style={styles.error}>{errors.vehicleType}</Text>
          )}

          <TextInput
            label="No. of Small Suitcases*"
            value={values.smallSuitcases}
            onChangeText={handleChange('smallSuitcases')}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />
          <TextInput
            label="No. of Large Suitcases*"
            value={values.largeSuitcases}
            onChangeText={handleChange('largeSuitcases')}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            buttonColor="#1976D2"
          >
            Next
          </Button>
        </ScrollView>
      )}
    </Formik>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  logo: {
    width: 260,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#e3f2fd',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    color: '#1976D2',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 5,
    color: '#1976D2',
  },
  dateButton: {
    marginBottom: 15,
    borderColor: '#1976D2',
  },
  button: {
    marginTop: 20,
    marginBottom: 25,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 15,
    backgroundColor: '#e3f2fd',
  },
});
