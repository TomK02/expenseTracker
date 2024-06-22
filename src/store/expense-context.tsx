import React, { createContext, useReducer } from 'react';

// const DUMMY_EXPENSES: Expenses[] = [
//   {
//     id: 'e1',
//     title: 'A pair of shoes',
//     amount: 59.99,
//     date: new Date('2021-12-19'),
//     description: 'A very nice pair of shoes',
//   },
//   {
//     id: 'e2',
//     title: 'A pair of trousers',
//     amount: 89.29,
//     date: new Date('2022-01-05'),
//     description: 'A very nice pair of trousers',
//   },
//   {
//     id: 'e3',
//     title: 'Some bananas',
//     amount: 5.99,
//     date: new Date('2021-12-01'),
//     description: 'A bunch of bananas',
//   },
//   {
//     id: 'e4',
//     title: 'A book',
//     amount: 14.99,
//     date: new Date('2022-02-19'),
//     description: 'A very nice book',
//   },
//   {
//     id: 'e5',
//     title: 'Another book',
//     amount: 18.59,
//     date: new Date('2022-02-18'),
//     description: 'Another very nice book',
//   },
// ];

interface ExpensesContextType {
  expenses: Expenses[];
  addExpense: (expenseData: Expenses) => void;
  setExpenses: (expenses: Expenses[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: ID, expenseData: ExpensePayload) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type ID = string;

export type ExpensePayload = {
  description: string;
  amount: number;
  date: Date;
};

export type Expenses = {
  id: string;
  title?: string;
  amount: number;
  date: Date;
  description: string;
};

interface ExpenseAction {
  type: 'ADD' | 'SET' | 'DELETE' | 'UPDATE';
  payload:
    | { id: ID }
    | { id: ID; data: ExpensePayload }
    | { addData: Expenses }
    | Expenses[];
}

const expenseReducer: React.Reducer<Expenses[], ExpenseAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'ADD': {
      if (!('addData' in action.payload)) {
        throw new Error('ADD action must have a data property in the payload.');
      }

      return [action.payload.addData, ...state];
    }

    case 'SET': {
      if (!Array.isArray(action.payload)) {
        throw new Error('SET action must have a data property in the payload.');
      }
      const invertedArray = action.payload.reverse();
      return invertedArray;
    }

    case 'UPDATE': {
      if (!('data' in action.payload && 'id' in action.payload)) {
        throw new Error(
          'UPDATE action must have a data and id property in the payload.',
        );
      }

      const id = action.payload.id;

      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };

      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;

      return updatedExpenses;
    }
    case 'DELETE': {
      if (!('id' in action.payload)) {
        throw new Error(
          'UPDATE action must have a data and id property in the payload.',
        );
      }

      const id = action.payload.id;

      return state.filter((expense) => expense.id !== id);
    }
    default:
      return state;
  }
};

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expenseData: Expenses) => {
    dispatch({ type: 'ADD', payload: { addData: expenseData } });
  };

  const setExpenses = (expenses: Expenses[]) => {
    dispatch({ type: 'SET', payload: expenses });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const updateExpense = (id: ID, expenseData: ExpensePayload) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  };

  const value = {
    expenses: expenseState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
