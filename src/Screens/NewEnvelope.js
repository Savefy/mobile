import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNInput,
  Text,
  ScrollView,
} from 'react-native';

import { Appbar, TextInput, Button } from 'react-native-paper';
const { Header, Content, BackAction } = Appbar;

import { colors } from '../values/colors';
import { useForm, useField } from 'react-final-form-hooks';

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
    fontSize: 40,
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

  const onSubmit = (values) => {
    console.log(values);
  };

  const { form, handleSubmit, pristine, submitting } = useForm({
    onSubmit,
    validate,
  });

  const title = useField('title', form);
  const description = useField('description', form);
  const valueGoal = useField('valueGoal', form);
  const accomplishAt = useField('accomplishAt', form);

  const envelope = route.params?.envelope;

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
          <RNInput
            {...valueGoal.input}
            label="Valor"
            mode="outlined"
            placeholder="0,00"
            keyboardType="number-pad"
            placeholderTextColor={colors.backgroundOpacity}
            style={styles.valueGoal}
            onChangeText={valueGoal.input.onChange}
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
        <View style={styles.formInput}>
          <TextInput
            {...accomplishAt.input}
            label="Data"
            mode="outlined"
            onChangeText={accomplishAt.input.onChange}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit}
          color={colors.primaryDark}
          contentStyle={styles.buttonContent}
          labelStyle={styles.saveButton}>
          Salvar
        </Button>
      </ScrollView>
    </>
  );
};

export default NewEnvelope;
