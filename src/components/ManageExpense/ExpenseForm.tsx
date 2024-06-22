import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { ExpensePayload, Expenses } from '../../store/expense-context';
import { getFormattedDate } from '../../util/date';
import { GlobalTheme } from '../../themes/constants';

interface ExpenseFormProps {
  submitButtonLabel: string;
  defaultValues?: Expenses;
  onCancel: () => void;
  onSubmit: (data: ExpensePayload) => void;
}

function ExpenseForm({
  submitButtonLabel,
  defaultValues,
  onCancel,
  onSubmit,
}: ExpenseFormProps) {
  const [inputs, setInputs] = useState({
    amount: {
      values: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      values: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      values: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  const inputChangeHandler = (
    inputIdentifier: 'amount' | 'date' | 'description',
    enteredAmount: string,
  ) => {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: { values: enteredAmount, isValid: true },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: parseFloat(inputs.amount.values),
      date: new Date(inputs.date.values),
      description: inputs.description.values,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curInputs) => ({
        amount: { values: curInputs.amount.values, isValid: amountIsValid },
        date: { values: curInputs.date.values, isValid: dateIsValid },
        description: {
          values: curInputs.description.values,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(null, 'amount'),
            value: inputs.amount.values,
          }}
        />

        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (text) => inputChangeHandler('date', text),
            value: inputs.date.values,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(null, 'description'),
          value: inputs.description.values,
          // autoCorrect: false,
          // autoCapitalize: 'none',
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your data!
        </Text>
      )}

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: { marginTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: { flex: 1 },
  errorText: {
    textAlign: 'center',
    color: GlobalTheme.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
