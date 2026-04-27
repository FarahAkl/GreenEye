import { motion } from "framer-motion";

const MeetUsSec = () => {
  return (
    <section className="bg-bg relative mt-24 overflow-visible px-8 py-20 md:px-12 lg:px-24">
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        src="/svg/plant.svg"
        alt="plant"
        className="absolute right-5 bottom-0"
      />
      <motion.img
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        src="/svg/planet.svg"
        alt="planet"
        className="absolute bottom-5 left-4 hidden md:flex"
      />
      <motion.img
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        src="/svg/satelite.svg"
        alt="satalite"
        className="absolute -top-18 left-1/2 hidden md:flex"
      />
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4"
        >
          <p className="text-dark text-4xl font-bold">Meet GreenEye</p>
          <p className="text-lg text-gray-600">
            GreenEye is a smart agriculture platform designed to support farmers
            and decision-makers with accurate, data-driven insights. It combines
            satellite imagery, climate data, and artificial intelligence to help
            anticipate risks and improve agricultural decisions
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <img src="/images/graphicLogo.avif" alt="" className="w-80" />
        </motion.div>
      </div>
    </section>
  );
};

export default MeetUsSec;
