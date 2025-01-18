import React, { useState } from 'react';

const ChartOne: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      author: 'User123',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'Here is some more content for the forum.',
      author: 'User456',
    },
  ]);

  return (
    
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Forum</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <span className="text-sm text-gray-500">Posted by {post.author}</span>
            </div>
          ))}
        </div>
        <button
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => {
            // Placeholder for adding a new post functionality
            alert('Add post functionality not implemented');
          }}
        >
          Add New Post
        </button>
      </div>
    </div>
  );
};

export default ChartOne;