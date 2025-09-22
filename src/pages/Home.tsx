const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to My Portfolio</h1>
      <p className="text-xl text-gray-600 max-w-2xl text-center mb-8">
        I'm a passionate developer creating beautiful and functional web
        experiences. Explore my work and get in touch if you'd like to
        collaborate!
      </p>
      <div className="flex space-x-4">
        <a
          href="#projects"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default Home;
