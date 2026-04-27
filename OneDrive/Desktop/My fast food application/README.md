# FoodFast Kenya - Food Delivery Platform

A production-ready food delivery application for Kenya, built with React Native (Expo), Node.js/Express, and MongoDB. Featuring M-Pesa STK Push payment integration, real-time order tracking, and Socket.IO for live updates.

## 🎯 Project Overview

FoodFast is a complete food delivery ecosystem designed from the ground up to serve the Kenyan market. This MVP includes a fully functional customer mobile app with backend API, designed to scale for admin and rider features later.

### Phase 1 (Current - Customer Mobile App MVP)

- ✅ User authentication (Register/Login with JWT)
- ✅ Product listing and search
- ✅ Shopping cart management
- ✅ M-Pesa STK Push payment integration
- ✅ Order placement and history
- ✅ Real-time order status tracking
- ✅ User profile management

### Phase 2 (Upcoming)

- Admin dashboard for restaurant management
- Rider mobile app for delivery partners
- Order assignment workflow
- Advanced analytics

### Phase 3 (Future)

- Live GPS tracking for riders
- Push notifications
- Advanced search and filters
- User ratings and reviews

## 🛠 Tech Stack

### Frontend (Mobile)

- **React Native** with **Expo** - Cross-platform mobile app
- **TypeScript** - Type safety
- **Zustand** - Lightweight state management
- **React Navigation** - Screen navigation
- **Expo SecureStore** - Secure token storage
- **React Hook Form + Zod** - Form validation
- **Expo Location** - Location services
- **Socket.IO Client** - Real-time updates
- **Axios** - HTTP client

### Backend

- **Node.js + Express** - REST API server
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - NoSQL database
- **JWT** - Authentication with refresh tokens
- **Socket.IO** - Real-time communication
- **M-Pesa API** - Payment processing
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting

### Database

- **MongoDB** - NoSQL database (Atlas or local)
- Collections: Users, Products, Orders, Carts, Payments, Addresses, Notifications

## ✨ Key Features

### Customer App

- 🔐 Secure authentication with JWT refresh tokens
- 🍔 Browse and search 12+ food categories
- 🛒 Persistent shopping cart
- 💳 M-Pesa STK Push payment (Kenyan optimized)
- 📍 Delivery location selection with maps
- 📦 Order tracking with status timeline
- 👤 Profile management
- 🔔 In-app notifications
- ⚡ Real-time order updates via Socket.IO

### Backend API

- RESTful endpoints for all operations
- Role-based access control (customer, admin, rider)
- Automatic payment status updates
- Real-time order status broadcasting
- Product management CRUD
- Cart synchronization
- Order history with filtering

## 📁 Project Structure

```
My fast food application/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── environment.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Order.ts
│   │   │   ├── Payment.ts
│   │   │   ├── Cart.ts
│   │   │   ├── Address.ts
│   │   │   └── Notification.ts
│   │   ├── controllers/
│   │   │   ├── AuthController.ts
│   │   │   ├── ProductController.ts
│   │   │   ├── CartController.ts
│   │   │   ├── OrderController.ts
│   │   │   └── PaymentController.ts
│   │   ├── services/
│   │   │   ├── AuthService.ts
│   │   │   ├── ProductService.ts
│   │   │   ├── CartService.ts
│   │   │   ├── OrderService.ts
│   │   │   └── MpesaService.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── cart.ts
│   │   │   ├── orders.ts
│   │   │   ├── payments.ts
│   │   │   └── index.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── requestLogger.ts
│   │   ├── sockets/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── responseHandler.ts
│   │   │   └── errors.ts
│   │   ├── seeds/
│   │   │   └── products.seed.ts
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── mobile/app/
    ├── src/
    │   ├── screens/
    │   │   ├── SplashScreen.tsx
    │   │   ├── LoginScreen.tsx
    │   │   ├── RegisterScreen.tsx
    │   │   ├── HomeScreen.tsx
    │   │   ├── ProductDetailsScreen.tsx
    │   │   ├── CartScreen.tsx
    │   │   ├── CheckoutScreen.tsx
    │   │   ├── PaymentScreen.tsx
    │   │   ├── OrderTrackingScreen.tsx
    │   │   ├── OrdersScreen.tsx
    │   │   ├── ProfileScreen.tsx
    │   │   └── NotificationsScreen.tsx
    │   ├── components/
    │   │   ├── ProductCard.tsx
    │   │   ├── CartItemComponent.tsx
    │   │   ├── OrderCard.tsx
    │   │   ├── InputField.tsx
    │   │   ├── Button.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   ├── ErrorDisplay.tsx
    │   │   ├── EmptyState.tsx
    │   │   └── Header.tsx
    │   ├── services/
    │   │   ├── StorageService.ts
    │   │   ├── apiClient.ts
    │   │   ├── AuthService.ts
    │   │   ├── ProductService.ts
    │   │   ├── CartService.ts
    │   │   ├── OrderService.ts
    │   │   └── PaymentService.ts
    │   ├── store/
    │   │   ├── authStore.ts
    │   │   ├── productStore.ts
    │   │   ├── cartStore.ts
    │   │   └── orderStore.ts
    │   ├── hooks/
    │   │   ├── useAuthInitialize.ts
    │   │   └── useLocation.ts
    │   ├── navigation/
    │   │   └── RootNavigator.tsx
    │   ├── types/
    │   │   └── index.ts
    │   ├── config/
    │   │   └── constants.ts
    │   ├── utils/
    │   │   └── helpers.ts
    │   └── App.tsx
    ├── app.json
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Backend:**
  - Node.js 16+ and npm/yarn
  - MongoDB (local or Atlas)
  - M-Pesa developer account (for payment testing)

- **Mobile:**
  - Expo CLI: `npm install -g expo-cli`
  - React Native development environment
  - Android emulator or iOS simulator
  - Expo Go app (for testing on physical device)

### Backend Setup

#### 1. Clone and Install Dependencies

```bash
cd backend
npm install
```

#### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/fooddelivery_kenya
# OR use MongoDB Atlas
# MONGODB_ATLAS_URI=mongodb+srv://user:password@cluster.mongodb.net/fooddelivery_kenya

# JWT Secrets (CHANGE IN PRODUCTION!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_refresh_token_secret_change_this_in_production

# M-Pesa Configuration (Get from Safaricom)
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=254713XXXXX
MPESA_PASSKEY=your_passkey
MPESA_ENVIRONMENT=sandbox

# URLs
FRONTEND_URL=http://localhost:3000
MOBILE_APP_URL=exp://your.ip.address:19000
```

#### 3. Start MongoDB

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (connection string in .env)
```

#### 4. Seed Database

```bash
npm run seed
```

This populates the database with 12+ sample food products.

#### 5. Start Backend Server

```bash
# Development with auto-reload
npm run dev

# Production build
npm run build
npm start
```

Server will run on `http://localhost:5000`

### Mobile App Setup

#### 1. Navigate to Mobile Directory

```bash
cd mobile/app
npm install
```

#### 2. Configure API URL

Update `src/config/constants.ts`:

```typescript
export const API_BASE_URL = "http://YOUR_IP:5000/api"; // Replace with your backend IP
```

#### 3. Start Expo Development Server

```bash
# Clear cache and start fresh
npm run dev

# Or
expo start --clear
```

#### 4. Run on Emulator/Device

**Android Emulator:**

```bash
expo start --android
```

**iOS Simulator (macOS only):**

```bash
expo start --ios
```

**Physical Device:**

- Scan QR code with Expo Go app
- Or use: `expo start` and press respective key

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Products

- `GET /api/products` - List products (paginated)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/:id` - Get product details
- `GET /api/products/search?q=query` - Search products

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item
- `DELETE /api/cart` - Clear cart

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders` - List user's orders
- `GET /api/orders/stats` - Get order statistics
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Payments

- `POST /api/payments/initiate-stk` - Initiate M-Pesa STK Push
- `GET /api/payments/query-status` - Query payment status
- `POST /api/payments/callback` - M-Pesa callback (webhook)

## 💳 M-Pesa Integration Guide

### Setting Up M-Pesa

1. **Get Credentials:**
   - Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke)
   - Register an application
   - Get Consumer Key and Consumer Secret
   - Get Business Shortcode and Passkey

2. **Test in Sandbox:**
   - Use `MPESA_ENVIRONMENT=sandbox`
   - Test phone: Any valid Kenyan number
   - No real charges in sandbox

3. **Production:**
   - Change `MPESA_ENVIRONMENT=production`
   - Update all credentials with production values
   - Set up webhook URL for payment callbacks

### Payment Flow

1. User enters phone number
2. Backend sends STK Push request to M-Pesa
3. User receives M-Pesa prompt on phone
4. User enters PIN to authorize
5. App polls backend for confirmation
6. Order status updates when payment confirmed

## 🔒 Security Considerations

- ✅ JWT tokens stored securely in Expo SecureStore
- ✅ Refresh token rotation strategy
- ✅ Password hashing with bcryptjs
- ✅ Rate limiting on API endpoints
- ✅ CORS properly configured
- ✅ Environment variables for sensitive data
- ✅ Input validation and sanitization

**⚠️ For Production:**

- Change all JWT secrets
- Enable HTTPS only
- Set up proper CORS for your domain
- Implement proper logging and monitoring
- Add rate limiting per IP
- Regular security audits

## 📱 Testing Account

For development, you can use:

```
Email: test@foodfast.ke
Password: Password123
Phone: 0700000000 or +254700000000
```

Register a new account to test the full flow.

## 🧪 Testing M-Pesa

In sandbox mode:

- Enter any valid Kenyan phone number
- Check the M-Pesa Simulator dashboard
- Simulate payment approval/rejection
- Watch order status update in real-time

## 📊 Real-Time Features

### Socket.IO Events

**Client → Server:**

- `auth` - Authenticate socket connection
- `subscribe_order` - Listen to order updates
- `send_notification` - Send notification to user

**Server → Client:**

- `order_status_changed` - Order status update
- `payment_status_changed` - Payment confirmation
- `rider_location_changed` - Rider location (Phase 2)
- `new_notification` - In-app notification

## 🐛 Troubleshooting

### Backend Issues

**"Cannot find module" errors:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**MongoDB Connection Failed:**

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB URI if using Atlas

**M-Pesa Integration Not Working:**

- Verify sandbox credentials
- Check if `MPESA_ENVIRONMENT=sandbox`
- Ensure phone number format is correct (+254 or 0)

### Mobile App Issues

**Blank Screen:**

- Clear Expo cache: `npm run dev`
- Check if backend URL is correct
- Ensure backend is running on correct port

**Location Permission Denied:**

- Grant location permission in app settings
- Android: Settings → App Permissions → Location
- iOS: Settings → Privacy → Location → FoodFast

**M-Pesa Payment Not Working:**

- Verify phone number format
- Check internet connection
- Ensure backend can reach M-Pesa API

### API Connection Issues

**"Network Error" in Mobile App:**

```
Check if:
1. Backend is running (http://localhost:5000/health)
2. API_BASE_URL in src/config/constants.ts matches your IP
3. Both devices are on same network
4. Firewall isn't blocking port 5000
```

## 📚 Additional Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Safaricom API Documentation](https://developer.safaricom.co.ke)

## 🚀 Deployment

### Backend (Heroku/Railway/Render)

```bash
# Build TypeScript
npm run build

# Deploy
# Follow platform-specific instructions
```

### Mobile App (App Store/Play Store)

```bash
# Build for distribution
expo build:android
expo build:ios

# Or use EAS (Expo Application Services)
eas build --platform android
eas build --platform ios
```

## 📝 Environment Variables Reference

### Backend .env

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/fooddelivery_kenya

# JWT
JWT_SECRET=change_this_in_production
JWT_REFRESH_SECRET=change_this_in_production
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d

# M-Pesa
MPESA_CONSUMER_KEY=key
MPESA_CONSUMER_SECRET=secret
MPESA_SHORTCODE=254713XXXXX
MPESA_PASSKEY=passkey
MPESA_INITIATOR_USERNAME=username
MPESA_INITIATOR_PASSWORD=password
MPESA_ENVIRONMENT=sandbox

# CORS & URLs
FRONTEND_URL=http://localhost:3000
MOBILE_APP_URL=exp://192.168.x.x:19000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Payment
PAYMENT_CALLBACK_SECRET=secret
```

### Mobile app/.env

```
EXPO_PUBLIC_API_URL=http://YOUR_IP:5000/api
```

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Contact: support@foodfast.ke
- Slack: #foodfast-dev

## 🎯 Roadmap

- [ ] Admin Dashboard
- [ ] Rider Mobile App
- [ ] Live GPS Tracking
- [ ] Push Notifications
- [ ] Order Ratings & Reviews
- [ ] Advanced Search & Filters
- [ ] Loyalty Program
- [ ] Multiple Payment Methods (Card, Wallet)
- [ ] Order Scheduling
- [ ] Multi-language Support

---

**Built with ❤️ for Kenya's food delivery ecosystem.**
