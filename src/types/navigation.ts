import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type ApplicationStackParamList = {
  ManageExpense: {
    expenseId: string;
  };
};

export type NavigationTypeProp<T extends keyof ApplicationStackParamList> =
  NativeStackNavigationProp<ApplicationStackParamList, T>;

export type RouteTypeProp<T extends keyof ApplicationStackParamList> =
  RouteProp<ApplicationStackParamList, T>;
