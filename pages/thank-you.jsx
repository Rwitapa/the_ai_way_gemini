// pages/thank-you.jsx
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import { WHATSAPP_COMMUNITY_URL, formatSprintDate, formatAcceleratorDate } from '../lib/constants.js';
import Icon from '../components/common/Icon.jsx'; // Assuming Icon component is available

const ThankYouPage = () => {
  const router = useRouter();
  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { razorpay_order_id } = router.query;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.play().catch(error => {
            console.log("Thank you page video autoplay was prevented:", error);
        });
    }
  }, [isLoading, registration]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!razorpay_order_id) {
        setIsLoading(false);
        return;
    }

    const fetchRegistration = async () => {
      try {
        const response = await fetch(`/api/get-registration?orderId=${razorpay_order_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch registration details');
        }
        const data = await response.json();
        const regData = data.data;
        
        // Safely parse cohort date
        if (regData.cohort && typeof regData.cohort === 'string') {
            try {
                const parsedCohort = JSON.parse(regData.cohort);
                regData.cohortDate = parsedCohort.start 
                    ? { start: new Date(parsedCohort.start), end: new Date(parsedCohort.end) }
                    : new Date(parsedCohort);
            } catch(e) {
                 regData.cohortDate = new Date(regData.cohort);
            }
        }
        setRegistration(regData);
      } catch (error) {
        console.error("Error fetching registration:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistration();
  }, [razorpay_order_id, router.isReady]);
  
  // Local date formatting function to only show the start time for the Sprint
  const getFormattedDate = () => {
    if (!registration || !registration.cohortDate) return '';
    if (registration.courseType.includes('Sprint')) {
        const fullDateString = formatSprintDate(registration.cohortDate);
        return fullDateString.split(' - ')[0]; // Keeps only the part before " - "
    } else {
        return formatAcceleratorDate(registration.cohortDate);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gray-900/50 border border-purple-800/30 backdrop-blur-lg rounded-2xl shadow-2xl text-center p-8 md:p-12 w-full max-w-lg"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-80">
              <p className="text-lg text-gray-300">Loading your confirmation...</p>
            </div>
          ) : registration ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                className="mx-auto rounded-full h-28 w-28 mb-6 flex items-center justify-center border-2 border-purple-600/20 overflow-hidden"
              >
                <video
                    ref={videoRef}
                    src="/Rwitapa.mp4"
                    poster="/Rwitapa.png"
                    className="block w-full h-full object-cover scale-[1.05]"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                You're All Set!
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-sm mx-auto">
                Hey {registration.customerName}, thank you for registering for the {registration.courseType}.
              </p>

              <div className="text-left space-y-3 bg-gray-800/50 p-5 rounded-lg border border-gray-700 mb-8">
                  <p className="flex items-start gap-3"><Icon name="check-circle" size={20} className="text-green-400 mt-0.5 flex-shrink-0" /><span>A detailed confirmation has been sent to your email.</span></p>
                  <p className="flex items-start gap-3"><Icon name="calendar" size={20} className="text-purple-400 mt-0.5 flex-shrink-0" /><span>Your exclusive joining link will be shared one hour before the session begins.</span></p>
              </div>

              <motion.a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold px-10 py-3 rounded-full text-lg shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Our WhatsApp Community
              </motion.a>

              <p className="font-bold text-xl md:text-2xl mt-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 whitespace-nowrap">
                See you on {getFormattedDate()}!
              </p>
            </>
          ) : (
             <div className="flex flex-col items-center justify-center h-80">
                <p className="text-lg text-red-400">Could not find your registration details.</p>
                <p className="text-gray-400 mt-2">Please check your email for a confirmation message.</p>
             </div>
          )}

          <div className="mt-10 text-center">
            <a href="/" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors text-sm">
              &larr; Back to Home
            </a>
          </div>
        </motion.div>
    </div>
  );
};

export default ThankYouPage;
