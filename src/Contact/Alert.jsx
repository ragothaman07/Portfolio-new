import { AnimatePresence, motion } from "framer-motion";

const Alert = ({ type, text }) => {
  const alertVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-50 bottom-5 right-5"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={alertVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`p-4 rounded-md text-white flex items-center gap-4 ${
            type === "danger" ? "bg-red-700" : "bg-green-600"
          }`}
        >
          <span className="uppercase font-semibold text-xs">
            {type === "danger" ? "Failed" : "Success"}
          </span>
          <p className="text-sm">{text}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
