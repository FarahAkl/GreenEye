import { motion } from "framer-motion";

const GreenEyeSec = () => {
  return (
    <section className="bg-bg relative overflow-visible px-8 py-14 md:px-12 lg:px-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="text-primary text-2xl font-black">GreenEye</p>
        <p className="text-dark w-full text-center text-lg md:w-3/5">
          We don’t replace farmers’ experience — it strengthens it with data.
          Smarter decisions today mean healthier land tomorrow..
        </p>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, scale: 0.8, x: -20, y: "-50%" }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: "-50%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        src="/svg/darkLogo.svg"
        alt=""
        className="absolute top-1/2 left-12 w-40 hidden md:flex"
      />
    </section>
  );
};

export default GreenEyeSec;
