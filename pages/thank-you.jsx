import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import { db } from '../lib/firebaseClient';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Icon from '../components/common/Icon.jsx';
import { WHATSAPP_COMMUNITY_URL, formatSprintDate, formatAcceleratorDate } from '../lib/constants.js';

const ThankYouPage = () => {
  const router = useRouter();
  const [registration, setRegistration] = useState(null);
  const { razorpay_order_id } = router.query;

  useEffect(() => {
    if (!razorpay_order_id || !db) return;

    const fetchRegistration = async () => {
        try {
            const q = query(collection(db, 'registrations'), where('orderId', '==', razorpay_order_id));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data();
                
                // Convert Firestore Timestamps to JavaScript Date objects
                if (docData.cohortDate && docData.cohortDate.toDate) { // Check for sprint
                    docData.cohortDate = docData.cohortDate.toDate();
                } else if (docData.cohortDate && docData.cohortDate.start && docData.cohortDate.start.toDate) { // Check for accelerator
                    docData.cohortDate.start = docData.cohortDate.start.toDate();
                    docData.cohortDate.end = docData.cohortDate.end.toDate();
                }
                
                setRegistration(docData);
            } else {
                console.log("No registration found for this order ID.");
            }
        } catch (error) {
            console.error("Error fetching registration:", error);
        }
    };

    fetchRegistration();
  }, [razorpay_order_id]);

  const getFormattedDate = () => {
    if (!registration || !registration.cohortDate) return '';
    if (registration.courseType === 'sprint') {
        return formatSprintDate(registration.cohortDate);
    } else {
        return formatAcceleratorDate(registration.cohortDate);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gray-900/50 border border-purple-800/30 backdrop-blur-lg rounded-2xl shadow-2xl text-center p-8 md:p-12 max-w-2xl w-full"
        >
          {registration ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                className="mx-auto rounded-full h-24 w-24 md:h-28 md:w-28 flex items-center justify-center border-2 border-purple-500/30 overflow-hidden"
              >
                <video
                    src="/Rwitapa.mp4"
                    poster="/Rwitapa.png"
                    className="block w-full h-full object-cover"
                    autoPlay loop muted playsInline
                />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-3 font-poppins-medium">
                Hi {registration.customerName},
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 font-poppins-medium">
                You're All Set!
              </h2>
              <p className="text-gray-300 text-lg md:text-xl mb-4">
                Thank you for registering. We've sent a confirmation to your email.
              </p>
               <p className="text-gray-300 text-base md:text-lg mb-8">
                You will receive the joining link on your registered email one hour before the session starts.
              </p>

              <motion.a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="whatsapp" size={24} />
                <span>Join Our WhatsApp Community</span>
              </motion.a>

              <p className="text-purple-300 font-semibold text-lg md:text-xl mt-8">
                Excited to see you on {getFormattedDate()}!
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg">Loading your confirmation...</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <a href="/" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
              &larr; Back to Home
            </a>
          </div>
        </motion.div>
    </div>
  );
};

export default ThankYouPage;
