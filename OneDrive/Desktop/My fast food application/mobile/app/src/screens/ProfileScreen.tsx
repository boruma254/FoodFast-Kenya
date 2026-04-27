import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useAuthStore } from "@store/authStore";
import { Button } from "@components/Button";
import { InputField } from "@components/InputField";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { COLORS } from "@config/constants";

export const ProfileScreen = ({ navigation }: any) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const logout = useAuthStore((state) => state.logout);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const getProfile = useAuthStore((state) => state.getProfile);

  const [fullName, setFullName] = React.useState(user?.fullName || "");
  const [address, setAddress] = React.useState(user?.address || "");

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setAddress(user.address || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(fullName, address);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  if (isLoading && !user) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            {user?.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>👤</Text>
            )}
          </View>
          <Text style={styles.profileName}>{user?.fullName || "Guest"}</Text>
          <Text style={styles.profileEmail}>Member since 2026</Text>
        </View>

        {/* Account Details */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemIcon}>👤</Text>
            <Text style={styles.menuItemLabel}>Account Details</Text>
          </View>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        {/* Saved Addresses */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemIcon}>📍</Text>
            <Text style={styles.menuItemLabel}>Saved Addresses</Text>
          </View>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        {/* Payment Methods */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemIcon}>💳</Text>
            <Text style={styles.menuItemLabel}>Payment Methods</Text>
          </View>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        {/* Order History */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemIcon}>📋</Text>
            <Text style={styles.menuItemLabel}>Order History</Text>
          </View>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        {/* Logout */}
        <Button
          title="Sign Out"
          variant="danger"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  content: {
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarText: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 12,
    color: "#999",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuItemLabel: {
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: "500",
  },
  menuItemArrow: {
    fontSize: 20,
    color: "#999",
  },
  saveButton: {
    marginTop: 16,
  },
  logoutButton: {
    marginTop: 32,
    marginBottom: 40,
  },
});
