import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [identities, setIdentities] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchIdentities();
      fetchChallenges();
    }
  }, [user]);

  const fetchIdentities = async () => {
    try {
      const response = await axios.get('/api/identities');
      setIdentities(response.data);
    } catch (error) {
      console.error('Error fetching identities:', error);
    }
  };

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('/api/challenges');
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectIdentity = async (identityId) => {
    try {
      await axios.put('/api/progress/identity', { identityId });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to select identity' 
      };
    }
  };

  const completeChallenge = async (challengeId, proof, rating) => {
    try {
      const response = await axios.post('/api/progress/complete-challenge', {
        challengeId,
        proof,
        rating
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to complete challenge' 
      };
    }
  };

  const getChallengesForIdentity = (identityId) => {
    return challenges.filter(challenge => challenge.identity._id === identityId);
  };

  const value = {
    identities,
    challenges,
    currentChallenge,
    loading,
    selectIdentity,
    completeChallenge,
    getChallengesForIdentity,
    setCurrentChallenge,
    fetchChallenges,
    fetchIdentities
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};