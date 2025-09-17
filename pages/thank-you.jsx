// pages/thank-you.jsx
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import { WHATSAPP_COMMUNITY_URL, formatSprintDate, formatAcceleratorDate } from '../lib/constants.js';

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
        
        if (regData.cohort && typeof regData.cohort === 'string') {
            try {
                const parsedCohort = JSON.parse(regData.cohort);
                if (parsedCohort.start) {
                    regData.cohortDate = {
                        start: new Date(parsedCohort.start),
                        end: new Date(parsedCohort.end)
                    };
                } else {
                     regData.cohortDate = new Date(parsedCohort);
                }
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

  const getFormattedDate = () => {
    if (!registration || !registration.cohortDate) return '';
    if (registration.courseType.includes('Sprint')) {
        return formatSprintDate(registration.cohortDate);
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
          className="bg-gray-900/50 border border-purple-800/30 backdrop-blur-lg rounded-2xl shadow-2xl text-center p-8 md:p-12 w-full max-w-lg" // Adjusted max-w for a slightly tighter card
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-80">
              <p className="text-lg text-gray-300">Loading your confirmation...</p>
            </div>
          ) : registration ? (
            <>
              {/* Profile image/video container - added overflow-hidden and made border more subtle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                className="mx-auto rounded-full h-28 w-28 mb-6 flex items-center justify-center border-2 border-purple-600/20 overflow-hidden" // Increased size and subtle border
              >
                <video
                    ref={videoRef}
                    src="/Rwitapa.mp4"
                    poster="/Rwitapa.png"
                    className="block w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
              </motion.div>

              <p className="text-xl md:text-2xl text-gray-200 mb-2 font-medium"> {/* More friendly greeting */}
                Hey {registration.customerName}! Awesome news!
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"> {/* Larger, bolder heading */}
                You're All Set!
              </h1>
              <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed max-w-sm mx-auto"> {/* Improved readability */}
                Thank you for successfully registering for the {registration.courseType}.
                We've sent a detailed confirmation to your registered email address.
              </p>
               <p className="text-gray-400 text-base mb-8 leading-relaxed max-w-sm mx-auto">
                You will receive your exclusive joining link and other important details
                one hour before the session officially begins.
              </p>

              <motion.a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold px-10 py-3 rounded-full text-lg shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105" // Enhanced button styling
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Our WhatsApp Community
              </motion.a>

              <p className="font-bold text-xl md:text-2xl mt-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 whitespace-nowrap"> {/* Bolder, more vibrant gradient, and whitespace-nowrap */}
                Excited to see you on {getFormattedDate()}!
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
