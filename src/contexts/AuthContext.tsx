
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useProfile } from '@/hooks/useProfile';
import { useAuthService } from '@/hooks/useAuthService';
import { AuthContextType, ProfileType, UserType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileType | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fetchProfile, updateProfile: updateUserProfile } = useProfile();
  const { login: authLogin, signUp: authSignUp, socialLogin: authSocialLogin, logout: authLogout } = useAuthService();

  // Set up auth state listener
  useEffect(() => {
    setLoading(true);
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession);
        setSession(newSession);
        
        if (newSession?.user) {
          const profile = await fetchProfile(newSession.user.id);
          if (profile) {
            setUser(profile);
            setIsAuthenticated(true);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        const profile = await fetchProfile(currentSession.user.id);
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, userType: UserType = "citizen") => {
    try {
      setLoading(true);
      await authLogin(email, password, userType);

      // Show welcome message based on user type
      toast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
      
      // Redirect based on user type
      navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
    } catch (error) {
      // Error is already handled in authLogin
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userType: UserType = "citizen") => {
    try {
      setLoading(true);
      await authSignUp(email, password, userType);
    } catch (error) {
      // Error is already handled in authSignUp
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'apple') => {
    try {
      await authSocialLogin(provider);
    } catch (error) {
      // Error is already handled in authSocialLogin
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authLogout();
      navigate('/');
    } catch (error) {
      // Error is already handled in authLogout
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
      const updatedProfile = await updateUserProfile(user.id, profileData);

      if (updatedProfile) {
        setUser(updatedProfile);
        toast.success("Profile updated successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      session,
      loading,
      login, 
      signUp,
      socialLogin,
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
