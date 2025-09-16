// pages/thank-you.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import Icon from '../components/common/Icon.jsx';
import { WHATSAPP_COMMUNITY_URL, formatSprintDate, formatAcceleratorDate } from '../lib/constants.js';

const ThankYouPage = () => {
  const router = useRouter();
  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { razorpay_order_id } = router.query;

  useEffect(() => {
    // If there's no order ID, stop loading and show an error state.
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
        const regData = data.data; // The data is nested under a 'data' key
        
        // Convert date strings from API back to Date objects
        if (regData.cohort && typeof regData.cohort === 'string') {
            try {
                const parsedCohort = JSON.parse(regData.cohort);
                if (parsedCohort.start) { // Accelerator
                    regData.cohortDate = {
                        start: new Date(parsedCohort.start),
                        end: new Date(parsedCohort.end)
                    };
                } else { // Sprint (assuming it's just the date string)
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
                className="mx-auto rounded-full h-24 w-24 mb-6 flex items-center justify-center border-2 border-purple-500/30 overflow-hidden"
              >
                <img
                    src="/Rwitapa.png"
                    alt="Rwitapa Mitra"
                    className="block w-full h-full object-cover"
                />
              </motion.div>

              <p className="text-2xl text-gray-200 mb-2">
                Hi {registration.customerName},
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                You're All Set!
              </h1>
              <p className="text-gray-300 text-base md:text-lg mb-4 max-w-sm mx-auto">
                Thank you for registering. We've sent a confirmation to your email.
              </p>
               <p className="text-gray-400 text-base mb-8 max-w-sm mx-auto">
                You will receive the joining link one hour before the session starts.
              </p>

              <motion.a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-10 py-3 rounded-full text-base shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Our WhatsApp Community
              </motion.a>

              <p className="font-semibold text-lg md:text-xl mt-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
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
