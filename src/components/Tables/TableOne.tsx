import React, { useState, useEffect } from 'react';
import { db, auth } from '../../Firebase'; // Assuming firebase.js is set up correctly
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ArrowUp } from 'lucide-react';

const Leaderboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null); // State to hold the current logged-in user
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Set the target date for June 6 of the next semester
  const targetDate = new Date('June 6, 2025 00:00:00'); // Adjust the year if needed

  // Function to calculate the remaining time
  const calculateTimeLeft = () => {
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      setTimeLeft('Resets Next Semester Now!');
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeLeft(`${days} days left in semester - Keep it up!`);
  };

  // Fetch users data from Firestore when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Query Firestore to get users sorted by rating in descending order
        const usersQuery = query(collection(db, 'users'), orderBy('rating', 'desc'));
        const querySnapshot = await getDocs(usersQuery);
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();

    // Listen for auth state changes (i.e., login/logout events)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set the current user when logged in
        setCurrentUser(user);
      } else {
        // If the user is logged out, clear the currentUser state
        setCurrentUser(null);
      }
    });

    // Set interval to update the timer every second
    const intervalId = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval and auth listener when the component unmounts
    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  // Check if the current user is in the leaderboard
  const isCurrentUser = (userId: string) => {
    return currentUser && currentUser.uid === userId; // Compare user IDs for current logged-in user
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Tutor of the Month Section */}
      <div className="bg-yellow-100 p-4 rounded-lg mb-6">
        <h5 className="text-lg font-semibold text-black dark:text-white">🎉 Tutor of the Month 🎉</h5>
        <div className="flex items-center gap-4 mt-3">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c58889f5-76f9-4e82-9059-648ab7f986da/dftg6nc-e2e604f9-2f67-4fd6-a024-c6e75f18a99d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M1ODg4OWY1LTc2ZjktNGU4Mi05MDU5LTY0OGFiN2Y5ODZkYVwvZGZ0ZzZuYy1lMmU2MDRmOS0yZjY3LTRmZDYtYTAyNC1jNmU3NWYxOGE5OWQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Rz9CCM4cMuaBxZAa7ko3LmKtX8Uczi3Z3kvDgVfsJWk"
            alt="Tutor of the Month"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-black dark:text-white flex flex-row"><span><ArrowUp size={20} className='text-green-400 pt-1'/></span><span className='text-green-400 mr-2'>70</span>Daniel Zhang  </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">For outstanding dedication and patience in math!</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">Leaderboard</h4>

      {/* Display the countdown timer */}
      <p className="mb-6 text-md font-light text-black dark:text-white">{timeLeft}</p>

      <div className="flex flex-col">
        {users.length > 0 ? (
          users.map((user, key) => (
            <div
              className={`flex items-center gap-4 p-2.5 xl:p-5 ${
                key === users.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
              } ${isCurrentUser(user.id) ? 'bg-yellow-100' : ''}`} // Highlight current user with yellow background
              key={user.id}
            >
              <div className="flex-shrink-0">
                {/* Display profile image URL from Firestore */}
                <img src={user.logo} alt={user.name} className="w-8 h-8 rounded-full" />
              </div>
              <div className="flex flex-col flex-grow">
                {/* Rank with crown on number 1 */}
                <p className="text-black dark:text-white flex items-center">
                  {key + 1}. {user.name}
                </p>
                <p className="text-meta-3">{user.rating} pts</p>
              </div>
            </div>
          ))
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
