import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalTheme } from '../../themes/constants';
import { Expenses } from '../../store/expense-context';

interface ExpensesOutputProps {
  expenses: Expenses[];
  expensesPeriod: string;
  fallbackText: string;
}

function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}: ExpensesOutputProps) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = (
      <>
        <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
        <ExpensesList expenses={expenses} />
      </>
    );
  }
  return <View style={styles.container}>{content}</View>;
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalTheme.colors.primary700,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
