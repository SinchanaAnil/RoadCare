
import { supabase } from '@/integrations/supabase/client';
import { ProfileType, UserType } from '@/types/auth';
import { toast } from 'sonner';

export const useProfile = () => {
  // Function to fetch profile data from the profiles table
  const fetchProfile = async (userId: string): Promise<ProfileType | null> => {
    try {
      console.log('Fetching profile for user ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile from Supabase:', error);
        throw error;
      }

      if (data) {
        console.log('Profile data retrieved:', data);
        // Ensure we cast user_type to the correct type
        return {
          ...data,
          user_type: data.user_type as UserType
        } as ProfileType;
      } else {
        console.log('No profile found for user ID:', userId);
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Function to create a profile if it doesn't exist
  const createProfile = async (userId: string, email: string | undefined, userType: UserType = "citizen"): Promise<ProfileType | null> => {
    try {
      console.log('Creating new profile for user ID:', userId);
      
      const newProfile = {
        id: userId,
        name: email?.split('@')[0] || 'New User',
        email,
        user_type: userType,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('profiles')
        .insert([newProfile])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        throw error;
      }

      if (data) {
        console.log('Profile created successfully:', data);
        return {
          ...data,
          user_type: data.user_type as UserType
        } as ProfileType;
      }
      return null;
    } catch (error) {
      console.error('Error creating profile:', error);
      return null;
    }
  };

  const updateProfile = async (userId: string, profileData: Partial<ProfileType>) => {
    try {
      console.log('Updating profile for user ID:', userId, 'with data:', profileData);
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      if (data) {
        console.log('Profile updated successfully:', data);
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
    createProfile,
    updateProfile
  };
};
