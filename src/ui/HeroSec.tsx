import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import Button from "./Button";
import { motion } from "framer-motion";

const HeroSec = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="relative grid min-h-[80vh] grid-cols-1 hero-gradient md:grid-cols-2">
      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
        className="z-10 flex flex-col items-center gap-3 px-8 pt-24 pb-20 md:items-start md:px-12 md:pb-32 lg:px-20 lg:pt-34"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-6xl/22 font-bold text-white uppercase md:text-start"
        >
          higher yields lower lost
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-lg/8 text-white md:text-start"
        >
          An AI-powered agriculture platform that helps farmers make smarter
          decisions before damage happens.
        </motion.p>

        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full md:w-auto flex justify-center md:justify-start"
          >
            <Button
              btnLabel="Join Us"
              onClick={() => navigate("/login")}
              className="my-3 border border-white px-8 text-lg shadow-sm"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Image */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative overflow-hidden"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/images/plantHologrampng.png"
          alt="Plant Hologram"
          className="inset-0 h-full w-full object-cover md:absolute"
        />
      </motion.div>
    </section>
  );
};

export default HeroSec;
