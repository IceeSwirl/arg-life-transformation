# ARG Life Transformation Game

A complete web-based identity transformation game using method acting and augmented reality.

## 🎮 Quick Start

```bash
# Clone and setup
git clone https://github.com/IceeSwirl/arg-life-game.git
cd arg-life-game
npm install
cd client && npm install && cd ..

# Start development
npm run dev

# Seed database
node seed.js
```

## 📱 Features

- **Identity Transformation**: 4 persona templates with method acting challenges
- **AR Integration**: WebXR camera overlays for real-world gamification
- **Progress Tracking**: XP, levels, streaks, challenge completion
- **Real-time Updates**: Socket.io for live progress
- **Mobile Ready**: PWA installable on phones

## 🎯 Identity Templates

1. **High Fashion Influencer** - Style challenges, runway styling
2. **Elite Athlete** - 5AM routines, meal prep, performance mindset
3. **Tech Entrepreneur** - Pitching, networking, productivity systems
4. **Master Craftsman** - Skill development, workspace optimization

## 🚀 Tech Stack

- **Frontend**: React + Three.js + WebXR
- **Backend**: Node.js + Express + MongoDB
- **Real-time**: Socket.io
- **Authentication**: JWT + bcrypt
- **Database**: MongoDB with Mongoose

## 🔄 Game Loop

1. **Choose Identity** - Select transformation persona
2. **Complete Challenges** - Daily method acting tasks
3. **AR Verification** - Photo/video proof with AR overlays
4. **Level Up** - Unlock harder challenges
5. **Identity Lock-in** - Permanent behavioral changes

## 📊 Development Commands

```bash
npm run dev        # Start both server and client
npm run seed       # Populate test data
npm run build      # Production build
npm start          # Start production server
```

## 🎨 Custom Identities

Add new personas by modifying `seed.js` and creating challenge templates.

## 📱 Mobile Installation

The app is PWA-ready - install directly to your phone from the browser.

**Ready to transform your life through method acting!**