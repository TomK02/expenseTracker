/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllExpenses from './src/screens/AllExpenses';
import ManageExpense from './src/screens/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses';
import { GlobalTheme } from './src/themes/constants';
import Icons from './src/components/FontAwesomeIcons';
import IconButton from './src/components/UI/IconButton';
import ExpensesContextProvider from './src/store/expense-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalTheme.colors.primary500 },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: GlobalTheme.colors.primary500 },
        tabBarActiveTintColor: GlobalTheme.colors.accent500,
        headerRight: ({ tintColor }) =>
          IconButton({
            icon: 'plus',
            size: 24,
            color: tintColor,
            onPress: () => {
              navigation.navigate('ManageExpense');
            },
          }),
      })}>
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) =>
            Icons({ name: 'hourglass', color: color, size: size }),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) =>
            Icons({ name: 'calendar', color: color, size: size }),
        }}
      />
    </BottomTab.Navigator>
  );
};

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalTheme.colors.primary500,
              },
              headerTintColor: '#fff',
            }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

export default App;
