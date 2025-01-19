import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {db} from "../../Firebase";
import { useNavigate } from "react-router-dom";

const ChartOne: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  // Fetch posts from Firestore when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs only once after initial render

  const navigate = useNavigate();

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Request Board</h1>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="flex justify-center align-center">
                <div
                  key={post.id}
                  className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition min-w-full"
                >
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4">{post.body}</p>
                  <span className="text-sm text-gray-500">Posted by {post.author}</span>
                </div>
                <div>
             
                  <button className="btn btn-square btn-outline bg-green-300 justify-center align-center h-full items-center btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg h-full bg-base" viewBox="0 0 16 16">
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                    </svg>
                  </button>
                
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
