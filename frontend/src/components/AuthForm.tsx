import { useState } from 'react';
import { Protocol, authService } from '../api/authService';

interface AuthFormProps {
  protocol: Protocol;
  onSuccess: (token: string) => void;
}

export function AuthForm({ protocol, onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      if (isLogin) {
        const result = await authService.login(protocol, { email: formData.email, password: formData.password });
        setMessage({ text: `Welcome, ${result.user.fullName}! (via ${protocol})`, type: 'success' });
        localStorage.setItem('token', result.token);
        onSuccess(result.token);
      } else {
        await authService.signup(protocol, formData);
        setMessage({ text: `Account created successfully! Now login. (via ${protocol})`, type: 'success' });
        setIsLogin(true);
      }
    } catch (err: any) {
      setMessage({ text: err.response?.data?.error || err.message, type: 'error' });
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto border border-gray-100 transition-all duration-300 transform hover:shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
        {isLogin ? 'Login' : 'Signup'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 ${
            protocol === Protocol.REST ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      {message && (
        <div className={`mt-6 p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="w-full mt-6 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
      >
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>
    </div>
  );
}
