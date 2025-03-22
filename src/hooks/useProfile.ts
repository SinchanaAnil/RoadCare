
import { supabase } from '@/integrations/supabase/client';
import { ProfileType, UserType } from '@/types/auth';

export const useProfile = () => {
  // Function to fetch profile data from the profiles table
  const fetchProfile = async (userId: string): Promise<ProfileType | null> => {
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
        // Ensure we cast user_type to the correct type
        return {
          ...data,
          user_type: data.user_type as UserType
        } as ProfileType;
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const updateProfile = async (userId: string, profileData: Partial<ProfileType>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Cast the user_type to UserType to ensure type safety
        return {
          ...data,
          user_type: data.user_type as UserType
        } as ProfileType;
      }
      return null;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return {
    fetchProfile,
    updateProfile
  };
};
