import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SplashScreen } from "@screens/SplashScreen";
import { LoginScreen } from "@screens/LoginScreen";
import { RegisterScreen } from "@screens/RegisterScreen";
import { HomeScreen } from "@screens/HomeScreen";
import { ProductDetailsScreen } from "@screens/ProductDetailsScreen";
import { CartScreen } from "@screens/CartScreen";
import { CheckoutScreen } from "@screens/CheckoutScreen";
import { PaymentScreen } from "@screens/PaymentScreen";
import { OrderTrackingScreen } from "@screens/OrderTrackingScreen";
import { OrdersScreen } from "@screens/OrdersScreen";
import { ProfileScreen } from "@screens/ProfileScreen";
import { NotificationsScreen } from "@screens/NotificationsScreen";

import { COLORS } from "@config/constants";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.light },
    }}
  >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.light },
    }}
  >
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{ cardStyle: { backgroundColor: COLORS.light } }}
    />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.light },
    }}
  >
    <Stack.Screen name="CartMain" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
  </Stack.Navigator>
);

const OrdersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.light },
    }}
  >
    <Stack.Screen name="OrdersMain" component={OrdersScreen} />
    <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: "#999",
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 8,
        paddingTop: 4,
      },
      tabBarLabel: () => null,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 24, color }}>🏠</Text>
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 24, color }}>🛒</Text>
        ),
      }}
    />
    <Tab.Screen
      name="Orders"
      component={OrdersStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 24, color }}>📋</Text>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 24, color }}>👤</Text>
        ),
      }}
    />
  </Tab.Navigator>
);

export const RootNavigator = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="App"
            component={AppStack}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              cardStyle: { backgroundColor: COLORS.light },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
