import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationTypeProp, RouteTypeProp } from '../types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import IconButton from '../components/UI/IconButton';
import { GlobalTheme } from '../themes/constants';
import { ExpensePayload, ExpensesContext } from '../store/expense-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpense() {
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

  const deleteExpenseHandler = () => {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData: ExpensePayload) => {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expenseCtx.addExpense(expenseData);
    }

    navigation.goBack();
  };

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
