import React, { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationTypeProp, RouteTypeProp } from '../types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import IconButton from '../components/UI/IconButton';
import { GlobalTheme } from '../themes/constants';
import { ExpensePayload, ExpensesContext } from '../store/expense-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute<RouteTypeProp<'ManageExpense'>>();
  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId,
  );

  const navigation = useNavigation<NavigationTypeProp<'ManageExpense'>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);

    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      setError('Could not delete expense - please try again later.');
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: ExpensePayload) => {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ id, ...expenseData });
      }
    } catch (err) {
      console.error(err);
      setError('Could not save data - please try again later.');
      setIsSubmitting(false);
    }

    navigation.goBack();
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalTheme.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalTheme.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderWidth: 2,
    borderTopColor: GlobalTheme.colors.primary200,
    alignItems: 'center',
  },
});
