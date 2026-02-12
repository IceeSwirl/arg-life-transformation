import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { Link } from 'react-router-dom';
import { Zap, Target, Award, Play, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { identities, challenges, getChallengesForIdentity } = useGame();
  const [selectedIdentity, setSelectedIdentity] = useState(null);

  const currentIdentity = identities.find(
    id => id._id === user?.currentIdentity?._id
  );

  const identityChallenges = currentIdentity 
    ? getChallengesForIdentity(currentIdentity._id)
    : [];

  const dailyChallenges = challenges.slice(0, 5);

  if (!user) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to ARG Life</h1>
        <p className="text-gray-400 mb-8">Transform your life through method acting</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded">
            Start Your Transformation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.username}!</h1>
        <p className="text-gray-300">
          {currentIdentity 
            ? `Transforming into: ${currentIdentity.name}`
            : 'Choose your new identity to begin'}
        </p>
        
        <div className="flex items-center space-x-8 mt-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span>Level {user.level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-green-400" />
            <span>{user.xp} XP</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>{user.streak} day streak</span>
          </div>
        </div>
      </div>

      {/* Current Identity */}
      {currentIdentity && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Current Identity</h2>
          <div className="flex items-center space-x-4">
            <img 
              src={currentIdentity.avatar} 
              alt={currentIdentity.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{currentIdentity.name}</h3>
              <p className="text-gray-400">{currentIdentity.description}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Your Challenges</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {identityChallenges.slice(0, 4).map(challenge => (
                <div key={challenge._id} className="bg-gray-700 p-4 rounded">
                  <h5 className="font-semibold">{challenge.title}</h5>
                  <p className="text-sm text-gray-400">{challenge.type}</p>
                  <Link 
                    to={`/challenge/${challenge._id}`}
                    className="mt-2 inline-flex items-center text-purple-400"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Identity Selection */}
      {!currentIdentity && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Choose Your Transformation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {identities.map(identity => (
              <div 
                key={identity._id} 
                className="bg-gray-700 p-4 rounded cursor-pointer hover:bg-gray-600"
                onClick={() => setSelectedIdentity(identity)}
              >
                <img 
                  src={identity.avatar} 
                  alt={identity.name}
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
                <h3 className="font-semibold text-center">{identity.name}</h3>
                <p className="text-sm text-gray-400 text-center">
                  {identity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Challenges */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Daily Challenges</h2>
        <div className="space-y-4">
          {dailyChallenges.map(challenge => (
            <div key={challenge._id} className="bg-gray-700 p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{challenge.title}</h3>
                <p className="text-sm text-gray-400">{challenge.description}</p>
              </div>
              <Link 
                to={`/challenge/${challenge._id}`}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              >
                Start
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;