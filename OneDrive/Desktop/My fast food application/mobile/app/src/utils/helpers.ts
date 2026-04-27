export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("254")) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith("1")) {
    return `+254${cleaned.slice(1)}`;
  } else if (cleaned.startsWith("0")) {
    return `+254${cleaned.slice(1)}`;
  }
  return phone;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+254\d{9}$|^0\d{9}$/;
  return phoneRegex.test(phone);
};

export const getTimeAgo = (date: Date | string): string => {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const getOrderStatusLabel = (status: string): string => {
  const labels: { [key: string]: string } = {
    pending: "Pending",
    confirmed: "Confirmed",
    preparing: "Preparing",
    ready_for_pickup: "Ready",
    out_for_delivery: "On the way",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
};

export const getPaymentStatusLabel = (status: string): string => {
  const labels: { [key: string]: string } = {
    unpaid: "Unpaid",
    pending: "Processing",
    paid: "Paid",
    failed: "Failed",
  };
  return labels[status] || status;
};
