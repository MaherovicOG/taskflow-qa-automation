import { useState } from 'react';
import { Protocol, authService } from '../api/authService';

interface DashboardProps {
  protocol: Protocol;
  onLogout: () => void;
}

export function Dashboard({ protocol, onLogout }: DashboardProps) {
  const [profile, setProfile] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      const result = await authService.getMe(protocol);
      setProfile(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const result = await authService.getAllUsers(protocol);
      setUsers(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto border border-gray-100 flex flex-col items-center">
      <div className="flex justify-between w-full items-center mb-8 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">TaskFlow Dashboard</h2>
          <p className="text-sm text-gray-500 font-medium">Protocol: <span className={protocol === Protocol.REST ? 'text-blue-600' : 'text-purple-600'}>{protocol}</span></p>
        </div>
        <button 
          onClick={onLogout}
          className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors border border-red-200"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 w-full mb-8">
        <button 
          onClick={fetchProfile}
          className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02]"
        >
          🔍 Fetch My Profile
        </button>
        <button 
          onClick={fetchAllUsers}
          className="flex-1 py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-all transform hover:scale-[1.02]"
        >
          👥 Fetch All Users
        </button>
      </div>

      {error && <p className="text-red-500 mb-4 bg-red-50 p-2 rounded w-full text-center border border-red-100">{error}</p>}

      {profile && (
        <div className="w-full bg-blue-50 p-6 rounded-2xl mb-6 animate-fade-in border border-blue-100">
          <h3 className="font-bold text-blue-800 text-lg mb-4">My Information</h3>
          <div className="space-y-2">
            <p className="text-blue-700"><span className="font-semibold">ID:</span> {profile.id}</p>
            <p className="text-blue-700"><span className="font-semibold">Full Name:</span> {profile.fullName}</p>
            <p className="text-blue-700"><span className="font-semibold">Email:</span> {profile.email}</p>
          </div>
        </div>
      )}

      {users.length > 0 && (
        <div className="w-full bg-purple-50 p-6 rounded-2xl animate-fade-in border border-purple-100">
          <h3 className="font-bold text-purple-800 text-lg mb-4">Application Users</h3>
          <ul className="space-y-3">
            {users.map((u) => (
              <li key={u.id} className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3 border border-purple-100">
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xs">
                  {u.fullName?.[0] || 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{u.fullName}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
