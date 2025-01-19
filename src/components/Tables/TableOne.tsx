import React, { useState, useEffect } from 'react';
import { db, auth } from '../../Firebase'; // Assuming firebase.js is set up correctly
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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

    setTimeLeft(`${days} days left in semester - Keep studying!`);
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
      <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
        Leaderboard
      </h4>

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
