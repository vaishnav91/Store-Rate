import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updatePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for stored user data on app initialization
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState(prev => ({
        ...prev,
        user: JSON.parse(storedUser),
        isLoading: false,
      }));
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Mock login logic - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let mockUser: User;
      if (email === 'admin@example.com') {
        mockUser = {
          id: '1',
          name: 'System Administrator',
          email: 'admin@example.com',
          address: '123 Admin Street, City, State 12345',
          role: 'SYSTEM_ADMIN',
          createdAt: '2024-01-01T00:00:00Z',
        };
      } else if (email === 'store@example.com') {
        mockUser = {
          id: '2',
          name: 'Store Owner',
          email: 'store@example.com',
          address: '456 Store Avenue, City, State 67890',
          role: 'STORE_OWNER',
          storeId: '1',
          createdAt: '2024-01-01T00:00:00Z',
        };
      } else {
        mockUser = {
          id: '3',
          name: 'John Doe',
          email: email,
          address: '789 User Lane, City, State 54321',
          role: 'NORMAL_USER',
          createdAt: '2024-01-01T00:00:00Z',
        };
      }

      localStorage.setItem('user', JSON.stringify(mockUser));
      setAuthState({
        user: mockUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please check your credentials.',
      }));
    }
  };

  const register = async (userData: any) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Mock registration logic - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        address: userData.address,
        role: 'NORMAL_USER',
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed. Please try again.',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Mock password update logic - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Password update failed. Please try again.',
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updatePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};