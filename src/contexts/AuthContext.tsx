
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
  const { fetchProfile, createProfile, updateProfile: updateUserProfile } = useProfile();
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
          let profile = await fetchProfile(newSession.user.id);
          
          // If profile doesn't exist, create one
          if (!profile) {
            console.log('Profile not found, creating new profile');
            const userType = newSession.user.user_metadata.user_type as UserType || "citizen";
            profile = await createProfile(
              newSession.user.id, 
              newSession.user.email,
              userType
            );
          }
          
          if (profile) {
            console.log('Setting user profile and authenticated state:', profile);
            setUser(profile);
            setIsAuthenticated(true);
          } else {
            console.error('Failed to get or create profile');
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          console.log('No user in session, clearing auth state');
          setUser(null);
          setIsAuthenticated(false);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession);
      setSession(currentSession);
      
      if (currentSession?.user) {
        let profile = await fetchProfile(currentSession.user.id);
        
        // If profile doesn't exist, create one
        if (!profile) {
          console.log('Profile not found on initial load, creating new profile');
          const userType = currentSession.user.user_metadata.user_type as UserType || "citizen";
          profile = await createProfile(
            currentSession.user.id, 
            currentSession.user.email,
            userType
          );
        }
        
        if (profile) {
          console.log('Setting initial user profile and authenticated state:', profile);
          setUser(profile);
          setIsAuthenticated(true);
        } else {
          console.error('Failed to get or create initial profile');
          setUser(null);
          setIsAuthenticated(false);
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
      const response = await authLogin(email, password, userType);
      
      if (response?.user) {
        // Check if profile exists, if not create one
        let profile = await fetchProfile(response.user.id);
        
        if (!profile) {
          profile = await createProfile(response.user.id, email, userType);
        }
        
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
          
          // Show welcome message based on user type
          toast.success(profile.user_type === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
          
          // Force navigate based on user type
          console.log('Redirecting after login to:', profile.user_type === "citizen" ? "/dashboard" : "/municipal-dashboard");
          navigate(profile.user_type === "citizen" ? "/dashboard" : "/municipal-dashboard", { replace: true });
        }
      }
    } catch (error) {
      // Error is already handled in authLogin
      console.error('Login failed in context:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userType: UserType = "citizen") => {
    try {
      setLoading(true);
      const response = await authSignUp(email, password, userType);
      
      if (response?.user) {
        // Create a profile for the new user
        await createProfile(response.user.id, email, userType);
      }
    } catch (error) {
      // Error is already handled in authSignUp
      console.error('Signup failed in context:', error);
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'apple') => {
    try {
      await authSocialLogin(provider);
      // The redirect happens in the provider, so we don't need to do anything else here
    } catch (error) {
      // Error is already handled in authSocialLogin
      console.error('Social login failed in context:', error);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authLogout();
      setUser(null);
      setIsAuthenticated(false);
      console.log('Navigating to / after logout');
      navigate('/', { replace: true });
    } catch (error) {
      // Error is already handled in authLogout
      console.error('Logout failed in context:', error);
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

  // For debugging purposes
  useEffect(() => {
    console.log('Auth context state:', { isAuthenticated, user, session, loading });
  }, [isAuthenticated, user, session, loading]);

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
