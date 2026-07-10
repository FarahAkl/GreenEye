import Button from "./Button";
import { motion } from "framer-motion";

const AppSec = () => {
  const handleDownloadApp = () => {
    const link = document.createElement("a");
    link.href = "/app-release.apk";
    link.download = "GreenEye.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const appSteps = [
    {
      icon: "/svg/plantStages1.svg",
      label: "Understand your land",
      describtion:
        "See what’s happening in your land and know its condition in a simple and clear way.",
    },
    {
      icon: "/svg/plantStages2.svg",
      label: "Choose the right crop",
      describtion:
        "Get help picking the best crop to grow based on your land and the time of year.",
    },
    {
      icon: "/svg/plantStages3.svg",
      label: "Check your plants",
      describtion:
        "Take a photo of your plant and find out if there’s a problem and how to fix it.",
    },
    {
      icon: "/svg/plantStages4.svg",
      label: "Follow your land over time",
      describtion:
        "Keep track of changes in your land and crops season after season.",
    },
    {
      icon: "/svg/plantStages5.svg",
      label: "Learn from others",
      describtion:
        "Talk with farmers and experts, ask questions, and share experiences.",
    },
  ];
  return (
    <section className="shadow-section-green px-8 py-20 md:px-12 lg:px-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
          className="flex flex-col gap-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-dark text-4xl font-bold"
          >
            The GreenEye App
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            GreenEye is designed to be simple, intuitive, and practical. Farmers
            and decision-makers can access powerful insights through a clear
            visual interface — without technical complexity.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-dark-green text-2xl"
          >
            What you can do:
          </motion.p>
          {appSteps.map((step) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3"
              key={step.label}
            >
              <div className="flex items-end gap-2">
                <img src={step.icon} alt="plant" key={step.label} />
                <p className="text-xl">{step.label}</p>
              </div>
              <p className="text-lg text-gray-700">{step.describtion}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex h-full w-full items-center justify-center"
        >
          <img src="/images/application.avif" alt="application screens" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            btnLabel="Download App"
            className="md:w-1/2"
            onClick={handleDownloadApp}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AppSec;
