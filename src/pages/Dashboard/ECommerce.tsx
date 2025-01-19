import React from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import { useState } from 'react';
import TableOne from '../../components/Tables/TableOne';
import { useNavigate } from "react-router-dom";
import { FaMagic } from 'react-icons/fa'; // Import the magic wand icon from FontAwesome
import { AiOutlinePlus } from 'react-icons/ai'; // Plus icon from react-icons/ai

const ECommerce: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Layout */}
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-5 flex flex-col gap-4">
          <ChartOne />
        </div>

        {/* Right Side Panel */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Buttons for New Request and Pair with PeerAI */}
          <div className="bg-white py-6 px-7.5 shadow-default dark:bg-boxdark">
            <div className="flex w-full gap-4">
              {/* New Request Button */}
              <button
                className="flex items-center justify-center w-1/2 h-full gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={() => {
                  navigate("/new");
                }}
              >
                <AiOutlinePlus className="text-xl" />
                New Request
              </button>

              {/* Pair with PeerAI Button */}
              <button
                className="flex items-center justify-center w-1/2 h-full gap-2 px-6 py-3 bg-gradient-to-r from-purple-300 to-purple-500 text-white rounded-lg shadow-md hover:from-purple-400 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
                onClick={() => {
                  navigate("/magic");
                }}
              >
                <FaMagic className="text-xl" /> {/* Magic Wand Icon from FontAwesome */}
                PeerAI Match
              </button>
            </div>
          </div>

          {/* Leaderboard (TableOne) */}
          <TableOne />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-11 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"></div>
    </>
  );
};

export default ECommerce;
