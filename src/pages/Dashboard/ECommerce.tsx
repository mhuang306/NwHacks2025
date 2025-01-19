import React from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import { useState } from 'react';
import TableOne from '../../components/Tables/TableOne';

const ECommerce: React.FC = () => {
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
    <>
      {/* Main Layout */}
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-5 flex flex-col gap-4">
          <ChartOne />
        </div>
        

        {/* Right Side Panel */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* New Request Button */}
          <div className="bg-white py-6 px-7.5 shadow-default dark:bg-boxdark">
            <div className="flex items-center justify-center">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New Request
              </button>
            </div>
          </div>

          {/* Leaderboard (TableOne) */}
          <div className="bg-white py-6 px-7.5 shadow-default dark:bg-boxdark flex-grow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Leaderboard</h2>
            <TableOne />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-11 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
  <div className="col-span-12 xl:col-span-8">
    <ChartOne/>
  </div>
  <div className="col-span-12 xl:col-span-3">
    <TableOne />
  </div>
</div>

    </>
  );
};

export default ECommerce;
