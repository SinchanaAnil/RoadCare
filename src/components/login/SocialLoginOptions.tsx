
import React from "react";

interface SocialLoginOptionsProps {
  onSocialLogin: (provider: 'google' | 'apple') => void;
}

const SocialLoginOptions = ({ onSocialLogin }: SocialLoginOptionsProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <button
        type="button"
        onClick={() => onSocialLogin('google')}
        className="flex items-center justify-center gap-2 p-2 border border-[#3498DB]/20 rounded-md bg-white text-[#333333] hover:bg-gray-50 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>
      <button
        type="button"
        onClick={() => onSocialLogin('apple')}
        className="flex items-center justify-center gap-2 p-2 border border-[#3498DB]/20 rounded-md bg-white text-[#333333] hover:bg-gray-50 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#000000"
            d="M16.05 7.05a4.57 4.57 0 0 0-1.09-3.27 4.18 4.18 0 0 0-3.14-1.54 4.22 4.22 0 0 0-1 .1A4.14 4.14 0 0 0 8.7 3.51a4.28 4.28 0 0 0-2.3 3.51 3.51 3.51 0 0 0 1.35 2.85 4.18 4.18 0 0 0 2.83 1.15c.31 0 .63 0 1-.05a3.78 3.78 0 0 0 3-1.28 3.24 3.24 0 0 0 1.49-2.64zm5.39 12.29a7.7 7.7 0 0 1-.77 1.4A6.23 6.23 0 0 1 19.6 22a3.24 3.24 0 0 1-1.62.46 3.91 3.91 0 0 1-1.29-.21 4.58 4.58 0 0 1-1.08-.56 10.19 10.19 0 0 0-1.08-.55 4.77 4.77 0 0 0-2.65 0 9 9 0 0 0-1.06.55A4.19 4.19 0 0 1 9.75 22a3.93 3.93 0 0 1-1.29.22A3.31 3.31 0 0 1 6.83 22a6.17 6.17 0 0 1-1.08-1.22 9.09 9.09 0 0 1-.79-1.4A10.28 10.28 0 0 1 4 15.05a8.5 8.5 0 0 1 .79-4 5.7 5.7 0 0 1 2-2.13 5.1 5.1 0 0 1 2.47-.69 5.77 5.77 0 0 1 1.78.32l.75.29a2.36 2.36 0 0 0 .8.27 2.39 2.39 0 0 0 .72-.27l.86-.34A5.43 5.43 0 0 1 16 8.14a5.38 5.38 0 0 1 2.55.67 5.83 5.83 0 0 1 2 2c-.19.12-.37.24-.55.38a5.39 5.39 0 0 0-1.9 4.19 5.41 5.41 0 0 0 1.72 4 6.92 6.92 0 0 0 1.62 1z"
          />
        </svg>
        Continue with Apple
      </button>
    </div>
  );
};

export default SocialLoginOptions;
