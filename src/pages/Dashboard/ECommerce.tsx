import ChartOne from '../../components/Charts/ChartOne';
import TableOne from '../../components/Tables/TableOne';
import { useNavigate } from "react-router-dom";
import { FaMagic } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-purple-50/50 p-6">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Main Content Area (takes up more width) */}
        <div className="sm:col-span-2 lg:col-span-8 space-y-6">
          <ChartOne />
        </div>

        {/* Right Side Panel */}
        <div className="sm:col-span-2 lg:col-span-4 space-y-6">
          {/* Action Buttons */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            {/* Start Learning Button */}
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

            {/* Smart Match Button */}
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

          {/* Table Section */}
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
