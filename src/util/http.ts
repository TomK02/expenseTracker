import axios from 'axios';
import { ExpensePayload } from '../store/expense-context';

const BACKEND_URL =
  'https://react-native-course-cbf30-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function storeExpense(expenseData: ExpensePayload) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData,
  );
  const id = response.data.name;

  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id: string, expenseData: ExpensePayload) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
