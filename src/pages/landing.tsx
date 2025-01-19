import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Settings, Globe } from 'lucide-react';

type FeatureCardProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => (
  <motion.div
    className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition-all duration-200"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="text-blue-500 w-8 h-8 mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const LandingPage: React.FC = () => {
  return (
    <div className=" min-h-screen flex flex-col">


      {/* Main Content */}
      <main className="flex-grow px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Find Your Perfect Match
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Whether you're collaborating or networking, PeerUP makes connecting effortless.
          </p>
          <Link
            to="/home"
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Pair Me Up!
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <FeatureCard
            Icon={Users}
            title="Connect with Peers"
            description="Discover like-minded individuals to work, learn, and grow together."
          />
          <FeatureCard
            Icon={Settings}
            title="Customizable Profiles"
            description="Showcase your skills and preferences for the perfect match."
          />
          <FeatureCard
            Icon={Globe}
            title="Tight Community"
            description="Stay connected by gifting and receiving help in subjects."
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-600">
        <p>&copy; 2025 PeerUP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
