import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useOrderStore } from "@store/orderStore";
import { OrderCard } from "@components/OrderCard";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { EmptyState } from "@components/EmptyState";
import { COLORS } from "@config/constants";

export const OrdersScreen = ({ navigation }: any) => {
  const orders = useOrderStore((state) => state.orders);
  const isLoading = useOrderStore((state) => state.isLoading);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading && orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          icon="📋"
          title="No Orders Yet"
          description="Start ordering delicious meals from FoodFast"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("OrderTracking", { orderId: item._id })
            }
          >
            <OrderCard order={item} onPress={() => {}} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        refreshing={isLoading}
        onRefresh={() => fetchOrders()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  listContent: {
    padding: 16,
  },
});
