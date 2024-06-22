import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalTheme } from '../../themes/constants';
import { Expenses } from '../../store/expense-context';

interface ExpensesSummaryProps {
  expenses: Expenses[];
  expensesPeriod: string;
}

function ExpensesSummary({ expenses, expensesPeriod }: ExpensesSummaryProps) {
  const expensesSum = expenses.reduce(
    (sum: number, expense: any) => sum + expense.amount,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensesPeriod}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalTheme.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalTheme.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalTheme.colors.primary500,
  },
});
