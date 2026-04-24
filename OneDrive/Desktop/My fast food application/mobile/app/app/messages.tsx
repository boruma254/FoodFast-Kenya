import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ChatTarget, useFoodStore } from "../store/useFoodStore";

const CHAT_TARGETS: ChatTarget[] = ["Staff", "Chef", "Rider"];

export default function MessagesScreen() {
  const orders = useFoodStore((state) => state.orders);
  const chatMessagesByOrder = useFoodStore((state) => state.chatMessagesByOrder);
  const sendChatMessage = useFoodStore((state) => state.sendChatMessage);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeTarget, setActiveTarget] = useState<ChatTarget>("Staff");
  const [draftMessage, setDraftMessage] = useState("");

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

  const orderThread = useMemo(() => {
    if (!selectedOrderId) return [];
    return chatMessagesByOrder[selectedOrderId] ?? [];
  }, [chatMessagesByOrder, orders]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      {orders.length === 0 ? (
        <Text style={styles.emptyText}>
          No active orders yet. Place an order first to chat with staff, chef, or rider.
        </Text>
      ) : (
        <>
          <Text style={styles.label}>Select order</Text>
          <View style={styles.orderRow}>
            {orders.slice(0, 4).map((order) => (
              <Pressable
                key={order.id}
                style={[
                  styles.orderChip,
                  selectedOrderId === order.id ? styles.orderChipActive : undefined,
                ]}
                onPress={() => setSelectedOrderId(order.id)}
              >
                <Text
                  style={[
                    styles.orderChipText,
                    selectedOrderId === order.id ? styles.orderChipTextActive : undefined,
                  ]}
                >
                  {order.id}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Chat with</Text>
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
                    activeTarget === target ? styles.targetChipTextActive : undefined,
                  ]}
                >
                  {target}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.threadWrap}>
            {orderThread.length === 0 ? (
              <Text style={styles.emptyThread}>
                No messages for this order yet. Send your first message.
              </Text>
            ) : (
              <FlatList
                data={orderThread}
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
                    <View style={styles.topRow}>
                      <Text style={styles.sender}>
                        {item.sender} ({item.target})
                      </Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.message}>{item.text}</Text>
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
              style={styles.input}
            />
            <Pressable
              style={[
                styles.sendButton,
                !selectedOrderId || !draftMessage.trim() ? styles.sendButtonDisabled : undefined,
              ]}
              disabled={!selectedOrderId || !draftMessage.trim()}
              onPress={() => {
                if (!selectedOrderId) return;
                sendChatMessage(selectedOrderId, activeTarget, draftMessage);
                setDraftMessage("");
              }}
            >
              <Text style={styles.sendText}>Send</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  label: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 6,
  },
  emptyText: {
    marginTop: 30,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
  },
  orderRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  orderChip: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  orderChipActive: {
    backgroundColor: "#0F766E",
    borderColor: "#0F766E",
  },
  orderChipText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
  },
  orderChipTextActive: {
    color: "#FFFFFF",
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
  threadWrap: {
    flex: 1,
    minHeight: 240,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  emptyThread: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  sender: {
    color: "#111827",
    fontWeight: "700",
    fontSize: 13,
  },
  time: {
    color: "#6B7280",
    fontSize: 11,
  },
  message: {
    marginTop: 6,
    color: "#374151",
    fontSize: 14,
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  input: {
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
