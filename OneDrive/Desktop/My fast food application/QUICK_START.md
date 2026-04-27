# 🚀 Quick Start Guide - FoodFast Kenya

## Prerequisites Checklist

- [ ] Node.js 16+ installed
- [ ] npm or yarn installed
- [ ] MongoDB installed or Atlas account
- [ ] Expo CLI installed (`npm install -g expo-cli`)
- [ ] Code editor (VS Code recommended)
- [ ] Android emulator or iOS simulator running

## 5-Minute Backend Setup

### Step 1: Configure Database

```bash
# Option A: Local MongoDB (ensure mongod is running)
# Option B: Use MongoDB Atlas connection string in .env
```

### Step 2: Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and M-Pesa credentials
npm install
npm run seed  # Populates database with 12+ sample products
npm run dev   # Start server on http://localhost:5000
```

**✅ Backend is ready!** Check: http://localhost:5000/health

---

## 5-Minute Mobile Setup

### Step 1: Update API URL

```bash
cd mobile/app
# Edit src/config/constants.ts
# Change: export const API_BASE_URL = 'http://YOUR_LOCAL_IP:5000/api'
# Replace YOUR_LOCAL_IP with your actual machine IP (e.g., 192.168.1.100)
```

### Step 2: Install & Run

```bash
npm install
npm run dev
# Scan QR code with Expo Go app or press 'a' for Android / 'i' for iOS
```

**✅ Mobile app is ready!**

---

## Test the Flow

### 1. Register

- Open mobile app
- Register with any email and phone (+254700000000 or 0700000000 format)
- Password: any secure password

### 2. Browse Products

- Homepage shows 12+ featured products
- Tap any product to see details
- Add to cart

### 3. Checkout

- Go to Cart tab
- Review order
- Click "Proceed to Checkout"
- Select delivery address or "Use Current Location"

### 4. Payment (M-Pesa Sandbox)

- Enter phone number
- Click "Send Payment Request"
- You'll see a waiting state
- In Safaricom M-Pesa Simulator, approve the payment
- Order confirmation appears!

### 5. Track Order

- Go to Orders tab
- See order history
- Tap order to see real-time status

---

## Useful Commands

### Backend

```bash
npm run dev      # Development with auto-reload
npm run build    # TypeScript compilation
npm start        # Production server
npm run seed     # Seed database with sample data
```

### Mobile

```bash
npm run dev      # Start Expo with full info
npm start        # Standard Expo start
expo start --android    # Run on Android emulator
expo start --ios        # Run on iOS simulator
```

---

## Common Issues & Fixes

### "Cannot connect to backend"

```
→ Check if backend is running: npm run dev in /backend
→ Update API_BASE_URL to your machine IP in constants.ts
→ Both should be on same network
→ Check firewall isn't blocking port 5000
```

### "ECONNREFUSED" error

```
→ Backend might be down
→ MongoDB not running
→ API_BASE_URL is incorrect
```

### "Mobile app won't install packages"

```bash
cd mobile/app
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### "Seed database fails"

```
→ MongoDB not running
→ MONGODB_URI incorrect in .env
→ Check permissions on /seeds directory
```

---

## Default Test Account

Email: `test@foodfast.ke`  
Password: `Password123`  
Phone: `0700000000`

(Or register new account)

---

## What's Included ✅

### Backend (100+ files)

- ✅ Express API with 5+ route modules
- ✅ MongoDB models for all entities
- ✅ JWT authentication with refresh tokens
- ✅ M-Pesa STK Push integration
- ✅ Socket.IO for real-time updates
- ✅ Comprehensive error handling
- ✅ Request logging middleware
- ✅ CORS & security headers
- ✅ Product seed data (12+ items)

### Mobile App (50+ files)

- ✅ 12 complete screens
- ✅ 9 reusable components
- ✅ 7 API service layers
- ✅ 4 Zustand state stores
- ✅ Complete navigation flow
- ✅ Secure token storage
- ✅ Form validation
- ✅ Location services
- ✅ M-Pesa payment UI

---

## Next Steps

1. **Deploy Backend**
   - Heroku: `heroku create && git push heroku main`
   - Railway: Connect GitHub repo
   - Render: Create new service

2. **Add More Features**
   - Admin dashboard
   - Rider app
   - Push notifications
   - Live GPS tracking

3. **Production Setup**
   - Get real M-Pesa credentials
   - Update all JWT secrets
   - Set up HTTPS
   - Configure rate limiting

---

## File Structure Reference

```
backend/
├── src/
│   ├── index.ts              # Express server entry
│   ├── config/               # Database & env config
│   ├── models/               # Mongoose schemas
│   ├── controllers/          # Request handlers
│   ├── services/             # Business logic
│   ├── routes/               # API endpoints
│   ├── middlewares/          # Auth, logging, errors
│   ├── sockets/              # Socket.IO events
│   ├── utils/                # JWT, responses, errors
│   └── seeds/                # Database seeders
├── .env.example              # Environment template
└── package.json

mobile/app/
├── src/
│   ├── App.tsx               # Entry point
│   ├── screens/              # 12 screen components
│   ├── components/           # 9 UI components
│   ├── services/             # API & storage
│   ├── store/                # Zustand stores
│   ├── hooks/                # Custom hooks
│   ├── navigation/           # Stack & tab nav
│   ├── types/                # TypeScript interfaces
│   ├── config/               # Constants & colors
│   └── utils/                # Helpers & formatters
├── app.json                  # Expo config
└── package.json
```

---

## Performance Tips

- 🚀 Use Android emulator with minimum 4GB RAM
- 🚀 Run backend on separate terminal for logs
- 🚀 Clear Expo cache if issues: `npm run dev`
- 🚀 Restart phone emulator if stuck

---

## Security Reminders ⚠️

- [ ] Change JWT_SECRET in .env (production)
- [ ] Change JWT_REFRESH_SECRET in .env (production)
- [ ] Never commit .env file
- [ ] Use HTTPS in production
- [ ] Get real M-Pesa credentials for production
- [ ] Test payment flow in sandbox first
- [ ] Set up CORS for your domain

---

**You're all set! 🎉 Happy coding!**

For detailed setup, see [README.md](./README.md)
