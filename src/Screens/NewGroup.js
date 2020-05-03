import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Keyboard } from 'react-native';

import { Appbar, TextInput, Button } from 'react-native-paper';
import axios from 'axios';

import { colors } from '../values/colors';
import { useForm, useField } from 'react-final-form-hooks';

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

const NewGroup = ({ route, navigation }) => {
  const [isEditing, setIsEditing] = useState(false);

  const group = route.params?.group;

  const onSubmit = (values) => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const { form, handleSubmit, pristine, submitting } = useForm({
    onSubmit,
    validate,
  });

  const title = useField('title', form);
  const description = useField('description', form);

  useEffect(() => {
    setIsEditing(Boolean(route.params?.group?.id));
    if (group) {
      form.initialize(group);
    }
  }, [setIsEditing, group, form, route.params]);

  return (
    <>
      <Header style={styles.header}>
        <HeaderBackButton navigation={navigation} />
        <Content
          titleStyle={styles.headerTitle}
          title={isEditing ? 'Editar grupo' : 'Novo grupo'}
        />
      </Header>
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.formInput}>
          <TextInput
            {...title.input}
            label="Título"
            mode="outlined"
            placeholder="De um título para este grupo"
            onChangeText={title.input.onChange}
          />
        </View>
        <View style={styles.formInput}>
          <TextInput
            {...description.input}
            label="Descrição"
            mode="outlined"
            placeholder="De uma descrição para este grupo"
            onChangeText={description.input.onChange}
            multiline
            numberOfLines={6}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={submitting}
          disabled={pristine || submitting}
          color={colors.primaryDark}
          contentStyle={styles.buttonContent}
          labelStyle={styles.saveButton}>
          Salvar
        </Button>
      </ScrollView>
    </>
  );
};

export default NewGroup;
