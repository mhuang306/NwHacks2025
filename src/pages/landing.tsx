import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, UserPlus, BookOpen } from 'lucide-react';
import {motion} from 'framer-motion';

const FeatureCard = ({ Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className="group p-8 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all duration-300 border border-gray-100"
  >
    <div className="flex flex-col items-center text-center">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="p-3 bg-emerald-50 rounded-full mb-6"
      >
        <Icon className="w-8 h-8 text-emerald-500" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Updated background with decorative elements */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,255,255,0.1),transparent)]" />
      
      {/* Decorative circles */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-100/20 rounded-full blur-3xl" />
      </div>
      
      {/* Floating shapes */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 right-20 w-8 h-8 border-4 border-emerald-200/30 rounded-full animate-bounce" />
        <div className="absolute bottom-40 left-20 w-6 h-6 border-4 border-blue-200/30 rotate-45 animate-pulse" />
        <div className="absolute top-40 right-1/4 w-4 h-4 bg-purple-200/30 rounded-full animate-pulse" />
      </div>
      
      <main className="flex-grow px-6 py-12 container mx-auto max-w-6xl">
        {/* Hero Section with updated title styling */}
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            <span>Peer Tutoring. <span className='text-emerald-700'>Redefined.</span></span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="ml-2 text-blue-500"
            >
              
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Exchange your knowledge with fellow high school students. Teach what you're great at,
            and get help with subjects you want to improve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              to="/home"
              className="px-8 py-4 bg-emerald-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-emerald-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Pair me Up!
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <FeatureCard
            Icon={UserPlus}
            title="Mutual Growth"
            description="Offer help in your areas of expertise, get help in other subjects. Simple, fair, and mutually beneficial."
            delay={0.2}
          />
          <FeatureCard
            Icon={Users}
            title="Build Lasting Connections"
            description="Meet students from your school or nearby. Create study groups and form lasting friendships."
            delay={0.4}
          />
          <FeatureCard
            Icon={MapPin}
            title="Tight Community"
            description="Connect with tutoring partners in your school for convenient in-person learning sessions."
            delay={0.6}
          />
        </section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-100 mb-16"
        >
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-emerald-500">What You'll Give</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 mt-1 text-emerald-400" />
                  <span>Tutor in subjects you excel at</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 mt-1 text-emerald-400" />
                  <span>Share your study techniques and tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 mt-1 text-emerald-400" />
                  <span>One hour of your expertise</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-emerald-500">What You'll Get</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 mt-1 text-emerald-400" />
                  <span>Help in subjects you find challenging</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 mt-1 text-emerald-400" />
                  <span>New study strategies and perspectives</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 mt-1 text-emerald-400" />
                  <span>One hour of peer tutoring in return</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Added second CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/home"
              className="px-8 py-4 bg-emerald-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-emerald-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Pair me Up!
            </Link>
          </motion.div>
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} PeerUP. Connecting students, building community.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;