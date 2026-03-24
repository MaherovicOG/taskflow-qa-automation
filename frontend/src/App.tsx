import { useState, useEffect } from 'react';
import { Protocol } from './api/authService';
import { ProtocolToggle } from './components/ProtocolToggle';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';

function App() {
  const [protocol, setProtocol] = useState<Protocol>(Protocol.REST);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-lg">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">
            TaskFlow <span className="text-blue-600">QA</span>
          </h1>
          <p className="text-gray-500 font-medium">Multi-Protocol Authentication Platform</p>
        </header>

        {token ? (
          <Dashboard protocol={protocol} onLogout={handleLogout} />
        ) : (
          <>
            <ProtocolToggle current={protocol} onChange={setProtocol} />
            <AuthForm protocol={protocol} onSuccess={setToken} />
          </>
        )}

        <footer className="mt-16 text-center text-gray-400 text-sm font-medium">
          Built with React • Tailwind v4 • TypeScript
        </footer>
      </div>
    </div>
  );
}

export default App;
