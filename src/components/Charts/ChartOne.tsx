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
    <div className="col-span-12 bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Request Board</h1>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.body}</p>
                <span className="text-sm text-gray-500">Posted by {post.author}</span>
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
