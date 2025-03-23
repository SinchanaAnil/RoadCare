
export type UserType = "citizen" | "municipal";

export type ProfileType = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  user_type: UserType;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: ProfileType | null;
  session: null; // Simplified to null
  loading: boolean;
  login: (email: string, userType?: UserType) => Promise<void>;
  signUp: (email: string, userType?: UserType) => Promise<void>;
  socialLogin: (provider: 'google' | 'apple') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<ProfileType>) => Promise<void>;
};
