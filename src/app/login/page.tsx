"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image'; // Add this import

// Inline SVGs for icons (keeping them as they might be useful for other parts of the app, but not used in this specific login form anymore)
const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
);

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // New state for animation
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const [isLoading, setIsLoading] = useState(false); // New state for loading spinner

  // Eye icons for password visibility toggle
  const EyeOpenIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
    </svg>
  );

  const EyeClosedIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .765 0 1.523.098 2.265.288M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.542 0c-.965 3.05-3.66 5-6.542 5-1.274 0-2.48-.25-3.59-.73M3 3l18 18"></path>
    </svg>
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsClicked(true); // Start button animation
    setIsLoading(true); // Start loading spinner

    // Simulate a delay for the animation to be visible
    await new Promise(resolve => setTimeout(resolve, 200)); // Match CSS transition duration

    const USERS: Record<string, { password: string }> = {
      'admin': { password: 'admin123' },
      'basic_user': { password: 'basic123' },
      'advanced_user': { password: 'advanced123' },
    };

    try {
      if (USERS[username] && USERS[username].password === password) {
        login();
      } else {
        setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } finally {
      setIsClicked(false); // End button animation
      setIsLoading(false); // End loading spinner
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="relative w-full max-w-md bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 text-white border border-gray-700 border-opacity-30">
        
        {/* App Logo and Name */}
        <div className="flex flex-col items-center justify-center mb-6">
          <Image src="/logo_app.png" alt="PyroTrack Logo" width={250} height={250} className="mb-4" />
          <h1 className="text-4xl font-bold text-center">Iniciar Sesión</h1>
        </div>

        

        {error && (
          <div className="p-3 text-sm text-center text-red-300 bg-red-800 bg-opacity-50 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 text-white"
              placeholder="Usuario"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 text-white"
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
              name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-gray-600 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-300">
                Recordarme
              </label>
            </div>
            <a href="#" className="mt-2 sm:mt-0 font-medium text-indigo-400 hover:text-indigo-300">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${isClicked ? 'scale-90' : ''}`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">
            <svg className="animate-spin h-10 w-10 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando...
          </div>
        </div>
      )}
    </main>
  );
}