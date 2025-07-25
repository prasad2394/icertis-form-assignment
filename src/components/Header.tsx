import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Icertis Assignment</h1>
        <div className="flex items-center space-x-2 text-gray-700">
          <FaUserCircle className="text-2xl" />
          <span className="font-medium">Prasad Tulshigiri</span>
        </div>
      </header>
  )
}

export default Header