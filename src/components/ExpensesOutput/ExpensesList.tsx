import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import ExpenseItem from './ExpenseItem';
import { Expenses } from '../../store/expense-context';

interface ExpensesListProps {
  expenses: Expenses[];
}

function ExpensesList({ expenses }: ExpensesListProps) {
  const renderExpenseItem = useCallback(
    (itemData: ListRenderItemInfo<(typeof expenses)[number]>) => {
      return <ExpenseItem {...itemData.item} />;
    },
    [],
  );

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
