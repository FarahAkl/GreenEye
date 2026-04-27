import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { motion } from "framer-motion";

const MarketSec = () => {
  const navigate = useNavigate();

  return (
    <section className="px-8 py-20 md:px-12 lg:px-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <p className="text-dark text-4xl leading-tight font-bold">
            A Marketplace Built for Sustainable Farming
          </p>

          <p className="max-w-xl text-lg leading-8 text-gray-600">
            GreenEye connects farmers with trusted agricultural products and
            services in one web-based marketplace. From inputs to expertise,
            everything is curated to support sustainable and efficient farming
            decisions.
          </p>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            className="grid max-w-md grid-cols-3 gap-4"
          >
            {[
              { icon: "/svg/fertilizer.svg", label: "Fertilizers" },
              { icon: "/svg/seeds.svg", label: "Seeds" },
              { icon: "/svg/tools.svg", label: "Tools" },
            ].map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={item.label}
                className="hover:border-primary flex flex-col items-center gap-3 rounded-2xl border border-gray-300 p-5 transition hover:shadow-sm"
              >
                <img src={item.icon} alt={item.label} className="h-10 w-10" />
                <p className="text-dark text-sm font-semibold">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <Button
            btnLabel="View Marketplace"
            className="mt-4 w-full sm:w-1/2 lg:w-1/3"
            onClick={() => navigate("/marketplace")}
          />
        </motion.div>

        {/* Right image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden justify-end lg:flex"
        >
          <img
            src="/images/marketSec.avif"
            alt="Marketplace preview"
            className="w-full max-w-lg rounded-3xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MarketSec;
