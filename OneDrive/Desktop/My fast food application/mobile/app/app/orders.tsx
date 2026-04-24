import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ChatTarget,
  ORDER_STEPS,
  Order,
  useFoodStore,
} from "../store/useFoodStore";

const CHAT_TARGETS: ChatTarget[] = ["Staff", "Chef", "Rider"];

export default function OrdersScreen() {
  const orders = useFoodStore((state) => state.orders);
  const advanceOrderStatus = useFoodStore((state) => state.advanceOrderStatus);
  const clearDeliveredOrders = useFoodStore((state) => state.clearDeliveredOrders);
  const chatMessagesByOrder = useFoodStore((state) => state.chatMessagesByOrder);
  const sendChatMessage = useFoodStore((state) => state.sendChatMessage);
  const [activeTarget, setActiveTarget] = useState<ChatTarget>("Staff");
  const [draftMessage, setDraftMessage] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedOrderMessages = useMemo(
    () => (selectedOrderId ? chatMessagesByOrder[selectedOrderId] ?? [] : []),
    [chatMessagesByOrder, selectedOrderId]
  );

  useEffect(() => {
    if (orders.length === 0) {
      setSelectedOrderId(null);
      return;
    }

    const stillExists = selectedOrderId
      ? orders.some((order) => order.id === selectedOrderId)
      : false;

    if (!stillExists) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders, selectedOrderId]);

  const renderStepDots = (order: Order) => {
    const activeIndex = ORDER_STEPS.indexOf(order.status);
    return (
      <View style={styles.stepWrap}>
        {ORDER_STEPS.map((step, index) => (
          <View key={step} style={styles.stepItem}>
            <View
              style={[
                styles.stepDot,
                index <= activeIndex ? styles.stepDotActive : undefined,
              ]}
            />
            <Text style={styles.stepLabel}>{step}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>My Orders</Text>
        <Link href="/messages" style={styles.messagesLink}>
          Messages
        </Link>
      </View>

      {orders.length === 0 ? (
        <Text style={styles.body}>No orders yet. Checkout from cart to create one.</Text>
      ) : (
        <>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.topLine}>
                  <Text style={styles.orderId}>{item.id}</Text>
                  <Text style={styles.orderTime}>{item.createdAt}</Text>
                </View>
                <Text style={styles.status}>Status: {item.status}</Text>
                <Text style={styles.total}>Total: KES {item.total}</Text>
                <Text style={styles.itemCount}>{item.items.length} items</Text>
                <Text style={styles.address}>To: {item.deliveryAddress}</Text>
                {item.specialInstructions ? (
                  <Text style={styles.instructions}>
                    Instructions: {item.specialInstructions}
                  </Text>
                ) : null}

                {renderStepDots(item)}

                <Pressable
                  style={styles.advanceButton}
                  onPress={() => advanceOrderStatus(item.id)}
                >
                  <Text style={styles.advanceText}>Advance Progress</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.chatOrderButton,
                    selectedOrderId === item.id ? styles.chatOrderButtonActive : undefined,
                  ]}
                  onPress={() => setSelectedOrderId(item.id)}
                >
                  <Text
                    style={[
                      styles.chatOrderText,
                      selectedOrderId === item.id ? styles.chatOrderTextActive : undefined,
                    ]}
                  >
                    {selectedOrderId === item.id ? "Chat Opened" : "Open Chat for this Order"}
                  </Text>
                </Pressable>
              </View>
            )}
          />
          <Pressable style={styles.clearButton} onPress={clearDeliveredOrders}>
            <Text style={styles.clearText}>Clear Delivered Orders</Text>
          </Pressable>
          <View style={styles.chatCard}>
            <Text style={styles.chatTitle}>Chat with team</Text>
            <View style={styles.targetRow}>
              {CHAT_TARGETS.map((target) => (
                <Pressable
                  key={target}
                  style={[
                    styles.targetChip,
                    activeTarget === target ? styles.targetChipActive : undefined,
                  ]}
                  onPress={() => setActiveTarget(target)}
                >
                  <Text
                    style={[
                      styles.targetChipText,
                      activeTarget === target
                        ? styles.targetChipTextActive
                        : undefined,
                    ]}
                  >
                    {target}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.messagesWrap}>
              {!selectedOrderId ? (
                <Text style={styles.chatEmpty}>
                  Select an order above to start chatting.
                </Text>
              ) : selectedOrderMessages.length === 0 ? (
                <Text style={styles.chatEmpty}>
                  No messages yet for this order. Start by contacting staff, chef, or rider.
                </Text>
              ) : (
                <FlatList
                  data={selectedOrderMessages}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.messageBubble,
                        item.sender === "Customer"
                          ? styles.messageCustomer
                          : styles.messageTeam,
                      ]}
                    >
                      <Text style={styles.messageSender}>
                        {item.sender} ({item.target})
                      </Text>
                      <Text style={styles.messageText}>{item.text}</Text>
                      <Text style={styles.messageTime}>{item.time}</Text>
                    </View>
                  )}
                />
              )}
            </View>

            <View style={styles.inputRow}>
              <TextInput
                value={draftMessage}
                onChangeText={setDraftMessage}
                placeholder={`Message ${activeTarget.toLowerCase()}...`}
                placeholderTextColor="#9CA3AF"
                style={styles.chatInput}
              />
              <Pressable
                style={[
                  styles.sendButton,
                  !selectedOrderId || !draftMessage.trim() ? styles.sendButtonDisabled : undefined,
                ]}
                onPress={() => {
                  if (!selectedOrderId) return;
                  sendChatMessage(selectedOrderId, activeTarget, draftMessage);
                  setDraftMessage("");
                }}
                disabled={!selectedOrderId || !draftMessage.trim()}
              >
                <Text style={styles.sendText}>Send</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  messagesLink: {
    color: "#0F766E",
    fontWeight: "700",
    fontSize: 14,
  },
  body: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginTop: 80,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    marginBottom: 10,
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  orderTime: {
    color: "#6B7280",
    fontSize: 12,
  },
  status: {
    marginTop: 8,
    color: "#111827",
    fontWeight: "600",
  },
  total: {
    marginTop: 4,
    color: "#DC2626",
    fontWeight: "700",
  },
  itemCount: {
    marginTop: 2,
    color: "#6B7280",
  },
  address: {
    marginTop: 4,
    color: "#374151",
    fontSize: 13,
  },
  instructions: {
    marginTop: 4,
    color: "#4B5563",
    fontSize: 13,
    fontStyle: "italic",
  },
  stepWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 10,
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D1D5DB",
    marginBottom: 4,
  },
  stepDotActive: {
    backgroundColor: "#16A34A",
  },
  stepLabel: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
  },
  advanceButton: {
    marginTop: 8,
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: "center",
  },
  advanceText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  chatOrderButton: {
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 9,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  chatOrderButtonActive: {
    backgroundColor: "#0F766E",
    borderColor: "#0F766E",
  },
  chatOrderText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 13,
  },
  chatOrderTextActive: {
    color: "#FFFFFF",
  },
  clearButton: {
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  clearText: {
    color: "#B91C1C",
    fontWeight: "700",
  },
  chatCard: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
  },
  chatTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  targetRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  targetChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
  },
  targetChipActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  targetChipText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 12,
  },
  targetChipTextActive: {
    color: "#FFFFFF",
  },
  messagesWrap: {
    maxHeight: 180,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#F9FAFB",
    marginBottom: 10,
  },
  chatEmpty: {
    color: "#6B7280",
    fontSize: 13,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
  },
  messageCustomer: {
    backgroundColor: "#DBEAFE",
  },
  messageTeam: {
    backgroundColor: "#E5E7EB",
  },
  messageSender: {
    fontSize: 11,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 2,
  },
  messageText: {
    color: "#111827",
    fontSize: 13,
  },
  messageTime: {
    marginTop: 3,
    fontSize: 10,
    color: "#6B7280",
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  sendButton: {
    backgroundColor: "#16A34A",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sendButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  sendText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
});
