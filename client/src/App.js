import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import IdentitySelector from './pages/IdentitySelector';
import ChallengeView from './pages/ChallengeView';
import ARView from './pages/ARView';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <div className="App min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/identities" element={<IdentitySelector />} />
                <Route path="/challenge/:id" element={<ChallengeView />} />
                <Route path="/ar/:challengeId" element={<ARView />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;