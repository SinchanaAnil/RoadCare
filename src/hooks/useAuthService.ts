
import { supabase } from '@/integrations/supabase/client';
import { UserType } from '@/types/auth';
import { toast } from 'sonner';

export const useAuthService = () => {
  const login = async (email: string, password: string, userType: UserType = "citizen") => {
    try {
      console.log('Attempting login for email:', email, 'with user type:', userType);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error from Supabase:', error);
        throw error;
      }

      console.log('Login successful:', data);
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userType: UserType = "citizen") => {
    try {
      console.log('Attempting signup for email:', email, 'with user type:', userType);
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
        console.error('Signup error from Supabase:', error);
        throw error;
      }

      console.log('Signup successful:', data);
      toast.success("Successfully signed up! Please check your email for verification.");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const socialLogin = async (provider: 'google' | 'apple') => {
    try {
      console.log('Attempting social login with provider:', provider);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        }
      });

      if (error) {
        console.error('Social login error from Supabase:', error);
        throw error;
      }
      
      console.log('Social login initiated:', data);
      return data;
    } catch (error: any) {
      toast.error(error.message || `Failed to sign in with ${provider}`);
      console.error(`Error signing in with ${provider}:`, error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error from Supabase:', error);
        throw error;
      }
      
      console.log('Logout successful');
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const getSession = async () => {
    console.log('Getting current session');
    const session = await supabase.auth.getSession();
    console.log('Current session:', session);
    return session;
  };

  return {
    login,
    signUp,
    socialLogin,
    logout,
    getSession
  };
};
