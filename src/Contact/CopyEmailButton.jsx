import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "youremail@example.com"; // Replace with your actual email

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-[12rem] px-4 py-3 text-sm font-light text-white bg-primary rounded-full cursor-pointer"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2"
          >
            <img src="assets/copy-done.svg" alt="Copied" className="w-5" />
            Email Copied
          </motion.p>
        ) : (
          <motion.p
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <img src="assets/copy.svg" alt="Copy" className="w-5" />
            Copy Email Address
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
