# 🔐 Environment Variables Setup Guide

## Backend .env Configuration

### Create the file

```bash
cd backend
cp .env.example .env
```

### Required Variables

#### 1. Server Configuration

```env
PORT=5000
NODE_ENV=development
```

#### 2. Database Connection

**Option A: Local MongoDB**

```env
MONGODB_URI=mongodb://localhost:27017/fooddelivery_kenya
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (M0 free tier)
4. Create database user
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/fooddelivery_kenya`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fooddelivery_kenya
```

#### 3. JWT Configuration (IMPORTANT - CHANGE IN PRODUCTION!)

```env
# Generate secure random strings for production
# Command: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

JWT_SECRET=your_super_secret_key_here_change_in_production_xxxxxxxxxxxxxxxx
JWT_REFRESH_SECRET=your_refresh_token_secret_here_change_in_production_xxxxxxxxxxxxxxxx
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d
```

**Generating Secure Secrets:**

```bash
# Run in Node.js REPL
node
> require('crypto').randomBytes(32).toString('hex')
'f8a2b9e4c1d6a3f2b8e9c4d1a6f3b2e9...'
```

#### 4. M-Pesa Configuration

**Get from Safaricom Developer Portal:**
https://developer.safaricom.co.ke

```env
# Sandbox Testing
MPESA_ENVIRONMENT=sandbox

# Production (change after testing)
# MPESA_ENVIRONMENT=production

# Get these credentials from Safaricom Developer Portal
MPESA_CONSUMER_KEY=your_consumer_key_from_safaricom
MPESA_CONSUMER_SECRET=your_consumer_secret_from_safaricom
MPESA_SHORTCODE=254713XXXXX  # Your business shortcode
MPESA_PASSKEY=your_passkey_from_safaricom

# Account credentials (get from Safaricom)
MPESA_INITIATOR_USERNAME=your_username
MPESA_INITIATOR_PASSWORD=your_password
```

**Steps to Get M-Pesa Credentials:**

1. Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke)
2. Sign up for free account
3. Create new app under M-Pesa API
4. Under "Sandbox Integrations" → "Online Checkout"
5. Copy:
   - Consumer Key
   - Consumer Secret
   - Business Shortcode
   - Passkey

#### 5. URL Configuration

```env
# Frontend (if you have web dashboard)
FRONTEND_URL=http://localhost:3000

# Mobile app URL for CORS
MOBILE_APP_URL=exp://YOUR_LOCAL_IP:19000

# Callback URL for M-Pesa (set in Safaricom portal)
MPESA_CALLBACK_URL=https://your-domain.com/api/payments/callback
```

#### 6. Rate Limiting

```env
RATE_LIMIT_WINDOW=15  # minutes
RATE_LIMIT_MAX_REQUESTS=100  # per window
```

#### 7. Payment Configuration

```env
PAYMENT_CALLBACK_SECRET=your_secret_for_verifying_callbacks
DELIVERY_FEE=200  # Kenyan Shillings
```

### Complete Backend .env Example

```env
# ============================================================================
# SERVER CONFIGURATION
# ============================================================================
PORT=5000
NODE_ENV=development

# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================
# Local MongoDB (make sure mongod is running)
MONGODB_URI=mongodb://localhost:27017/fooddelivery_kenya

# OR MongoDB Atlas Cloud (uncomment to use)
# MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/fooddelivery_kenya

# ============================================================================
# JWT AUTHENTICATION
# ============================================================================
# SECURITY: Generate new secrets using:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

JWT_SECRET=f8a2b9e4c1d6a3f2b8e9c4d1a6f3b2e9d5c8a1f4e7b2d9c6f3a8e1d4c7b0
JWT_REFRESH_SECRET=a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d

# ============================================================================
# M-PESA INTEGRATION (Safaricom)
# ============================================================================
# Environment: sandbox (testing) or production
MPESA_ENVIRONMENT=sandbox

# Consumer credentials from Safaricom Developer Portal
MPESA_CONSUMER_KEY=gF4NG1XXtptlxxxxxxxxxxxxxxxxxxxxxx
MPESA_CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MPESA_SHORTCODE=254713XXXXX
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd1a503b30590620f160f124cd01c00a7a6fe8643e

# Initiator credentials
MPESA_INITIATOR_USERNAME=APItest
MPESA_INITIATOR_PASSWORD=Safaricom@123

# ============================================================================
# URL CONFIGURATION
# ============================================================================
# Frontend app URL
FRONTEND_URL=http://localhost:3000

# Mobile app Expo URL (replace with your local IP)
MOBILE_APP_URL=exp://192.168.1.100:19000

# M-Pesa callback webhook URL
MPESA_CALLBACK_URL=https://foodfast-api.herokuapp.com/api/payments/callback

# ============================================================================
# RATE LIMITING
# ============================================================================
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# ============================================================================
# PAYMENT SETTINGS
# ============================================================================
DELIVERY_FEE=200
PAYMENT_CALLBACK_SECRET=your_callback_verification_secret

# ============================================================================
# LOGGING & DEBUG
# ============================================================================
LOG_LEVEL=debug
DEBUG=foodfast:*
```

---

## Mobile App Environment Configuration

### For React Native Expo

The mobile app reads API URL from `src/config/constants.ts`:

```typescript
// src/config/constants.ts
export const API_BASE_URL = "http://192.168.1.100:5000/api";
// Replace 192.168.1.100 with your computer's local IP
```

**Find your local IP:**

**Windows:**

```bash
ipconfig
# Look for "IPv4 Address" under your network adapter
```

**macOS/Linux:**

```bash
ifconfig
# Look for "inet" address
```

### No .env file needed for Expo

The Expo app uses TypeScript constants directly. Update `constants.ts`:

```typescript
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.x.x:5000/api";
```

---

## Testing M-Pesa in Sandbox

### Test Phone Numbers

```
0719000000
0720000000
0721000000
```

### Test Scenario Flow

1. **Initiate Payment**
   - Phone: 0719000000
   - Amount: 1 KES (any amount)
   - Backend sends STK Push

2. **Approve in Simulator**
   - Go to Safaricom M-Pesa Simulator
   - Approve the payment request
   - Backend receives callback

3. **Check Status**
   - App polls for confirmation
   - Order status updates
   - Notification received

---

## Production Deployment Checklist

### 1. Heroku Deployment

```bash
cd backend
# Login to Heroku
heroku login

# Create app
heroku create foodfast-api

# Set environment variables
heroku config:set JWT_SECRET=<your-secure-key>
heroku config:set JWT_REFRESH_SECRET=<your-secure-key>
heroku config:set MONGODB_URI=<your-mongodb-atlas-uri>
heroku config:set MPESA_CONSUMER_KEY=<production-key>
heroku config:set MPESA_CONSUMER_SECRET=<production-secret>
heroku config:set MPESA_ENVIRONMENT=production
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### 2. Environment Variable Best Practices

**DO:**

- ✅ Use strong, random secrets (32+ characters)
- ✅ Keep secrets in .env, never commit
- ✅ Rotate secrets periodically
- ✅ Use different secrets for dev/prod
- ✅ Store in secure vault (AWS Secrets Manager, etc)

**DON'T:**

- ❌ Use simple passwords like "password123"
- ❌ Commit .env to GitHub
- ❌ Share secrets via Slack/Email
- ❌ Use same secrets across environments
- ❌ Log sensitive data

### 3. .gitignore Entry

```
# .gitignore
.env
.env.local
.env.*.local
```

---

## Troubleshooting Environment Variables

### Backend won't start: "JWT_SECRET not defined"

```bash
# Solution: Ensure .env exists and has JWT_SECRET
cat backend/.env | grep JWT_SECRET
# If empty, regenerate:
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

### "Cannot connect to MongoDB"

```bash
# Verify connection string
grep MONGODB_URI backend/.env

# If using local MongoDB, ensure it's running:
# Windows: mongod in separate terminal
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### M-Pesa payment fails: "Consumer credentials invalid"

```bash
# Verify credentials at https://developer.safaricom.co.ke
# Check MPESA_ENVIRONMENT is set correctly (sandbox vs production)
# Ensure shortcode format is correct: 254713XXXXX
```

---

## Managing Secrets in Production

### Option 1: Environment Variables (Simple)

```bash
export JWT_SECRET="your-secure-key"
export MONGODB_URI="mongodb://..."
npm start
```

### Option 2: .env File (Not for production)

```bash
# Only for development!
cp .env.example .env
# Edit with your values
npm run dev
```

### Option 3: Secrets Manager (Recommended for Production)

**AWS Secrets Manager:**

```bash
aws secretsmanager create-secret \
  --name foodfast/jwt-secret \
  --secret-string "your-secure-key"
```

**GitHub Secrets (for CI/CD):**

```yaml
# .github/workflows/deploy.yml
env:
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
  MONGODB_URI: ${{ secrets.MONGODB_URI }}
```

---

## Quick Reference

| Variable           | Type   | Required | Dev       | Prod                   |
| ------------------ | ------ | -------- | --------- | ---------------------- |
| PORT               | number | Yes      | 5000      | 3000+                  |
| MONGODB_URI        | string | Yes      | local     | Atlas                  |
| JWT_SECRET         | string | Yes      | any       | Strong                 |
| MPESA_ENVIRONMENT  | enum   | Yes      | sandbox   | production             |
| MPESA_CONSUMER_KEY | string | Yes      | sandbox   | real                   |
| API_BASE_URL       | string | Yes      | localhost | https://api.domain.com |

---

**Remember: Never share your .env file!** 🔐
