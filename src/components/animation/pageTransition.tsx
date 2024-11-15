// components/PageTransition.js
import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode
}

const PageTransition = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}  // Ajusta delay y duration según prefieras
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
