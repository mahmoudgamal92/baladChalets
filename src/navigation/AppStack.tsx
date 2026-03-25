import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from "../screens/Splash";
import VersionUpgrade from "../screens/VersionUpgrade";
import Home from "../screens/Index";



import {
  MonthSelection,
  Offers,
  NewPerOrder,
  NewConfirmOrder,
  NewList,
  List,
  ConfirmOrder,
  PreOrder
} from "@screens";

export type AppStackParamList = {
  Splash: undefined;
  TabNavigator: undefined;
  VersionUpgrade: undefined;
  ChaletsAndFarmsResult: undefined;
  ChaletsAndFarmsPreOrder: undefined;
  ChaletsAndFarmsConfirm: undefined;
  ChaletsAndFarmsNewList: undefined;
  MonthSelection: undefined;
  Offers: undefined;
  NewPreOrder: undefined;
  NewChaletsAndFarmsConfirm: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="TabNavigator" component={Home} />
      <Stack.Screen name="VersionUpgrade" component={VersionUpgrade} />

      {/* Old Flow */}
      <Stack.Screen name="ChaletsAndFarmsResult" component={List} />
      <Stack.Screen name="ChaletsAndFarmsPreOrder" component={PreOrder} />
      <Stack.Screen name="ChaletsAndFarmsConfirm" component={ConfirmOrder} />

      {/* New Flow */}
      <Stack.Screen name="ChaletsAndFarmsNewList" component={NewList} />
      <Stack.Screen name="MonthSelection" component={MonthSelection} />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="NewPreOrder" component={NewPerOrder} />
      <Stack.Screen name="NewChaletsAndFarmsConfirm" component={NewConfirmOrder} />
    </Stack.Navigator>
  );
};
