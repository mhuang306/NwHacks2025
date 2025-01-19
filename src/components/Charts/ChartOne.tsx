import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';
import { db, auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { HandHeart, Clock, User } from 'lucide-react';

const ChartOne = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Existing useEffect and fetch logic remains the same...
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

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFulfill = async (post) => {
    if (!currentUser) {
      console.error("No user is logged in!");
      return;
    }

    try {
      await addDoc(collection(db, 'notifications'), {
        recipient: post.author,
        posttitle: `${currentUser.email} is interested in: ${post.title}`,
        author: currentUser.displayName || currentUser.email,
        createdAt: new Date()
      });

      console.log('Notification created successfully');
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const formatDate = (date) => {
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
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Recent Posts ({posts.length})</h1>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="group">
                <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-300 hover:shadow-lg">
                  {/* Main content */}
                  <div className="p-4">
                    <h2 className="text-lg md:text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-sm md:text-base text-gray-700">{post.body}</p>
                  </div>
                  
                  {/* Interactive footer */}
                  <div className="mt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                      {/* Left side - Author and time */}
                      <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span className="text-sm">{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span className="text-sm">{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                      
                      {/* Right side - Help button */}
                      <button
                        onClick={() => handleFulfill(post)}
                        disabled={post.fulfilled}
                        className={`flex items-center space-x-2 px-4 py-1.5 rounded-full transition-all duration-200 ${
                          post.fulfilled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 group-hover:scale-105'
                        }`}
                      >
                        <HandHeart size={16} />
                        <span className="text-sm font-medium">
                          {post.fulfilled ? 'Helped' : 'I can help'}
                        </span>
                      </button>
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