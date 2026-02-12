#!/bin/bash
# ARG Life Game Setup Script for Desktop
# Run this on your desktop after downloading

echo "🎮 Setting up ARG Life Transformation Game..."

# Create directory
mkdir -p arg-life-game
cd arg-life-game

# Extract game
echo "📦 Extracting game files..."
tar -xzf ../arg-life-game.tar.gz

# Install dependencies
echo "📥 Installing server dependencies..."
npm install

echo "📱 Installing client dependencies..."
cd client
npm install
cd ..

# Create environment file
echo "🔧 Creating environment file..."
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/arg-game
JWT_SECRET=your-secret-key-change-this
CLIENT_URL=http://localhost:3000
PORT=5000
EOF

# Seed database
echo "🌱 Seeding database..."
node seed.js

# Start application
echo "🚀 Starting ARG Life..."
npm run dev

echo "✅ Game is running!"
echo "📱 Frontend: http://localhost:3000"
echo "⚙️  Backend: http://localhost:5000"
echo ""
echo "Ready to transform your life!

# Quick start commands:
# 1. Download: arg-life-game.tar.gz
# 2. Run: chmod +x setup.sh && ./setup.sh
# 3. Visit: http://localhost:3000