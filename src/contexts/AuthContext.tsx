
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContextType, ProfileType, UserType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, userType: UserType = "citizen") => {
    try {
      setLoading(true);
      console.log('Logging in with email:', email, 'as user type:', userType);
      
      // Create a simple user profile based on email
      const newUser: ProfileType = {
        id: Date.now().toString(), // Simple ID based on timestamp
        name: email.split('@')[0] || 'User',
        email: email,
        user_type: userType,
      };
      
      // Store user in state
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Show welcome message based on user type
      toast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
      
      // Navigate to appropriate dashboard
      console.log('Redirecting after login to:', userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
      navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard", { replace: true });
      
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setUser(null);
      setIsAuthenticated(false);
      console.log('Navigating to / after logout');
      navigate('/', { replace: true });
      toast.success("Successfully logged out");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<ProfileType>) => {
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    try {
      setLoading(true);
      const updatedProfile = {
        ...user,
        ...profileData
      };
      setUser(updatedProfile);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // For debugging purposes
  useEffect(() => {
    console.log('Auth context state:', { isAuthenticated, user, loading });
  }, [isAuthenticated, user, loading]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      session: null, // Removed session
      loading,
      login, 
      signUp: login, // Redirect signUp to login
      socialLogin: (provider) => login(`${provider}@example.com`), // Simple mock for social login
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
