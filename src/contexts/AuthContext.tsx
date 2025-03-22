
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type UserType = "citizen" | "municipal";

export type ProfileType = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  user_type: UserType;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: ProfileType | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string, userType?: UserType) => Promise<void>;
  signUp: (email: string, password: string, userType?: UserType) => Promise<void>;
  socialLogin: (provider: 'google' | 'apple') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<ProfileType>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileType | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch profile data from the profiles table
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        return data as ProfileType;
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Show welcome message based on user type
      toast.success(userType === "citizen" ? "Welcome Citizen!!" : "Welcome Administrator!!");
      
      // Redirect based on user type
      navigate(userType === "citizen" ? "/dashboard" : "/municipal-dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userType: UserType = "citizen") => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType
          }
        }
      });

      if (error) {
        throw error;
      }

      toast.success("Successfully signed up! Please check your email for verification.");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
      console.error('Error signing up:', error);
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'apple') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        }
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message || `Failed to sign in with ${provider}`);
      console.error(`Error signing in with ${provider}:`, error);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error('Error signing out:', error);
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
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUser({ ...user, ...data });
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
