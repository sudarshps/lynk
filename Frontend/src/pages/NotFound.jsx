const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          Go Back Home
        </a>
      </div>
    );
  };
  
  export default NotFound;
  