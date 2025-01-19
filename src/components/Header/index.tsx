import { Link } from 'react-router-dom';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo.png';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex items-center justify-between w-full px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Logo and Slogan Section */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-4">
          <Link className="block flex-shrink-0" to="/home">
            <img
              src={LogoIcon}
              alt="Logo"
              className="max-w-[80px] h-auto" // Adjust logo size as needed
            />
          </Link>

          {/* Slogan under the logo on mobile, next to it on larger screens */}
          <span className="hidden md:inline text-lg font-medium text-gray-600 mt-2 sm:mt-0">
            We Care. We Pair.
          </span>
        </div>

        {/* User and Notification Sections */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Notification Menu Area */}
            <DropdownNotification />
          </ul>

          {/* User Area */}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
