import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
      <h1>Welcome to Youke Uniswap</h1>
      <p>This is the home page.</p>
      <Link to="/swap">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-300">
          Go to Swap
        </button>
      </Link>
    </div>
  );
}