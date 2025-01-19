import { useNavigate } from "react-router-dom";
import { FaMagic } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import ChartOne from "../../components/Charts/ChartOne";
import Leaderboard from "../../components/Tables/TableOne";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-purple-50/50 p-2 sm:p-4 md:p-6">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-4 md:space-y-6">
          <ChartOne />
        </div>

        {/* Right Side Panel */}
        <div className="lg:col-span-4 space-y-4 md:space-y-6">
          {/* Action Buttons - Made into a horizontal layout on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
            {/* Start Learning Button */}
            <button
              onClick={() => navigate("/new")}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <AiOutlinePlus className="text-lg md:text-xl" />
                <span className="font-medium text-sm md:text-base">Start Learning</span>
              </div>
              <p className="text-xs md:text-sm text-blue-100 mt-1">Create a new study request</p>
            </button>

            {/* Smart Match Button */}
            <button
              onClick={() => navigate("/magic")}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
            >
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <FaMagic className="text-lg md:text-xl" />
                <span className="font-medium text-sm md:text-base">Smart Match</span>
              </div>
              <p className="text-xs md:text-sm text-purple-100 mt-1">Find your perfect study buddy</p>
            </button>
          </div>

          {/* Table Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;