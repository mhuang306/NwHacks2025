import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../../Firebase'; // Assuming firebase.js is set up correctly
import { doc, getDoc } from 'firebase/firestore';
import ClickOutside from '../ClickOutside';
import { Settings, LogOut } from 'lucide-react'; // Importing icons from lucide-react
import { signOut } from 'firebase/auth'; // Import Firebase Auth's signOut method

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // User data state
  const [uid, setUid] = useState<string | null>(null); // State to hold the current user UID

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid); // Get the UID of the logged-in user
        fetchUserData(user.uid); // Fetch user data from Firestore using UID
        console.log(user.uid);
      } else {
        setUid(null); // If user is logged out, set UID to null
        setUser(null); // Clear user data when logged out
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Fetch user data from Firestore using the UID
  const fetchUserData = async (userId: string) => {
    try {
      const userDocRef = doc(db, 'users', userId); // Fetch user data using UID
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUser(userDoc.data()); // Set user data from Firestore
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      setUser(null); // Clear user data on logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return <div><Link to="/login">Login</Link></div>; // Display loading while fetching user data
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user.name}
          </span>
          <span className="block text-xs">{user.rating} pts</span> {/* Display rating */}
        </span>

        <span className="h-12 w-12">
          <img src={user.logo} alt="User" className='rounded-full' />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""/>
        </svg>
      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <Settings className="fill-current" width="22" height="22" />
                Settings
              </Link>
            </li>
          </ul>
          <button
            onClick={handleLogout} // Call logout function on click
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <LogOut className="fill-current" width="22" height="22" />
            Logout
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
