import './App.css';
import './output.css'
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold underline text-blue-600 mb-4">
          Hello, World!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to your React app styled with Tailwind CSS!
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>

  
  );
}

export default App;
