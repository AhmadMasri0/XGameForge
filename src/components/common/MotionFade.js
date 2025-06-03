import { motion } from "framer-motion";

const MotionFade = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.1 }}
        transition={{ duration: 1.5, delay }}
    >
        {children}
    </motion.div>
);
export default MotionFade;