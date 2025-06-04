import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="relative w-full max-w-none py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-[#220339] via-[#2b0448] to-[#340558] text-white overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent pointer-events-none"></div>

      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-lg"
      >
        About Our DApp
      </motion.h2>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-purple-200 text-center"
      >
        Our decentralized application (DApp) revolutionizes credential verification by eliminating intermediaries. Students can securely upload their academic credentials, and employers can instantly verify their authenticity, ensuring transparency, privacy, and tamper-proof records.
      </motion.p>

      {/* Features Cards Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto"
      >
        {[
          { title: "Secure Uploads", description: "Students can safely upload academic credentials with end-to-end encryption." },
          { title: "Instant Verification", description: "Employers verify credentials in real-time, eliminating delays." },
          { title: "Tamper-Proof Records", description: "Immutable blockchain ensures credentials remain untampered." },
          { title: "User Privacy", description: "User data remains private with decentralized storage solutions." },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="border border-purple-600 rounded-2xl p-6 backdrop-blur-lg bg-[#1a012b]/70 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-purple-100">{feature.title}</h3>
            <p className="text-sm sm:text-base text-purple-300 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutSection;
