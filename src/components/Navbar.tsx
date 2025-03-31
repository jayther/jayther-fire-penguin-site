import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Portfolio
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
            <Link to="/projects" className="text-gray-600 hover:text-gray-800">
              Projects
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 