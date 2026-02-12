import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, User, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold">ARG Life</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">
                    Level {user.level} • {user.xp} XP
                  </span>
                  <Link to="/profile" className="hover:text-purple-400">
                    <User className="w-5 h-5" />
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;