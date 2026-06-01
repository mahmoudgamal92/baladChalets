import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from "../screens/Splash";
import VersionUpgrade from "../screens/VersionUpgrade";
import Home from "../screens/Home";



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
  ChaletsAndFarmsResult: { chalets: any; filters: any };
  ChaletsAndFarmsPreOrder: { item: any; filters: any };
  ChaletsAndFarmsConfirm: { order_info: any; chalet: any; filters: any };
  ChaletsAndFarmsNewList: { chalets: any };
  MonthSelection: { chalet: any };
  Offers: { chalet: any; offers: any };
  NewPreOrder: { chalet: any; offer: any; date: any };
  NewChaletsAndFarmsConfirm: { order_info: any; chalet: any; offer: any; date: any };
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
