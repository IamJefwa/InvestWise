
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User, LoginData, RegisterData } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<{ email: string }>;
  logout: () => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateProfile: (profileData: any) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (accessToken && refreshToken) {
          // Try to get user profile with current token
          try {
            const userProfile = await apiService.getProfile();
            setUser(userProfile);
          } catch (error) {
            // If access token is expired, try to refresh
            try {
              const refreshResponse = await apiService.refreshToken(refreshToken);
              localStorage.setItem('access_token', refreshResponse.access);
              
              // Retry getting user profile
              const userProfile = await apiService.getProfile();
              setUser(userProfile);
            } catch (refreshError) {
              // Refresh failed, clear tokens
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              setUser(null);
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiService.login(data);
      
      // Store tokens
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      
      // Set user data
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<{ email: string }> => {
    try {
      setIsLoading(true);
      const response = await apiService.register(data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await apiService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and user state regardless of API call success
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiService.verifyOTP({ email, otp });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async (email: string): Promise<void> => {
    try {
      await apiService.resendOTP(email);
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await apiService.forgotPassword({ email });
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string, token: string, newPassword: string): Promise<void> => {
    try {
      await apiService.resetPassword({ email, token, new_password: newPassword });
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await apiService.changePassword({ current_password: currentPassword, new_password: newPassword });
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (profileData: any): Promise<void> => {
    try {
      setIsLoading(true);
      const updatedUser = await apiService.updateProfile(profileData);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserProfile = async (): Promise<void> => {
    try {
      const userProfile = await apiService.getProfile();
      setUser(userProfile);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
