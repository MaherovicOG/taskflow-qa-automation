import { Protocol } from '../api/authService';

interface ProtocolToggleProps {
  current: Protocol;
  onChange: (protocol: Protocol) => void;
}

export function ProtocolToggle({ current, onChange }: ProtocolToggleProps) {
  return (
    <div className="flex bg-gray-100 p-1 rounded-lg w-fit mx-auto mb-8 shadow-inner">
      <button
        onClick={() => onChange(Protocol.REST)}
        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
          current === Protocol.REST
            ? 'bg-white text-blue-600 shadow-md transform scale-105'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        REST API
      </button>
      <button
        onClick={() => onChange(Protocol.GRAPHQL)}
        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
          current === Protocol.GRAPHQL
            ? 'bg-white text-purple-600 shadow-md transform scale-105'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        GraphQL
      </button>
    </div>
  );
}
