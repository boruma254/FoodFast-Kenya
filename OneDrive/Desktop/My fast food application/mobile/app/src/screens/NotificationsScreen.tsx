import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Notification } from "@types/index";
import { getTimeAgo } from "@utils/helpers";
import { COLORS } from "@config/constants";

// Mock notifications - in real app, fetch from API
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    _id: "1",
    userId: "",
    title: "Order Confirmed",
    message: "Your order #12345 has been confirmed",
    type: "order",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    userId: "",
    title: "Preparing Your Food",
    message: "Chef is now preparing your order",
    type: "order",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const NotificationsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)),
    );
  };

  const getNotificationIcon = (type: string): string => {
    switch (type) {
      case "order":
        return "📦";
      case "payment":
        return "💳";
      case "promotion":
        return "🎉";
      default:
        return "ℹ️";
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
      onPress={() => handleMarkAsRead(item._id)}
    >
      <Text style={styles.icon}>{getNotificationIcon(item.type)}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.time}>{getTimeAgo(item.createdAt)}</Text>
      </View>
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyMessage}>You're all caught up!</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 4,
  },
  message: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  time: {
    fontSize: 11,
    color: "#999",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
});
