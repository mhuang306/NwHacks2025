import React from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import { useState } from 'react';
import TableOne from '../../components/Tables/TableOne';
import { useNavigate } from "react-router-dom";
import { FaMagic } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { Users, Sparkles, Trophy } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-purple-50/50 p-6">


      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-5 space-y-6">

  <ChartOne />

        </div>

        {/* Right Side Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Buttons */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate("/new")}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                <div className="flex items-center justify-center gap-3">
                  <AiOutlinePlus className="text-xl" />
                  <span className="font-medium">Start Learning</span>
                </div>
                <p className="text-sm text-blue-100 mt-1">Create a new study request</p>
              </button>

              <button
                onClick={() => navigate("/magic")}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
              >
                <div className="flex items-center justify-center gap-3">
                  <FaMagic className="text-xl" />
                  <span className="font-medium">Smart Match</span>
                </div>
                <p className="text-sm text-purple-100 mt-1">Find your perfect study buddy</p>
              </button>
            </div>
          </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
              <TableOne />
            </div>
          </div>
      </div>

      {/* Additional spacing for bottom content if needed */}
      <div className="mt-6" />
    </div>
  );
};

export default Dashboard;