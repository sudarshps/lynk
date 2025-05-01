import { useNavigate } from 'react-router-dom';

export default function Lander() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
          Welcome to Lynk
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Your personalized blogging space. Read, write, and manage blogs tailored to your interests.
          Join our community and express your thoughts with ease.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
