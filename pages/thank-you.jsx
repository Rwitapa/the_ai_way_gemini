import { motion } from "framer-motion";
import Icon from '../components/common/Icon.jsx';
import { WHATSAPP_COMMUNITY_URL } from '../lib/constants.js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ThankYouPage = () => {
  const router = useRouter();
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, courseType, cohort } = router.query;
  const [status, setStatus] = useState('Processing your registration...');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  useEffect(() => {
    const savePaymentData = async () => {
        if (!razorpay_payment_id) {
            // No payment ID in the URL, so this is a manual visit.
            setStatus('Registration complete! You will receive a confirmation email shortly.');
            setShowPaymentInfo(false);
            return;
        }

        try {
            // Parse the cohort data from the URL
            let parsedCohort;
            if (courseType === 'sprint') {
                parsedCohort = new Date(decodeURIComponent(cohort));
            } else if (courseType === 'accelerator') {
                const cohortObj = JSON.parse(decodeURIComponent(cohort));
                parsedCohort = {
                    start: new Date(cohortObj.start),
                    end: new Date(cohortObj.end),
                };
            }

            const registrationData = {
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                courseType,
                cohort: parsedCohort,
                timestamp: serverTimestamp(),
            };

            await addDoc(collection(db, 'registrations'), registrationData);
            setStatus('Payment successful and registration complete! You will receive a confirmation email shortly.');
            setShowPaymentInfo(true);

        } catch (error) {
            console.error('Error saving payment data:', error);
            setStatus('Payment was successful, but there was an error with registration. Please contact support with your payment ID.');
            setShowPaymentInfo(true);
        }
    };

    savePaymentData();
  }, [razorpay_payment_id, cohort, courseType]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gray-900/50 border border-purple-800/30 backdrop-blur-lg rounded-2xl shadow-2xl text-center p-8 md:p-12 max-w-2xl w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            className="mx-auto bg-green-500/10 text-green-400 rounded-full h-20 w-20 md:h-24 md:w-24 flex items-center justify-center border-2 border-green-500/30"
          >
            <Icon name="check" size={48} className="text-green-400" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-3 font-poppins-medium">
            You're All Set!
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            {status}
          </p>

          {showPaymentInfo && (
            <div className="mb-8 p-4 bg-gray-800/50 rounded-lg text-sm text-gray-400 max-w-sm mx-auto">
                <p>Payment ID: <span className="font-mono text-white break-all">{razorpay_payment_id}</span></p>
                <p>Order ID: <span className="font-mono text-white break-all">{razorpay_order_id}</span></p>
            </div>
          )}

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
