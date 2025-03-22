
import { supabase } from '@/integrations/supabase/client';
import { UserType } from '@/types/auth';
import { toast } from 'sonner';

export const useAuthService = () => {
  const login = async (email: string, password: string, userType: UserType = "citizen") => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userType: UserType = "citizen") => {
    try {
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
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
      console.error('Error signing up:', error);
      throw error;
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
      
      return data;
    } catch (error: any) {
      toast.error(error.message || `Failed to sign in with ${provider}`);
      console.error(`Error signing in with ${provider}:`, error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const getSession = async () => {
    return await supabase.auth.getSession();
  };

  return {
    login,
    signUp,
    socialLogin,
    logout,
    getSession
  };
};
