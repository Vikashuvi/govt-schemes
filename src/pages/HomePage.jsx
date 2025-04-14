import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Search, FileText, UserCheck } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover the Government Schemes You Deserve
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Find all eligible Indian government schemes based on your profile.
              Don't miss out on benefits meant for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/schemes"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg inline-flex items-center justify-center transition-colors duration-300"
              >
                Browse All Schemes <FileText size={20} className="ml-2" />
              </Link>
              <Link
                to="/eligibility"
                className="bg-white hover:bg-gray-100 text-blue-700 font-bold py-3 px-8 rounded-lg inline-flex items-center justify-center transition-colors duration-300"
              >
                Check Eligibility <UserCheck size={20} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Search Schemes</h3>
              <p className="text-gray-600">
                Search for government schemes by name, description, or tags to find what you need.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Check Eligibility</h3>
              <p className="text-gray-600">
                Fill in your details to find schemes you're eligible for based on your profile.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Apply & Benefit</h3>
              <p className="text-gray-600">
                Get direct links to apply for schemes and access benefits you're entitled to.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss out on government benefits designed for you. Start your search now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/schemes"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg inline-flex items-center justify-center transition-colors duration-300"
            >
              Browse All Schemes <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
