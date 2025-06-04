// import React from "react";
// import Footer from "../components/Footer";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import DecntraVSCentra from "../public/images/DecntraVSCentra.png";
// import AboutSection from "../components/AboutSection";

// const fadeInVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1 } },
// };

// export default function Home() {
//   const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
//   const [comparisonRef, comparisonInView] = useInView({ triggerOnce: true, threshold: 0.2 });
//   const [blocksRef, blocksInView] = useInView({ triggerOnce: true, threshold: 0.2 });

//   return (
//     <div className="w-full overflow-hidden">
//       {/* Hero Section */}
//       <motion.section
//         ref={heroRef}
//         initial="hidden"
//         animate={heroInView ? "visible" : "hidden"}
//         variants={fadeInVariants}
//         className="flex items-center justify-center h-[80vh] text-center bg-gradient-to-r from-[#1a012b] via-[#220339] to-[#2b0448] text-white shadow-inner"
//       >
//         <div>
//           <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
//             Decentralized. Secure. Effortless Credential Verification.
//           </h1>
//           <p className="text-xl text-purple-200">
//             Upload credentials in seconds; verify authenticity with ease.
//           </p>
//         </div>
//       </motion.section>

//       {/* About Section */}
//       <AboutSection />

//       {/* Comparison Section */}
//       <motion.section
//         ref={comparisonRef}
//         initial="hidden"
//         animate={comparisonInView ? "visible" : "hidden"}
//         variants={fadeInVariants}
//         className="py-16 px-4 md:px-12 lg:px-24 bg-gradient-to-r from-[#2b0448] via-[#340558] to-[#3c0668]"
//       >
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-100 drop-shadow-md">
//           Centralized vs Decentralized Systems
//         </h2>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={comparisonInView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="flex justify-center"
//         >
//           <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
//             <img
//               src={DecntraVSCentra}
//               alt="Centralized vs Decentralized Systems"
//               className="w-full h-auto object-contain"
//             />
//           </div>
//         </motion.div>
//       </motion.section>

//       {/* Centralized vs. Decentralized Comparison Blocks */}
//       <motion.section
//         ref={blocksRef}
//         initial="hidden"
//         animate={blocksInView ? "visible" : "hidden"}
//         variants={fadeInVariants}
//         className="py-16 px-6 bg-gradient-to-r from-[#220339] via-[#2b0448] to-[#340558] text-purple-50"
//       >
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold text-center mb-10 drop-shadow-lg">
//             Centralized vs. Decentralized Systems
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {["Centralized System", "Decentralized System"].map((title, idx) => (
//               <motion.div
//                 key={title}
//                 initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
//                 animate={blocksInView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ duration: 0.6, delay: idx * 0.3 }}
//                 className="border border-purple-700 rounded-2xl p-6 shadow-lg bg-[#1a012b]/80 backdrop-blur-md"
//               >
//                 <h3 className={`text-2xl font-semibold mb-4 ${title.includes("Centralized") ? "text-red-400" : "text-green-400"}`}>
//                   {title}
//                 </h3>
//                 <ul className="list-disc pl-5 space-y-2 text-left text-purple-200">
//                   {title === "Centralized System" ? (
//                     <>
//                       <li>Single point of failure</li>
//                       <li>Data controlled by a central authority</li>
//                       <li>Prone to data breaches and manipulation</li>
//                       <li>Limited transparency for users</li>
//                     </>
//                   ) : (
//                     <>
//                       <li>No single point of failure</li>
//                       <li>Data distributed across multiple nodes</li>
//                       <li>Enhanced security and data integrity</li>
//                       <li>Complete transparency and user control</li>
//                     </>
//                   )}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       <Footer />
//     </div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import DecntraVSCentra from '../assets/DecntraVSCentra.png'

// import DecntraVSCentra from "../public/DecntraVSCentra.png";


export default function Home() {
  return (
    <ParallaxProvider>
      <div className="w-full overflow-hidden">
        {/* Hero Section with Parallax & Scroll Animation */}
        <ParallaxBanner
          layers={[{ image: "/images/hero-bg.jpg", speed: -20 }]}
          className="h-[90vh] md:h-[80vh]"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center h-full text-center bg-gradient-to-r from-[#1a012b] via-[#220339] to-[#2b0448] text-white px-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg hover:scale-105 transition-transform duration-300">
                Decentralized. Secure. Effortless Credential Verification.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-purple-200 hover:text-white transition-colors duration-200">
                Upload credentials in seconds; verify authenticity with ease.
              </p>
            </div>
          </motion.div>
        </ParallaxBanner>

        {/* About Section with Scroll Animation */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-none" // ✅ Removed px classes & added w-full
        >
          <AboutSection />
        </motion.section>

        {/* Comparison Section with Parallax Image & Scroll Animation */}
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-[#2b0448] via-[#340558] to-[#3c0668]">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8 text-purple-100 drop-shadow-md"
          >
            Centralized vs Decentralized Systems
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
              <img
                src={DecntraVSCentra}
                alt="Centralized vs Decentralized Systems"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </section>

        {/* Comparison Cards with Responsive Grid & Hover Animation */}
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-[#220339] via-[#2b0448] to-[#340558] text-purple-50">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ staggerChildren: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-10 drop-shadow-lg">
              Centralized vs. Decentralized Systems
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {["Centralized System", "Decentralized System"].map(
                (system, index) => (
                  <motion.div
                    key={system}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="border border-purple-700 rounded-2xl p-5 sm:p-6 shadow-lg bg-[#1a012b]/80 backdrop-blur-md hover:scale-105 transition-transform duration-300"
                  >
                    <h3
                      className={`text-lg sm:text-xl md:text-2xl font-semibold mb-4 ${
                        system === "Centralized System"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {system}
                    </h3>
                    <ul className="list-disc pl-4 sm:pl-5 space-y-2 text-sm sm:text-base text-purple-200">
                      {system === "Centralized System" ? (
                        <>
                          <li>Single point of failure</li>
                          <li>Data controlled by a central authority</li>
                          <li>Prone to data breaches and manipulation</li>
                          <li>Limited transparency for users</li>
                        </>
                      ) : (
                        <>
                          <li>No single point of failure</li>
                          <li>Data distributed across multiple nodes</li>
                          <li>Enhanced security and data integrity</li>
                          <li>Complete transparency and user control</li>
                        </>
                      )}
                    </ul>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </ParallaxProvider>
  );
}
