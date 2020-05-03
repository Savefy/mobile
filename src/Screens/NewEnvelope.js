import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Appbar, TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, useField } from 'react-final-form-hooks';
import { TextInputMask } from 'react-native-masked-text';
import moment from 'moment-timezone';

import { colors } from '../values/colors';

const { Header, Content, BackAction } = Appbar;

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.textOnPrimary,
    textAlign: 'center',
    marginLeft: -60,
  },
  content: {
    padding: 16,
  },
  formInput: {
    paddingBottom: 16,
  },
  valueInput: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  valueText: {
    fontSize: 28,
    color: colors.background,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  valueGoal: {
    fontSize: 30,
    fontWeight: 'normal',
    fontFamily: 'Montserrat-Black',
    color: colors.background,
    textAlign: 'center',
  },
  saveButton: {
    color: colors.background,
    fontSize: 16,
  },
  buttonContent: { padding: 10 },
});

const validate = (values) => {
  const errors = {};
  return errors;
};

const HeaderBackButton = ({ navigation }) => {
  const handleBackAction = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return <BackAction color={colors.textOnPrimary} onPress={handleBackAction} />;
};

const NewEnvelope = ({ route, navigation }) => {
  const [isEditing, setIsEditing] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSubmit = useCallback(
    async (values) => {
      const valuesToSubmit = {
        ...values,
        valueGoal: Number(values.valueGoal.replace(/R\$ |\.|,/gm, '')),
      };
      try {
        if (isEditing) {
          // const response = axios.
        }
        const response = axios.post('/users/1/goals', valuesToSubmit);
        console.log(response.data);
        route.params?.onSuccess();
        navigation.goBack();
      } catch (ex) {
        console.warn(ex);
      }
    },
    [isEditing, navigation, route],
  );

  const { form, handleSubmit, pristine, submitting } = useForm({
    onSubmit,
    validate,
  });

  const title = useField('title', form);
  const description = useField('description', form);
  const valueGoal = useField('valueGoal', form);
  const accomplishAt = useField('accomplishAt', form);

  const envelope = route.params?.envelope;

  const setDatePickerVisible = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const onChangeDate = (event, date) => {
    setShowDatePicker(false);
    const { onChange } = accomplishAt.input;
    onChange(date);
  };

  useEffect(() => {
    setIsEditing(Boolean(envelope?.id));
    if (envelope) {
      form.initialize(envelope);
    }
  }, [setIsEditing, envelope, form]);

  return (
    <>
      <Header style={styles.header}>
        <HeaderBackButton navigation={navigation} />
        <Content
          titleStyle={styles.headerTitle}
          title={isEditing ? 'Editar envelope' : 'Novo envelope'}
        />
      </Header>
      <ScrollView style={styles.content}>
        <View style={styles.valueInput}>
          <Text style={styles.valueText}>Valor</Text>
          <TextInputMask
            type="money"
            placeholder="R$ 0,00"
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: '',
            }}
            placeholderTextColor={colors.backgroundOpacity}
            style={styles.valueGoal}
            onChangeText={valueGoal.input.onChange}
            {...valueGoal.input}
          />
        </View>
        <View style={styles.formInput}>
          <TextInput
            {...title.input}
            label="Título"
            mode="outlined"
            placeholder="De um título para este envelope"
            onChangeText={title.input.onChange}
          />
        </View>
        <View style={styles.formInput}>
          <TextInput
            {...description.input}
            label="Descrição"
            mode="outlined"
            placeholder="De uma descrição para este envelope"
            onChangeText={description.input.onChange}
          />
        </View>
        <TouchableOpacity onPress={setDatePickerVisible}>
          <View style={styles.formInput}>
            <TextInput
              label="Data"
              mode="outlined"
              value={
                accomplishAt.input.value
                  ? moment(accomplishAt.input.value).format('DD/MM/YYYY')
                  : null
              }
              onChangeText={description.input.onChange}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        <Button
          mode="contained"
          loading={submitting}
          disabled={pristine || submitting}
          onPress={handleSubmit}
          color={colors.primaryDark}
          contentStyle={styles.buttonContent}
          labelStyle={styles.saveButton}>
          Salvar
        </Button>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            is24Hour={true}
            display="calendar"
            value={accomplishAt.input.value || new Date()}
            onChange={onChangeDate}
          />
        )}
      </ScrollView>
    </>
  );
};

export default NewEnvelope;
