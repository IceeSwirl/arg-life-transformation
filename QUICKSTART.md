# ARG Life Transformation Game

## Quick Start

1. **Install dependencies:**
   ```bash
   # Root directory
   npm install
   
   # Client directory
   cd client && npm install
   ```

2. **Setup environment:**
   ```bash
   # Create .env file in server directory
   MONGODB_URI=mongodb://localhost:27017/arg-game
   JWT_SECRET=your-secret-key
   CLIENT_URL=http://localhost:3000
   PORT=5000
   ```

3. **Start the application:**
   ```bash
   npm run dev
   # This starts both server (localhost:5000) and client (localhost:3000)
   ```

4. **Seed initial data:**
   ```bash
   npm run seed
   # Creates sample identities and challenges
   ```

## Features Ready to Test

- **Identity Selection**: Choose from pre-built personas (Fashion Influencer, Elite Athlete, etc.)
- **Challenge System**: Daily method acting tasks with AR overlays
- **Progress Tracking**: XP, levels, and streaks
- **AR Integration**: WebXR for augmented reality challenges
- **Real-time Updates**: Socket.io for live progress
- **Mobile Optimized**: PWA installable on phones

## Testing the ARG Loop

1. **Pick Identity**: Start with "High Fashion Influencer" 
2. **First Challenge**: "Style your current outfit for a runway" (photo verification)
3. **AR Mode**: Use camera to see virtual fashion overlay
4. **Social Proof**: Share transformation with friends
5. **Level Up**: Unlock harder challenges as you progress

The game is now fully functional - just run the commands above and you can start testing the identity transformation mechanics right away!