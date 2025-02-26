"use client";
import { motion } from "framer-motion";

const MainContent = () => {
  return (
    <div className="flex-1 p-6 bg-gray-900 text-white w-full">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Welcome to Your Dashboard
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-6 bg-gray-800 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold">Your Tasks</h3>
          <p className="text-gray-400 mt-2">Manage and track your ongoing projects.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="p-6 bg-gray-800 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold">Team Chat</h3>
          <p className="text-gray-400 mt-2">Communicate with your team in real-time.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="p-6 bg-gray-800 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold">Progress Tracker</h3>
          <p className="text-gray-400 mt-2">Stay updated with your team's progress.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default MainContent;
