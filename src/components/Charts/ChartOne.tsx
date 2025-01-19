import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';
import { db, auth } from "../../Firebase"; // Importing auth from Firebase
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth'; // Importing onAuthStateChanged to track the current logged-in user

const ChartOne = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null); // State to hold the current user
  const navigate = useNavigate();

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(postsQuery);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();

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

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Handle fulfillment and creating a notification
  const handleFulfill = async (post: any) => {
    if (!currentUser) {
      console.error("No user is logged in!");
      return;
    }

    try {
      // Create notification with the current user's name
      await addDoc(collection(db, 'notifications'), {
        recipient: post.author,
        posttitle: `${currentUser.email} is interested in: ${post.title}`,
        author: currentUser.displayName || currentUser.email, // Using displayName or email if name is not available
        createdAt: new Date() // Optional: add timestamp
      });

      console.log('Notification created successfully');
      // Optionally update the UI to show the post is fulfilled
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  // Format date function (same as before)
  const formatDate = (date: Date) => {
    if (!date) return '';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="rounded-xl border border-stroke bg-white p-3 md:p-6 shadow-default dark:border-strokedark dark:bg-boxdark w-full">
      <div className="w-full mx-auto bg-white rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Active Requests</h1>
        <div className="space-y-3 md:space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="flex flex-col gap-2 md:gap-4">
                <div className="flex-grow border border-gray-300 rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                    <h2 className="text-lg md:text-xl font-semibold">{post.title}</h2>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 mb-3">{post.body}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-xs md:text-sm text-gray-500">Posted by {post.author}</span>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="group relative ml-auto sm:ml-0">
                        <button 
                          className={`px-3 py-1.5 text-xs md:text-sm ${
                            post.fulfilled 
                              ? 'bg-gray-300 text-gray-600' 
                              : 'bg-green-100 hover:bg-green-200 text-green-700'
                          } rounded-lg flex items-center justify-center transition-colors duration-200`}
                          aria-label="Mark as fulfilled"
                          onClick={() => handleFulfill(post)}
                          disabled={post.fulfilled}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            fill="currentColor" 
                            className="bi bi-check-lg" 
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                          </svg>
                        </button>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                          I'm interested
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default ChartOne;
